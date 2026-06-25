## Description

Please include a summary of the changes and the related issue (if any). List any dependencies that are required for this change.

Fixes # (issue)

## Type of Change

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Refactoring (internal optimization without functional or visual changes)
- [ ] Documentation update

## Architecture Adherence

Please check if your changes follow the repository guidelines:

- [ ] Business logic is kept within Service layers.
- [ ] All database accesses are structured via the Repository pattern.
- [ ] Frontend API requests are managed via TanStack Query and standard axios service wrappers.
- [ ] Types are strict, self-documenting, and without `any` overrides.

## How Has This Been Tested?

Please describe the tests that you ran to verify your changes. Provide instructions so we can reproduce.

- [ ] Test A
- [ ] Test B

## Checklist:

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings or typescript errors
- [ ] I have verified formatting matches (`npm run format`) and lint rules pass (`npm run lint`)
