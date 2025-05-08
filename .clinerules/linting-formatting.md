## Brief overview
- Project-wide linting and formatting rules using ESLint and Prettier to ensure code quality, consistency, and maintainability.

## ESLint guidelines
- Use ESLint for static code analysis and enforcing coding standards.
- Extend from `eslint:recommended`, `plugin:@typescript-eslint/recommended`, and `next/core-web-vitals` for Next.js projects.
- Enable TypeScript support via `@typescript-eslint`.
- Prefer error level for critical issues, warning for stylistic suggestions.
- Disallow unused variables, unreachable code, and implicit any types.
- Enforce consistent import order and grouping.
- Integrate with Prettier using `eslint-config-prettier` to avoid rule conflicts.

## Prettier guidelines
- Use Prettier for automatic code formatting.
- Set print width to 100, tab width to 2, use semicolons, and single quotes.
- Always use trailing commas in multi-line objects/arrays.
- Format on save in the editor.
- Do not include formatting rules in ESLint that overlap with Prettier.

## Workflow integration
- Run `eslint --fix` and `prettier --write` before commits (optionally via pre-commit hooks).
- Add `.eslintignore` and `.prettierignore` for files/folders to exclude.
- Document linting and formatting commands in the project README.

## Other guidelines
- Keep ESLint and Prettier dependencies up to date.
- Review and update rules as the codebase evolves.
