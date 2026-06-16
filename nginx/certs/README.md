# Nginx Certificates

Put the Cloudflare Origin Certificate files here on the server:

```text
nginx/certs/origin.pem
nginx/certs/origin.key
```

Do not commit real certificate or private key files to git.

The Nginx container mounts this directory to:

```text
/etc/nginx/certs
```
