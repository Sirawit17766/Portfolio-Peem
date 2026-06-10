import { MongoClient } from "mongodb";

const toPost = (document) => ({
  id: document.id || document._id.toString(),
  title: document.title,
  content: document.content,
  createdAt: document.createdAt,
  views: document.views || 0,
});

export class MongoPostStore {
  constructor(config) {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI is required when BLOG_STORAGE=mongo");
    }

    this.client = new MongoClient(config.mongoUri);
    this.dbName = config.mongoDbName;
    this.collectionName = config.mongoCollection;
  }

  async connect() {
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    this.collection = this.db.collection(this.collectionName);
    this.counters = this.db.collection("counters");

    const highestPost = await this.collection
      .find({ id: { $type: "number" } })
      .sort({ id: -1 })
      .limit(1)
      .next();

    await this.counters.updateOne(
      { _id: this.collectionName },
      { $max: { seq: highestPost?.id || 0 } },
      { upsert: true },
    );

    await this.collection.updateMany(
      { views: { $exists: false } },
      { $set: { views: 0 } },
    );

    await this.collection.createIndex({ id: 1 }, { unique: true });
    await this.collection.createIndex({ createdAt: -1 });
    await this.collection.createIndex({ views: -1 });
  }

  async getNextId() {
    const counter = await this.counters.findOneAndUpdate(
      { _id: this.collectionName },
      { $inc: { seq: 1 } },
      { upsert: true, returnDocument: "after" },
    );

    return counter.seq;
  }

  async list() {
    const documents = await this.collection.find({}).sort({ createdAt: -1 }).toArray();
    return documents.map(toPost);
  }

  async create(input) {
    const id = input.id || (await this.getNextId());
    const document = {
      id,
      title: input.title,
      content: input.content,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    try {
      const result = await this.collection.insertOne(document);

      if (input.id) {
        await this.counters.updateOne(
          { _id: this.collectionName },
          { $max: { seq: id } },
          { upsert: true },
        );
      }

      return toPost({ ...document, _id: result.insertedId });
    } catch (error) {
      if (error.code === 11000) {
        const duplicateError = new Error("Post id already exists");
        duplicateError.status = 409;
        throw duplicateError;
      }

      throw error;
    }
  }

  async getById(id) {
    const numericId = Number(id);
    const document = await this.collection.findOne({ id: numericId });
    return document ? toPost(document) : null;
  }

  async deleteById(id) {
    const numericId = Number(id);
    const result = await this.collection.deleteOne({ id: numericId });
    return result.deletedCount === 1;
  }

  async incrementViews(id) {
    const numericId = Number(id);
    const document = await this.collection.findOneAndUpdate(
      { id: numericId },
      { $inc: { views: 1 } },
      { returnDocument: "after" },
    );

    return document ? toPost(document) : null;
  }

  async topPosts(limit = 3) {
    const documents = await this.collection
      .find({})
      .sort({ views: -1, createdAt: -1 })
      .limit(limit)
      .toArray();

    return documents.map(toPost);
  }

  async close() {
    await this.client.close();
  }
}
