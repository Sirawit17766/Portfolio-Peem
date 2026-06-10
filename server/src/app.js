import cors from "cors";
import express from "express";
import { createAnalyticsRouter } from "./routes/analytics.js";
import { createPostsRouter } from "./routes/posts.js";

export const createApp = (postStore) => {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: "1mb" }));

  app.use((error, _request, response, next) => {
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

  app.use("/posts", createPostsRouter(postStore));
  app.use("/analytics", createAnalyticsRouter(postStore));

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
