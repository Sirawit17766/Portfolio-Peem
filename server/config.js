import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT || 4000),
  storage: process.env.BLOG_STORAGE || "memory",
  mongoUri: process.env.MONGODB_URI,
  mongoDbName: process.env.MONGODB_DB_NAME || "portfolio_blog",
  mongoCollection: process.env.MONGODB_COLLECTION || "posts",
};
