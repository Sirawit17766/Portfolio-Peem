export const createResponseCache = ({ ttlMs = 10000 } = {}) => {
  const cache = new Map();

  return (request, response, next) => {
    if (request.method !== "GET" || ttlMs <= 0) {
      next();
      return;
    }

    const key = request.originalUrl;
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && cached.expiresAt > now) {
      response.setHeader("X-Cache", "HIT");
      response.setHeader("Cache-Control", `private, max-age=${Math.floor(ttlMs / 1000)}`);
      response.status(cached.status).json(cached.body);
      return;
    }

    const originalJson = response.json.bind(response);
    response.json = (body) => {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        cache.set(key, {
          body,
          status: response.statusCode,
          expiresAt: Date.now() + ttlMs,
        });
      }

      response.setHeader("X-Cache", "MISS");
      response.setHeader("Cache-Control", `private, max-age=${Math.floor(ttlMs / 1000)}`);
      return originalJson(body);
    };

    next();
  };
};
