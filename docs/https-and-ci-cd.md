# HTTPS + Cloudflare + CI/CD

เอกสารนี้อธิบายงาน Task 8-11:

- Nginx redirect จาก port 80 ไป 443
- ใช้ Cloudflare Origin Certificate แบบ wildcard
- GitHub Actions CI/CD สำหรับ build image และ deploy ไป server
- Diagram CI/CD pipeline

## Task 8: Nginx รับจาก 80 แล้ว Redirect ไป 443

ไฟล์ config:

```text
nginx/default.conf
```

ส่วน port 80 ทำหน้าที่ redirect ไป HTTPS:

```nginx
server {
    listen 80;
    server_name api.zxcvbn.online;

    return 301 https://$host$request_uri;
}
```

แปลว่าเมื่อผู้ใช้เข้า:

```text
http://api.zxcvbn.online/health
```

Nginx จะตอบกลับเป็น redirect ไป:

```text
https://api.zxcvbn.online/health
```

ส่วน port 443 เป็นตัวรับ HTTPS จริง:

```nginx
server {
    listen 443 ssl;
    http2 on;
    server_name api.zxcvbn.online;

    ssl_certificate /etc/nginx/certs/origin.pem;
    ssl_certificate_key /etc/nginx/certs/origin.key;

    location / {
        proxy_pass http://api:4000;
    }
}
```

ใน `docker-compose.yml` Nginx เปิดทั้ง port 80 และ 443:

```yaml
ports:
  - "80:80"
  - "443:443"
```

## Task 9: Setup Cert ใน Cloudflare แบบ Wildcard

ส่วนนี้ต้องทำเองใน Cloudflare เพราะ certificate และ private key เป็น secret ของ domain

### สิ่งที่ต้องสร้างใน Cloudflare

ไปที่:

```text
Cloudflare Dashboard
-> เลือก domain zxcvbn.online
-> SSL/TLS
-> Origin Server
-> Create Certificate
```

ให้เลือก hostnames:

```text
*.zxcvbn.online
zxcvbn.online
```

แบบนี้ wildcard certificate จะใช้กับ:

```text
api.zxcvbn.online
```

ได้ด้วย

### วาง cert บน server

บน server ให้สร้างไฟล์:

```text
/root/Portfolio-Peem/nginx/certs/origin.pem
/root/Portfolio-Peem/nginx/certs/origin.key
```

โดย:

- `origin.pem` = Cloudflare Origin Certificate
- `origin.key` = Private Key

ห้าม commit cert/key จริงขึ้น GitHub

### ตั้ง SSL mode ใน Cloudflare

แนะนำตั้ง:

```text
SSL/TLS encryption mode: Full (strict)
```

เพราะ server มี Origin Certificate แล้ว

### เปิด port ใน Security Group

AWS EC2 security group ต้องเปิด:

```text
HTTP  TCP 80   0.0.0.0/0
HTTPS TCP 443  0.0.0.0/0
```

## Task 10: GitHub Actions CI/CD Pipeline

ตอนนี้ใช้ workflow หลักไฟล์เดียว:

ไฟล์:

```text
.github/workflows/docker-publish.yml
```

ทำงานเมื่อ push เข้า `main`

หน้าที่:

1. checkout branch `main`
2. setup Node.js
3. install dependencies ด้วย `npm ci`
4. run lint
5. build frontend
6. login Docker Hub ด้วย secrets
7. สร้าง image tag แบบ version เช่น `v0.0.0-123`
8. build Docker image แบบ `linux/amd64`
9. push image ไป Docker Hub ด้วย version tag เท่านั้น ไม่ push `latest`
10. SSH เข้า server
11. pull image tag ที่เพิ่ง upload
12. `docker-compose up -d --no-build` เพื่อ go live
13. health check ด้วย `curl http://localhost/health`
14. ส่ง webhook alert เมื่อ deploy สำเร็จ

ก่อน restart container workflow จะเช็กก่อนว่า server มี cert แล้ว:

```text
nginx/certs/origin.pem
nginx/certs/origin.key
```

ถ้ายังไม่มี workflow จะหยุด เพื่อกัน Nginx 443 start ไม่ขึ้นและทำให้ service ล่ม

ตัวอย่าง image tag:

```text
sirawit17766/portfolio-blog-api:v0.0.0-123
```

หมายเหตุ: เลขหลัง version คือ GitHub Actions run number ทำให้แต่ละ deploy มี tag แยกกัน และ server pull image ที่เพิ่ง build เสร็จได้ตรงตัว

### GitHub Secrets ที่ต้องมี

สำหรับ Docker Hub:

```text
DOCKER_USERNAME
DOCKER_PASSWORD
```

สำหรับ deploy เข้า server:

```text
SERVER_HOST
SERVER_USER
SERVER_SSH_KEY
DEPLOY_WEBHOOK_URL
```

ค่าตัวอย่าง:

```text
SERVER_HOST=13.213.19.183
SERVER_USER=root
SERVER_SSH_KEY=<private key content>
DEPLOY_WEBHOOK_URL=<webhook url for success alert>
```

อย่าใส่ private key ลงใน code โดยตรง ต้องใส่ใน GitHub Secrets เท่านั้น

## Task 11: CI/CD Pipeline Diagram

ไฟล์ draw.io:

```text
docs/ci-cd-pipeline.drawio
```

ภาพรวม flow:

```text
Developer Push
-> GitHub Actions
-> npm ci / lint / build
-> Build linux/amd64 Docker image
-> Push version tag to Docker Hub
-> SSH to EC2
-> Pull that exact version tag
-> docker-compose up -d
-> Health check
-> Webhook success alert
```

## วิธีทดสอบหลังตั้ง cert แล้ว

### Test 1: HTTP ต้อง redirect ไป HTTPS

```bash
curl -I http://api.zxcvbn.online/health
```

ผลลัพธ์ที่ควรเห็น:

```text
HTTP/1.1 301 Moved Permanently
Location: https://api.zxcvbn.online/health
```

### Test 2: HTTPS ต้องตอบ health check

```bash
curl https://api.zxcvbn.online/health
```

ผลลัพธ์ที่ควรได้:

```json
{"ok":true}
```

### Test 3: บน server container ต้องครบ

```bash
docker-compose ps
```

ควรเห็น:

```text
portfolio-blog-nginx
portfolio-blog-api
portfolio-blog-mongo
```

และ Nginx ต้องเปิด:

```text
0.0.0.0:80->80/tcp
0.0.0.0:443->443/tcp
```

### Test 4: GitHub Actions

เข้า:

```text
GitHub Repository -> Actions
```

ควรเห็น workflow:

```text
CI/CD Build and Deploy API
```

ถ้า deploy ผ่าน ต้องเห็น health check ได้:

```json
{"ok":true}
```

และ step webhook จะแจ้งสำเร็จถ้าตั้ง `DEPLOY_WEBHOOK_URL` ไว้ใน GitHub Secrets
