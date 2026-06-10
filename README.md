# Portfolio + Blog API

โปรเจกต์นี้มี frontend portfolio ที่สร้างด้วย React/Vite และมี Blog REST API สำหรับ resource `posts`

## Requirements

- Node.js 20+
- npm
- MongoDB เฉพาะตอนใช้โหมด persist data

## Install

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

เปิดเว็บที่ `http://localhost:5173`

## Task 1: Blog API แบบ In-Memory

โหมดนี้ไม่ใช้ database ข้อมูลจะอยู่ใน memory และจะหายเมื่อ restart server

### Run API

```bash
npm run api:dev
```

API จะรันที่ `http://localhost:4000`

### Endpoints

#### GET /posts

ดึงรายการบทความทั้งหมด

```bash
curl http://localhost:4000/posts
```

Response example:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Deploy React/Vite with Cloudflare Pages",
      "content": "A starter post for testing the in-memory Blog API.",
      "createdAt": "2026-06-10T02:34:03.379Z",
      "views": 0
    }
  ]
}
```

#### POST /posts

สร้างบทความใหม่

```bash
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"My first post\",\"content\":\"Hello blog API\"}"
```

Required fields:

- `title`
- `content`

Optional fields:

- `id` ใช้กำหนด id เองเป็นตัวเลข เช่น `1`, `2`, `99`
- ถ้าไม่ส่ง `id` ระบบจะเพิ่มเลขให้อัตโนมัติ
- `id` ต้องเป็นจำนวนเต็มบวกเท่านั้น

Response status: `201 Created`

Example with custom numeric id:

```bash
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d "{\"id\":2,\"title\":\"My first post\",\"content\":\"Hello blog API\"}"
```

#### GET /posts/:id

ดึงบทความตาม `id` ที่ API คืนกลับมา หรือ id ที่เรากำหนดเองตอนสร้าง post

```bash
curl http://localhost:4000/posts/YOUR_POST_ID
```

ถ้าไม่เจอจะได้ `404 Post not found`

#### POST /posts/:id/view

เพิ่มจำนวน view ให้บทความ 1 ครั้ง

```bash
curl -X POST http://localhost:4000/posts/YOUR_POST_ID/view
```

Response example:

```json
{
  "data": {
    "id": 2,
    "title": "My first post",
    "content": "Hello blog API",
    "createdAt": "2026-06-10T02:34:03.379Z",
    "views": 1
  }
}
```

ถ้าไม่เจอ post จะได้ `404 Post not found`

## Task 2: Blog API with MongoDB Persistence

โหมดนี้ใช้ MongoDB เก็บข้อมูลจริง ข้อมูลจะไม่หายเมื่อ restart server

### Setup MongoDB

เลือกได้ 2 ทาง:

1. ใช้ MongoDB local
   - ติดตั้ง MongoDB Community Server
   - เปิด MongoDB ให้รันที่ `mongodb://127.0.0.1:27017`

2. ใช้ MongoDB Atlas
   - สร้าง cluster
   - สร้าง database user
   - Allow network access จาก IP เครื่องหรือ `0.0.0.0/0` สำหรับทดสอบ
   - copy connection string เช่น `mongodb+srv://USER:PASSWORD@cluster.mongodb.net`

### Environment Variables

สร้างไฟล์ `.env` จากตัวอย่าง:

```bash
copy .env.example .env
```

แก้ค่าใน `.env`:

```env
PORT=4000
BLOG_STORAGE=mongo
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=portfolio_blog
MONGODB_COLLECTION=posts
```

ถ้าใช้ MongoDB Atlas ให้เปลี่ยน `MONGODB_URI` เป็น connection string ของ Atlas

### Run API with MongoDB

```bash
npm run api:dev
```

ถ้าต่อ MongoDB สำเร็จ API จะรันที่ `http://localhost:4000` และข้อมูล posts จะ persist ใน database

### Extra Endpoint

#### DELETE /posts/:id

ลบบทความตาม `id`

```bash
curl -X DELETE http://localhost:4000/posts/YOUR_POST_ID
```

Response status:

- `204 No Content` ถ้าลบสำเร็จ
- `404 Post not found` ถ้าไม่เจอ id

## Task 3: Analytics

### GET /analytics/top-posts

ดึงบทความที่ views สูงสุด 3 อันดับแรก

```bash
curl http://localhost:4000/analytics/top-posts
```

Response example:

```json
{
  "data": [
    {
      "id": 2,
      "title": "Popular post",
      "content": "This post has many views",
      "createdAt": "2026-06-10T02:34:03.379Z",
      "views": 12
    }
  ]
}
```

ตัวอย่าง flow สำหรับทดสอบ analytics:

```bash
curl -X POST http://localhost:4000/posts/2/view
curl -X POST http://localhost:4000/posts/2/view
curl http://localhost:4000/analytics/top-posts
```

