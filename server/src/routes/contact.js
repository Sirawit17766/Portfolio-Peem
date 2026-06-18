import { Router } from "express";

const clean = (value, fallback, maxLength) => {
  if (typeof value !== "string") {
    return fallback;
  }

  return value.trim().slice(0, maxLength) || fallback;
};

export const createContactRouter = ({ webhookUrl }) => {
  const router = Router();

  router.post("/", async (request, response, next) => {
    if (!webhookUrl) {
      response.status(500).json({ error: "Discord webhook is not configured" });
      return;
    }

    try {
      const name = clean(request.body?.name, "Portfolio visitor", 80);
      const email = clean(request.body?.email, "Not provided", 120);
      const message = clean(request.body?.message, "", 1200);

      if (!message) {
        response.status(400).json({ error: "Message is required" });
        return;
      }

      const discordResponse = await fetch(webhookUrl, {
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

      if (!discordResponse.ok) {
        response.status(502).json({ error: `Discord responded with ${discordResponse.status}` });
        return;
      }

      response.json({ ok: true });
    } catch (error) {
      next(error);
    }
  });

  router.all("/", (_request, response) => {
    response.status(405).json({ error: "Method not allowed" });
  });

  return router;
};
