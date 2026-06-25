# Local Development Guide

Follow these steps to launch the frontend and backend servers locally.

## Prerequisites
- Node.js (v18 or higher recommended)
- Docker & Docker Compose
- NPM (or Yarn/PNPM)

---

## 1. Setup Environment Configuration

Copy the root environmental variables blueprint into active files:

```bash
cp .env.example .env
```

Review the `.env` settings, particularly the database credentials and security tokens.

---

## 2. Boot Local Services (Docker)

Spin up the local PostgreSQL database, Redis cache, and pgAdmin administration console:

```bash
docker-compose up -d
```

Confirm that the PostgreSQL container is accepting connections on port `5432`.

---

## 3. Initialize Backend Server

1. Navigate to the backend directory and install package requirements:
   ```bash
   cd backend
   npm install
   ```
2. Execute Prisma database migrations to construct the tables:
   ```bash
   npx prisma migrate dev
   ```
3. Run the seed script to create initial admin and user credentials:
   ```bash
   npm run prisma:seed
   ```
4. Start the backend hot-reload development server:
   ```bash
   npm run dev
   ```

The backend is now accessible on port `5000` with endpoints mapped under `/api/v1`.

---

## 4. Initialize Frontend Client

1. Open a new terminal session, navigate to the frontend directory, and install requirements:
   ```bash
   cd frontend
   npm install
   ```
2. Boot the Vite hot-reload development client:
   ```bash
   npm run dev
   ```

The Single Page Application is now viewable on `http://localhost:3000`.

---

## 5. Verify Setup

Navigate to `http://localhost:3000/login` and sign in with the seeded accounts:
- **Super Admin**: `admin@enterprise.com` / `AdminPassword123!`
- **Standard User**: `user@enterprise.com` / `UserPassword123!`
