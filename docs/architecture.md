# Architecture Reference Guide

This document outlines the core architectural patterns and principles governing this fullstack starter template.

## Architectural Goal
To support both micro-level web apps and enterprise scale systems without requiring re-engineering, we enforce a strict separation of concerns, decoupling our database layers, business requirements, and client controllers.

---

## 1. Backend Architecture (Layered Architecture)

The backend follows a strict **Layered (N-Tier) Architecture**:

```
Client ➔ Route ➔ Middleware ➔ Controller ➔ Service ➔ Repository ➔ Prisma/DB
```

Each tier holds unique operational duties:

### 1.1 Controllers (`controllers/`)
- Duties: Parse request bodies, headers, query parameters; delegate computations to Services; handle success responses or format catch exceptions.
- Rule: **No Business Logic, No DB Queries.** Thin structures that simply map HTTP concerns to core functions.

### 1.2 Services (`services/`)
- Duties: Realize application requirements, transaction controls, authorization assertions, and calculations.
- Rule: **Must use Repository interfaces.** Devoid of Express dependencies (`req`, `res`), allowing them to be run inside scripts or cron jobs without modifications.

### 1.3 Repositories (`repositories/`)
- Duties: Handle raw database data queries. Uses database clients (e.g. Prisma) to abstract standard CRUD options.
- Rule: **No Business Logic.** Serves strictly to interact with storage engines.

---

## 2. Frontend Architecture (Feature-Based Architecture)

The frontend is structured under a **Feature-Based design**, where directories are modularized around business capabilities (such as authentication or users management):

```
frontend/src/features/user/
├── api/          # AXIOS API calls
├── components/   # Presentation cards/forms
├── hooks/        # React Query handlers
├── pages/        # Route view containers
├── types/        # TypeScript interfaces
└── validation/   # Zod validator rules
```

This structure localizes changes, making scaling straightforward by allowing developers to simply append a self-contained feature folder when extending functionalities.
