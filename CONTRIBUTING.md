# Contributing to fullstack-enterprise-template

Thank you for choosing to contribute to this enterprise template. Following these guidelines helps maintain high standards and code quality.

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before participating in this project.

## Development Workflow

1. Fork the repository and create your feature branch from `main`:
   ```bash
   git checkout -b feature/your-awesome-feature
   ```
2. Follow our coding standards and guidelines.
3. Write clean, self-documenting code with comments where necessary.
4. Verify your changes pass checks before submitting a PR:
   ```bash
   # In frontend or backend
   npm run lint
   npm run typecheck
   ```
5. Commit your changes following standard guidelines. We encourage [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add new authentication mechanism`
   - `fix: correct token cookie expiration logic`
   - `docs: update deployment guidelines`
6. Push to your branch and open a Pull Request.

## Coding Standards

### General Standards
- Keep code DRY, modular, and adhere to SOLID principles.
- Avoid duplicate logic. Extract shared helpers to standard library components (`utils`, `helpers`).
- Write complete TypeScript types. Never use `any` unless absolutely unavoidable.

### Backend Standards
- Maintain strict Layered Architecture: `Route -> Middleware -> Controller -> Service -> Repository -> Database`.
- Business logic must reside in `Services`, not in controllers or repositories.
- Keep controllers thin. They should parse requests, call services, and structure responses.
- Access databases only through `Repositories`.

### Frontend Standards
- Structure folders in a Feature-Based design.
- Wrap API integrations in TanStack Query hooks. Do not make raw Axios calls directly inside components.
- Separate layout templates from presentation UI components.
- Validate forms and query parameters using Zod schemas.
- Use Tailwind CSS with configuration variables rather than hardcoded inline values.
- Handle state globally using Zustand slices, keeping context providers for local compound components.
