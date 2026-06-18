import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  storage: process.env.BLOG_STORAGE || "memory",
  mongoUri: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGODB_DB_NAME || "portfolio_blog",
  mongoCollection: process.env.MONGODB_COLLECTION || "posts",
  corsOrigins: (process.env.CORS_ORIGINS || "http://localhost:5173,http://127.0.0.1:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
  adminApiKey: process.env.ADMIN_API_KEY,
  discordWebhookUrl: process.env.DISCORD_WEBHOOK_URL,
  rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 60000),
  rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 120),
  postsCacheTtlMs: Number(process.env.POSTS_CACHE_TTL_MS || 10000),
};
