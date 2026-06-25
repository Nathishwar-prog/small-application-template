# Production Deployment Guide

This document details configurations for deploying the application stack into staging or production servers.

## 1. Production Docker Images

The repository includes production `Dockerfile` instructions that implement multi-stage build caching.

### 1.1 Backend Production Build
- Dockerfile: [backend/Dockerfile](file:///g:/New%20folder/small-application-template/backend/Dockerfile)
- Behavior:
  1. Installs all node modules (including devDependencies) to compile TypeScript code.
  2. Runs `npx prisma generate` to instantiate client types.
  3. Builds the outputs into javascript in `dist/`.
  4. Discards development dependencies, performing `npm ci --only=production` to maintain a tiny container footprint.

### 1.2 Frontend Production Build
- Dockerfile: [frontend/Dockerfile](file:///g:/New%20folder/small-application-template/frontend/Dockerfile)
- Behavior:
  1. Installs Node.js to compile static assets via Vite (`vite build`).
  2. Copies compiled bundle outputs (`dist/`) into an Alpine-Nginx runtime image.
  3. Uses [nginx.conf](file:///g:/New%20folder/small-application-template/frontend/nginx.conf) to serve assets and fall back to `index.html` on client routing.

---

## 2. Production Checklist

Before shipping changes to live servers:

### 2.1 Database Setup
- Set `DATABASE_URL` pointing to your hosted high-availability SQL cluster (e.g. AWS RDS, GCP Cloud SQL, or Neon).
- Run production migrations during release tasks:
  ```bash
  npx prisma migrate deploy
  ```

### 2.2 Security Tokens
- Ensure `JWT_SECRET` and `JWT_REFRESH_SECRET` are generated using secure base64 keys. E.g.:
  ```bash
  openssl rand -base64 32
  ```
- Change `COOKIE_SECURE` to `true` in the environment configuration so that cookie auth tokens are only dispatched over encrypted HTTPS requests.

### 2.3 CORS Origin
- Set `CORS_ORIGIN` to match your application's domain URL, rather than a wild-card character `*` or local dev hosts.
