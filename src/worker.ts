type Env = {
  ASSETS: {
    fetch: (request: Request) => Promise<Response>;
  };
  DISCORD_WEBHOOK_URL?: string;
};

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
};

const json = (payload: unknown, status = 200) =>
  Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });

const clean = (value: unknown, fallback: string, maxLength: number) => {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().slice(0, maxLength) || fallback;
};

const withProductionHeaders = (request: Request, response: Response) => {
  const headers = new Headers(response.headers);
  const pathname = new URL(request.url).pathname;
  const isHtml =
    headers.get("Content-Type")?.includes("text/html") ||
    pathname === "/" ||
    !pathname.includes(".");

  headers.set("X-Robots-Tag", "index, follow");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

  if (isHtml) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
};

const sendContact = async (request: Request, env: Env) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  if (!env.DISCORD_WEBHOOK_URL) {
    return json({ error: "Discord webhook is not configured" }, 500);
  }

  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = clean(body.name, "Portfolio visitor", 80);
  const email = clean(body.email, "Not provided", 120);
  const message = clean(body.message, "", 1200);

  if (!message) {
    return json({ error: "Message is required" }, 400);
  }

  const response = await fetch(env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Portfolio Contact",
      allowed_mentions: { parse: [] },
      embeds: [
        {
          title: "New portfolio contact",
          color: 0x61dafb,
          fields: [
            { name: "Name", value: name, inline: true },
            { name: "Email", value: email, inline: true },
            { name: "Message", value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!response.ok) {
    return json({ error: `Discord responded with ${response.status}` }, 502);
  }

  return json({ ok: true });
};

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact") {
      return sendContact(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    return withProductionHeaders(request, response);
  },
};
