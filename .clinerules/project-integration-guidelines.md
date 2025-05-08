## Brief overview
- Guidelines for integrating, customizing, and maintaining project features based on the Vercel Chat AI SDK baseline, parity task lists, and authentication muting requirements.

## Baseline adherence
- Use the original Vercel Chat AI SDK as the reference for UI/UX, architecture, and feature set.
- Regularly compare implementation with the original repo and update parity checklists.
- Document any intentional deviations and their rationale.

## Task and parity management
- Maintain a parity checklist (e.g., `vercel_tasklist.md`) to track feature gaps, completed work, and next steps.
- For each unchecked item, create actionable tasks in `TASK.md` or equivalent.
- Update checklists and task files after each major change or feature implementation.

## Authentication muting
- Follow `auth_dis.md` and `TASK.md` for muting all authentication during development.
- Comment out, stub, or mock all `auth`, `next-auth`, and session logic.
- Add `// AUTH MUTED FOR DEV (see auth_dis.md)` comments where logic is bypassed.
- Keep `auth_dis.md` updated with all locations and details of muted authentication.

## Component and import hygiene
- Use canonical paths and aliases for all imports.
- Remove legacy, duplicate, or unused files after refactoring.
- Ensure all components and logic are routed through canonical entrypoints (e.g., `chat-popover.tsx`).

## Documentation and traceability
- Update README and task lists to reflect new features, architecture changes, and onboarding steps.
- Log major issues, solutions, and architectural decisions in project documentation.
- Keep all checklists, parity audits, and troubleshooting logs current for team traceability.

## Testing and validation
- Scaffold and maintain test files for all major components, hooks, and utilities.
- Ensure 80%+ test coverage and passing tests before major releases.
- Validate accessibility, responsiveness, and theming for all UI changes.

## Restoration for production
- When preparing for production, follow the restoration checklist in `auth_dis.md` to reinstate authentication.
- Remove all `// AUTH MUTED` comments and test authentication flows thoroughly.
- Update documentation to reflect the restored state.

## Other guidelines
- Use Tailwind CSS and shadcn/ui for all UI primitives.
- Prioritize accessibility, theme support, and responsive design.
- Commit after each major fix or feature, and document changes in the changelog.
