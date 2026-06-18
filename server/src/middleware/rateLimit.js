const getClientIp = (request) =>
  request.ip || request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";

export const createRateLimiter = ({
  windowMs = 60000,
  maxRequests = 120,
  keyGenerator = getClientIp,
} = {}) => {
  const clients = new Map();

  const pruneExpiredClients = (now) => {
    for (const [key, value] of clients.entries()) {
      if (value.resetAt <= now) {
        clients.delete(key);
      }
    }
  };

  return (request, response, next) => {
    const now = Date.now();
    pruneExpiredClients(now);

    const key = keyGenerator(request);
    const current = clients.get(key);

    if (!current || current.resetAt <= now) {
      clients.set(key, { count: 1, resetAt: now + windowMs });
      response.setHeader("RateLimit-Limit", String(maxRequests));
      response.setHeader("RateLimit-Remaining", String(maxRequests - 1));
      response.setHeader("RateLimit-Reset", String(Math.ceil((now + windowMs) / 1000)));
      next();
      return;
    }

    current.count += 1;
    const remaining = Math.max(maxRequests - current.count, 0);
    response.setHeader("RateLimit-Limit", String(maxRequests));
    response.setHeader("RateLimit-Remaining", String(remaining));
    response.setHeader("RateLimit-Reset", String(Math.ceil(current.resetAt / 1000)));

    if (current.count > maxRequests) {
      response.setHeader("Retry-After", String(Math.ceil((current.resetAt - now) / 1000)));
      response.status(429).json({ error: "Too many requests" });
      return;
    }

    next();
  };
};
