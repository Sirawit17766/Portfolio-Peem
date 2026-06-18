import cors from "cors";
import express from "express";
import { config } from "../config.js";
import { requireAdminApiKey } from "./middleware/adminAuth.js";
import { createResponseCache } from "./middleware/cache.js";
import { createRateLimiter } from "./middleware/rateLimit.js";
import { createAnalyticsRouter } from "./routes/analytics.js";
import { createContactRouter } from "./routes/contact.js";
import { createPostsRouter } from "./routes/posts.js";

export const createApp = (postStore) => {
  const app = express();

  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  app.use((_request, response, next) => {
    response.setHeader("X-Content-Type-Options", "nosniff");
    response.setHeader("X-Frame-Options", "DENY");
    response.setHeader("Referrer-Policy", "no-referrer");
    response.setHeader("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
    response.setHeader("Content-Security-Policy", "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");
    next();
  });

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || config.corsOrigins.includes(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("CORS origin is not allowed"));
      },
      methods: ["GET", "POST", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"],
      maxAge: 600,
    }),
  );
  app.use(createRateLimiter({
    windowMs: config.rateLimitWindowMs,
    maxRequests: config.rateLimitMaxRequests,
  }));
  app.use(express.json({ limit: "1mb" }));

  app.use((error, _request, response, next) => {
    if (error.message === "CORS origin is not allowed") {
      response.status(403).json({ error: "CORS origin is not allowed" });
      return;
    }

    if (error instanceof SyntaxError && "body" in error) {
      response.status(400).json({ error: "Invalid JSON body" });
      return;
    }

    next(error);
  });

  app.get("/", (_request, response) => {
    response.json({
      name: "Portfolio Blog API",
      resources: ["/posts"],
    });
  });

  app.get("/health", (_request, response) => {
    response.json({ ok: true });
  });

  app.use(
    "/posts",
    createPostsRouter(postStore, {
      cache: createResponseCache({ ttlMs: config.postsCacheTtlMs }),
      requireAdmin: requireAdminApiKey(config.adminApiKey),
    }),
  );
  app.use("/analytics", createAnalyticsRouter(postStore, {
    cache: createResponseCache({ ttlMs: config.postsCacheTtlMs }),
  }));
  app.use("/api/contact", createContactRouter({ webhookUrl: config.discordWebhookUrl }));

  app.use((_request, response) => {
    response.status(404).json({ error: "Route not found" });
  });

  app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(error.status || 500).json({
      error: error.status ? error.message : "Internal server error",
    });
  });

  return app;
};
