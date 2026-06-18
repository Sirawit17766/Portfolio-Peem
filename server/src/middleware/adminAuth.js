export const requireAdminApiKey = (adminApiKey) => (request, response, next) => {
  if (!adminApiKey) {
    next();
    return;
  }

  const providedKey = request.get("x-api-key");

  if (providedKey !== adminApiKey) {
    response.status(401).json({ error: "Admin API key is required" });
    return;
  }

  next();
};
