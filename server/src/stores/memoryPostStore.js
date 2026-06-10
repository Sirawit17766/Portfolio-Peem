const initialPosts = [
  {
    id: 1,
    title: "Deploy React/Vite with Cloudflare Pages",
    content:
      "A starter post for testing the in-memory Blog API. Restarting the server will reset this data.",
    createdAt: new Date().toISOString(),
    views: 0,
  },
];

export class MemoryPostStore {
  constructor() {
    this.posts = [...initialPosts];
    this.nextId = Math.max(...this.posts.map((post) => post.id), 0) + 1;
  }

  async list() {
    return [...this.posts].sort((first, second) =>
      second.createdAt.localeCompare(first.createdAt),
    );
  }

  async create(input) {
    const id = input.id || this.nextId;

    if (this.posts.some((post) => post.id === id)) {
      const error = new Error("Post id already exists");
      error.status = 409;
      throw error;
    }

    const post = {
      id,
      title: input.title,
      content: input.content,
      createdAt: new Date().toISOString(),
      views: 0,
    };

    this.posts.unshift(post);
    this.nextId = Math.max(this.nextId, id + 1);
    return post;
  }

  async getById(id) {
    const numericId = Number(id);
    return this.posts.find((post) => post.id === numericId) || null;
  }

  async deleteById(id) {
    const numericId = Number(id);
    const originalLength = this.posts.length;
    this.posts = this.posts.filter((post) => post.id !== numericId);
    return this.posts.length !== originalLength;
  }

  async incrementViews(id) {
    const numericId = Number(id);
    const post = this.posts.find((item) => item.id === numericId);

    if (!post) {
      return null;
    }

    post.views += 1;
    return post;
  }

  async topPosts(limit = 3) {
    return [...this.posts]
      .sort((first, second) => {
        if (second.views !== first.views) {
          return second.views - first.views;
        }

        return second.createdAt.localeCompare(first.createdAt);
      })
      .slice(0, limit);
  }
}
