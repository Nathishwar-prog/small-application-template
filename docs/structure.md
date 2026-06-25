# Folder Structure Blueprint

This blueprint describes the directories of the template repository, helping developers understand where to write code.

## Root Directory

```
/
├── frontend/             # Single Page Application React-Vite UI client
├── backend/              # Node.js and Express server backend
├── docs/                 # Architectural and setup documentation guides
├── examples/             # References for MongoDB setup, passport, etc.
├── scripts/              # Local server tooling scripts (seeding, resets)
├── .github/              # CI workflows and issue templates
└── docker-compose.yml    # PostgreSQL and Redis development Docker environment
```

---

## Backend Folders (`backend/src/`)

- **`config/`**: Decouples environment variables validated using Zod at startup.
- **`database/`**: Prisma DB Client singleton and database seed scripting.
- **`controllers/`**: HTTP transport handlers that parse requests.
- **`routes/`**: Centralized routes mounting controllers.
- **`services/`**: Business logic workflows and transactions.
- **`repositories/`**: Decoupled Prisma query interfaces.
- **`middlewares/`**: Rate limiters, logs handlers, validation checks.
- **`validators/`**: Request schema filters built on Zod.
- **`schemas/`**: Shared validation rules models.
- **`dto/`**: Data Transfer Objects sanitizing inputs/outputs.
- **`interfaces/`**: TypeScript application interfaces.
- **`models/`**: Domain type representations.
- **`logger/`**: Winston logger configs.
- **`storage/`**: Files uploads adapters (S3/Disk).
- **`uploads/`**: Target folder for local file uploads (gitignored).
- **`cache/`**: Redis cache keys helpers.
- **`events/`**: decopuled Event Emitters.
- **`queues/`**: bullMQ async worker runners.
- **`jobs/`**: scheduled cron schedules.
- **`notifications/`**: push notifications managers.
- **`mails/`**: Nodemailer template mailer setups.
- **`auth/`**: Auth cookies, JWT configs, hashes.
- **`permissions/`**: RBAC permissions mappings.
- **`errors/`**: AppError definitions and wrappers.
- **`docs/`**: API guides specs.

---

## Frontend Folders (`frontend/src/`)

- **`app/`**: Root bootstrapping React providers.
- **`assets/`**: Images, logos, corporate icons.
- **`components/ui/`**: Atomic presentation widgets (Buttons, Inputs).
- **`components/common/`**: Shared elements (Spinners, Modals).
- **`components/layout/`**: Layout panels (Sidebar, Headers).
- **`features/`**: Feature-Based directories (e.g. `user/`).
- **`hooks/`**: Shared React hooks (Local Storage listeners).
- **`pages/`**: View panels linked to route paths.
- **`services/`**: Telemetry and Analytics providers.
- **`api/`**: Axios instances with silent refresh interceptors.
- **`store/`**: Zustand global storage states.
- **`context/`**: Light/Dark theme contexts.
- **`config/`**: Front configuration maps.
- **`lib/`**: Classname mergers (clsx/tailwind-merge wrapper).
- **`schemas/`**: Shared Zod frontend validators.
- **`constants/`**: Immutable terms (Routes, keys).
- **`helpers/`**: Byte parsers or date formatters.
- **`utils/`**: Stateless calculations.
- **`styles/`**: Custom styling variables.
- **`routes/`**: Route components mapping guards.
- **`types/`**: General TypeScript typings.
