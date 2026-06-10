import { MemoryPostStore } from "./memoryPostStore.js";
import { MongoPostStore } from "./mongoPostStore.js";

export const createPostStore = async (config) => {
  if (config.storage === "memory") {
    return new MemoryPostStore();
  }

  if (config.storage === "mongo") {
    const store = new MongoPostStore(config);
    await store.connect();
    return store;
  }

  throw new Error(`Unsupported BLOG_STORAGE value: ${config.storage}`);
};
