import { Router } from "express";

const passThrough = (_request, _response, next) => next();

export const createAnalyticsRouter = (postStore, { cache = passThrough } = {}) => {
  const router = Router();

  router.get("/top-posts", cache, async (_request, response, next) => {
    try {
      const posts = await postStore.topPosts(3);
      response.json({ data: posts });
    } catch (error) {
      next(error);
    }
  });

  return router;
};
