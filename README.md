# 🚀 Full Stack Enterprise Template

[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-Node-black?style=flat-square&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=flat-square&logo=docker)](https://www.docker.com/)

A premium, production-ready, highly scalable Full Stack Starter Template designed to support both small applications and enterprise-scale architectures without requiring core structural redesigns.

---

## 🛠️ Technology Stack

### Frontend (SPA Client)
- **Framework**: [React](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict compilation check)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Data Fetching & Cache**: [TanStack Query v5](https://tanstack.com/query)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)

### Backend (REST API Server)
- **Server**: [Node.js](https://nodejs.org/) & [Express](https://expressjs.com/)
- **ORM**: [Prisma ORM](https://www.prisma.io/)
- **Database**: PostgreSQL (Default) / MongoDB (Supported optional setup)
- **Authentication**: JWT Access Tokens & HttpOnly Cookie Refresh Tokens
- **Authorization**: Role-Based Access Control (RBAC) & Fine-Grained Permissions
- **Logger**: [Winston Logger](https://github.com/winstonjs/winston) (Separate Console/File streams)
- **Transports**: [Nodemailer](https://nodemailer.com/) (Mails dispatch) & [Multer](https://github.com/expressjs/multer) (File uploads)

---

## 📁 Repository Architecture

The template enforces modularity and separation of concerns through clean directory boundaries:

- **[`/frontend`](file:///g:/New%20folder/small-application-template/frontend)**: Contains React SPA feature-based client logic.
- **[`/backend`](file:///g:/New%20folder/small-application-template/backend)**: Contains layered Express server code.
- **[`/docs`](file:///g:/New%20folder/small-application-template/docs)**: In-depth guides (Architecture, Setup, REST API schemas).
- **[`/examples`](file:///g:/New%20folder/small-application-template/examples)**: Staging recipes for alternative storage providers.
- **[`/scripts`](file:///g:/New%20folder/small-application-template/scripts)**: Server command utility shortcuts.

---

## ⚡ Quick Start

### 1. Configure Environmental Variables
Copy the template variables file into active variables:
```bash
cp .env.example .env
```
*(Review settings, database credentials, and security tokens in `.env`)*

### 2. Launch Local Database (Docker Compose)
Launch PostgreSQL and Redis containers:
```bash
docker-compose up -d
```

### 3. Start Backend Server
```bash
cd backend
npm install
npx prisma migrate dev       # Run migrations
npm run prisma:seed          # Seed test accounts
npm run dev                  # Start Express hot-reload server
```
*(Backend runs on [http://localhost:5000/api/v1](http://localhost:5000/api/v1))*

### 4. Start Frontend Client
```bash
cd ../frontend
npm install
npm run dev                  # Start Vite hot-reload server
```
*(Client runs on [http://localhost:3000](http://localhost:3000))*

---

## 🔒 Default Test Accounts (Seeded)

- **Super Admin Credentials**:
  - **Email**: `admin@enterprise.com`
  - **Password**: `AdminPassword123!`
- **Standard User Credentials**:
  - **Email**: `user@enterprise.com`
  - **Password**: `UserPassword123!`

---

## 📚 Reference Guides

Refer to these guides inside the [`/docs`](file:///g:/New%20folder/small-application-template/docs) directory to drill into details:

- 🧱 **[Architecture Reference Guide](file:///g:/New%20folder/small-application-template/docs/architecture.md)**: Clean Architecture & SOLID designs.
- 🛠️ **[Template Customization Walkthrough](file:///g:/New%20folder/small-application-template/docs/customization.md)**: Steps to rename and add features.
- 📂 **[Folder Structure Blueprint](file:///g:/New%20folder/small-application-template/docs/structure.md)**: Directory maps and explanations.
- ⚙️ **[Local Development Setup](file:///g:/New%20folder/small-application-template/docs/development.md)**: Scripts and local environments.
- 🚢 **[Production Deployment Instructions](file:///g:/New%20folder/small-application-template/docs/deployment.md)**: Multi-stage Docker builds & Nginx configurations.
- 🌐 **[REST API Specifications](file:///g:/New%20folder/small-application-template/docs/api.md)**: Endpoint requests/responses.
- 📏 **[Coding Standards & Conventions](file:///g:/New%20folder/small-application-template/docs/standards.md)**: TypeScript style conventions and file suffixes.
