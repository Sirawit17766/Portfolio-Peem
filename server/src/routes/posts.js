import { Router } from "express";

const cleanPostInput = (body) => ({
  id: body?.id === undefined || body?.id === "" ? undefined : Number(body.id),
  title: typeof body?.title === "string" ? body.title.trim() : "",
  content: typeof body?.content === "string" ? body.content.trim() : "",
});

const validatePostInput = ({ id, title, content }) => {
  const errors = {};

  if (id !== undefined && (!Number.isInteger(id) || id < 1)) {
    errors.id = "Id must be a positive integer";
  }

  if (!title) {
    errors.title = "Title is required";
  }

  if (!content) {
    errors.content = "Content is required";
  }

  return errors;
};

export const createPostsRouter = (postStore) => {
  const router = Router();

  router.get("/", async (_request, response, next) => {
    try {
      const posts = await postStore.list();
      response.json({ data: posts });
    } catch (error) {
      next(error);
    }
  });

  router.post("/", async (request, response, next) => {
    try {
      const input = cleanPostInput(request.body);
      const errors = validatePostInput(input);

      if (Object.keys(errors).length > 0) {
        response.status(400).json({ error: "Validation failed", fields: errors });
        return;
      }

      const post = await postStore.create(input);
      response.status(201).json({ data: post });
    } catch (error) {
      next(error);
    }
  });

  router.get("/:id", async (request, response, next) => {
    try {
      const post = await postStore.getById(request.params.id);

      if (!post) {
        response.status(404).json({ error: "Post not found" });
        return;
      }

      response.json({ data: post });
    } catch (error) {
      next(error);
    }
  });

  router.post("/:id/view", async (request, response, next) => {
    try {
      const post = await postStore.incrementViews(request.params.id);

      if (!post) {
        response.status(404).json({ error: "Post not found" });
        return;
      }

      response.json({ data: post });
    } catch (error) {
      next(error);
    }
  });

  router.delete("/:id", async (request, response, next) => {
    try {
      const deleted = await postStore.deleteById(request.params.id);

      if (!deleted) {
        response.status(404).json({ error: "Post not found" });
        return;
      }

      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
};
