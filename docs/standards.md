# Coding Standards & Naming Conventions

To keep code quality high and maintainable across teams, all additions must follow these coding patterns.

---

## 1. Naming Conventions

We enforce unified file suffixes to identify a component's architectural layer immediately.

### 1.1 File Suffix Rules
Use standard kebab-case or dot-notated suffixes:
- **Controllers**: `*.controller.ts` (e.g. `user.controller.ts`)
- **Services**: `*.service.ts` (e.g. `user.service.ts`)
- **Repositories**: `*.repository.ts` (e.g. `user.repository.ts`)
- **Routes**: `*.routes.ts` (e.g. `user.routes.ts`)
- **Models**: `*.model.ts` (e.g. `user.model.ts`)
- **Validators**: `*.validation.ts` (e.g. `user.validation.ts`)
- **Data Transfer Objects**: `*.dto.ts` (e.g. `user.dto.ts`)
- **Constants**: `*.constants.ts` (e.g. `user.constants.ts`)

---

## 2. General Best Practices

- **Strict Typing**: TypeScript configurations are configured with `"strict": true`. Do not use `any` typings. Always define descriptive models and interfaces.
- **SOLID Design Principles**:
  - **Single Responsibility**: Every class/module must execute only one dedicated task.
  - **Interface Segregation**: Clients should not be forced to depend on methods they do not use.
- **DRY (Don't Repeat Yourself)**: Extract duplicate operations (such as token parsing or date formatting) to centralized helper libraries.
- **KISS (Keep It Simple, Stupid)**: Write clear self-documenting code. Prefer readable declarations over obscure clever optimizations.

---

## 3. Layered Design Rules (Backend)

- **Thin Controllers**: Controllers must only process incoming request parameters, pass inputs to Services, and format output statuses.
- **Encapsulated Business Logic**: Write core business calculations, password verification checks, database transactions, and workflow processes inside **Services**, never in controllers.
- **Isolated DB Layer**: Access the database strictly through **Repositories**. Never inject Prisma or MongoDB client instances directly inside controller handlers.
- **Centralized Validation**: Perform request validation via middlewares using Zod or express-validator schemas. Keep validation out of controller handler bodies.
