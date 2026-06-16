# Service Task 12-13: MongoDB Volume and External Access

## What changed

MongoDB now stores data in a host bind-mount path instead of an anonymous container filesystem.

In `docker-compose.yml`:

```yaml
mongo:
  image: mongo:7
  ports:
    - "${MONGO_PORT:-27017}:27017"
  volumes:
    - "${MONGO_DATA_PATH:-./mongo-data}:/data/db"
```

Meaning:

- `MONGO_DATA_PATH` is the folder on the server that stores MongoDB files.
- `/data/db` is the MongoDB data folder inside the container.
- `MONGO_PORT` is the host port exposed for external MongoDB connections.
- If `MONGO_DATA_PATH` is not set, Docker Compose uses `./mongo-data`.

## Why data does not disappear

MongoDB writes database files to `/data/db`.

Because `/data/db` is mounted to a real server folder, data stays on the server even if:

- the MongoDB container is deleted
- the `mongo:7` image is removed and pulled again
- the MongoDB container is recreated
- the host path is moved and mounted again

Data disappears only if the mounted host folder is deleted.

## Server `.env` example

On production server, keep MongoDB data outside the repository folder:

```env
MONGO_DATA_PATH=/var/lib/portfolio-blog/mongo-data
MONGO_PORT=27017
```

Docker Compose reads this `.env` file automatically when it runs in `/root/Portfolio-Peem`.

## Test 1: data survives image deletion and pull

Create test data:

```bash
curl -k -X POST https://localhost/posts \
  -H "Content-Type: application/json" \
  -d '{"id":1201,"title":"Volume Persist Test","content":"This post must survive Mongo image removal."}'
```

Check it exists:

```bash
curl -k https://localhost/posts/1201
```

Delete the MongoDB container and image, then pull/run again:

```bash
docker-compose stop mongo
docker-compose rm -f mongo
docker rmi mongo:7
docker-compose up -d mongo
docker-compose up -d api nginx
```

Check the same data again:

```bash
curl -k https://localhost/posts/1201
```

Expected result: the post still exists.

## Test 2: move volume path and mount again

Stop services that use MongoDB:

```bash
docker-compose stop nginx api mongo
```

Move the data folder:

```bash
mkdir -p /var/lib/portfolio-blog
mv /root/Portfolio-Peem/mongo-data /var/lib/portfolio-blog/mongo-data
```

Set the new path in `/root/Portfolio-Peem/.env`:

```env
MONGO_DATA_PATH=/var/lib/portfolio-blog/mongo-data
MONGO_PORT=27017
```

Start again:

```bash
docker-compose up -d mongo api nginx
```

Check data:

```bash
curl -k https://localhost/posts/1201
```

Expected result: the post still exists from the new path.

## Test 3: connect MongoDB from outside

The container exposes MongoDB on server port `27017`.

Connection string:

```text
mongodb://13.213.19.183:27017
```

Or with domain:

```text
mongodb://api.zxcvbn.online:27017
```

In MongoDB Compass:

```text
mongodb://13.213.19.183:27017
```

Then open:

```text
portfolio_blog.posts
```

## Required manual step

AWS Security Group must allow inbound TCP `27017`.

For safety, do not open MongoDB to everyone unless it is only for a temporary test.
Prefer allowing only your current public IP:

```text
Type: Custom TCP
Port: 27017
Source: YOUR_PUBLIC_IP/32
```

Temporary test only:

```text
Type: Custom TCP
Port: 27017
Source: 0.0.0.0/0
```

## Security note

This project currently exposes MongoDB without username/password authentication.

For real production, MongoDB should not be publicly exposed. Use one of these instead:

- connect through SSH tunnel
- restrict port `27017` to your IP only
- enable MongoDB authentication
- use a private VPC/security group only

