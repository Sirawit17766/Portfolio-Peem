import { createApp } from "./src/app.js";
import { config } from "./config.js";
import { createPostStore } from "./src/stores/index.js";

const start = async () => {
  const store = await createPostStore(config);
  const app = createApp(store);

  const server = app.listen(config.port, () => {
    console.log(
      `Blog API is running on http://localhost:${config.port} using ${config.storage} storage`,
    );
  });

  const shutdown = async () => {
    await store.close?.();
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
};

start().catch((error) => {
  console.error("Failed to start Blog API");
  console.error(error);
  process.exit(1);
});
