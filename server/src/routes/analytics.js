import { Router } from "express";

export const createAnalyticsRouter = (postStore) => {
  const router = Router();

  router.get("/top-posts", async (_request, response, next) => {
    try {
      const posts = await postStore.topPosts(3);
      response.json({ data: posts });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