## API Response Shape

ทุก endpoint ที่คืนข้อมูลจะอยู่ในรูป:

```json
{
  "data": {}
}
```

Validation error:

```json
{
  "error": "Validation failed",
  "fields": {
    "title": "Title is required",
    "content": "Content is required"
  }
}
```

## Useful Scripts

```bash
npm run api:dev
npm run api:start
npm run dev
npm run build
```

## Task 4: Dockerize the System

This setup runs the Blog API and MongoDB together with one command.

### Files

- `Dockerfile` builds the API container
- `docker-compose.yml` runs API + MongoDB
- `.dockerignore` keeps local/dev files out of the Docker build context

### Run API + MongoDB

```bash
docker compose up --build
```

API will run at:

```text
http://localhost:4000
```

MongoDB will run at:

```text
mongodb://localhost:27018
```

The API container uses this internal Docker connection string:

```text
mongodb://mongo:27017
```

### Check Docker API

Health check:

```bash
curl http://localhost:4000/health
```

Create a post:

```bash
curl -X POST http://localhost:4000/posts \
  -H "Content-Type: application/json" \
  -d "{\"title\":\"Docker post\",\"content\":\"Created from Docker Compose\"}"
```

Get all posts:

```bash
curl http://localhost:4000/posts
```

Add a view:

```bash
curl -X POST http://localhost:4000/posts/1/view
```

Get top 3 posts:

```bash
curl http://localhost:4000/analytics/top-posts
```

### Stop Containers

```bash
docker compose down
```

Stop and delete MongoDB volume data:

```bash
docker compose down -v
```

Use `docker compose down -v` only when you want to delete the persisted MongoDB data.

## Task 5: CI/CD + Docker Image Publishing

GitHub Actions workflow:

```text
.github/workflows/docker-publish.yml
```

### Docker Hub Image

After the workflow runs successfully, the image will be available at:

```text
https://hub.docker.com/r/YOUR_DOCKER_USERNAME/portfolio-blog-api
```

Replace `YOUR_DOCKER_USERNAME` with the Docker Hub username stored in the `DOCKER_USERNAME` GitHub secret.

Image tags pushed by CI/CD:

```text
latest
v1
sha-GITHUB_COMMIT_SHA
```

### Required GitHub Secrets

Add these secrets in GitHub:

```text
DOCKER_USERNAME
DOCKER_PASSWORD
```

Where to add secrets:

```text
GitHub repository > Settings > Secrets and variables > Actions > New repository secret
```

Do not write Docker Hub username/password/token directly in the workflow file.

### Create Docker Hub Token

1. Go to Docker Hub
2. Open Account Settings
3. Open Security
4. Create a new Access Token
5. Copy the token
6. Save it in GitHub as `DOCKER_PASSWORD`

### CI/CD Flow

1. Push code to GitHub branch `main`
2. GitHub Actions starts `Build and Publish Docker Image`
3. Workflow installs dependencies with `npm ci`
4. Workflow runs `npm run lint`
5. Workflow runs `npm run build`
6. Workflow logs in to Docker Hub using GitHub Secrets
7. Workflow builds the API Docker image from `Dockerfile`
8. Workflow pushes tags `latest`, `v1`, and `sha-GITHUB_COMMIT_SHA` to Docker Hub

### Run Published Image with MongoDB

Example:

```bash
docker network create portfolio-blog

docker run -d --name portfolio-blog-mongo \
  --network portfolio-blog \
  -v portfolio-blog-mongo-data:/data/db \
  mongo:7

docker run -d --name portfolio-blog-api \
  --network portfolio-blog \
  -p 4000:4000 \
  -e PORT=4000 \
  -e BLOG_STORAGE=mongo \
  -e MONGODB_URI=mongodb://portfolio-blog-mongo:27017 \
  -e MONGODB_DB_NAME=portfolio_blog \
  -e MONGODB_COLLECTION=posts \
  YOUR_DOCKER_USERNAME/portfolio-blog-api:latest
```

Check:

```bash
curl http://localhost:4000/health
```

## Notes

- `BLOG_STORAGE=memory` ใช้สำหรับ Task 1 และไม่ต้องมี database
- `BLOG_STORAGE=mongo` ใช้สำหรับ Task 2 และต้องตั้งค่า `MONGODB_URI`
- `.env` ถูก ignore โดย git เพื่อไม่ให้ secret หลุดขึ้น repository
- MongoDB จะยังมี `_id: ObjectId(...)` เป็น id ภายในของ MongoDB อยู่เสมอ แต่ API จะใช้ field `id` แบบตัวเลขของเราเป็นหลัก
- `views` เริ่มต้นที่ `0` และเพิ่มผ่าน `POST /posts/:id/view`
