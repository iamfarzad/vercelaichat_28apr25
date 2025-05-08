## Brief overview
- Project-wide design system guidelines to ensure UI consistency, scalability, and maintainability across all components and pages.

## Component architecture
- Use modular, reusable React/Next.js components.
- Place shared UI primitives in `components/ui/`.
- Group feature-specific components in dedicated folders.
- Prefer composition over inheritance for extensibility.

## Styling conventions
- Use Tailwind CSS utility classes for layout, spacing, and color.
- Extend Tailwind via `tailwind.config.js` for custom tokens (colors, spacing, etc.).
- Avoid inline styles except for dynamic values.
- Use `app/globals.css` for global overrides only.

## Naming conventions
- Use PascalCase for component files and exports (e.g., `ModernButton.tsx`).
- Use camelCase for props, variables, and functions.
- Prefix UI primitives with `Ui` or descriptive names if needed for clarity.

## Theming & tokens
- Centralize theme logic in `components/theme-provider.tsx`.
- Reference design tokens (color, spacing, typography) from Tailwind config.
- Support dark mode and accessibility by default.

## State & props
- Keep components stateless when possible; use hooks for stateful logic.
- Pass only required props; avoid prop drilling by using context providers for global state.

## Accessibility
- Use semantic HTML elements and ARIA attributes.
- Ensure keyboard navigation and focus management.
- Test color contrast for readability.

## Documentation & usage
- Add JSDoc comments for complex components and exported functions.
- Provide usage examples in README or component-level comments when non-obvious.

## Testing
- Write unit tests for UI primitives and critical components.
- Use integration tests for user flows involving multiple components.

## Iconography & assets
- Store SVGs and images in `public/images/` or `components/icons.tsx`.
- Use inline SVG for icons when possible for styling flexibility.

## Other guidelines
- Avoid duplicating components or styles; refactor shared logic.
- Review and update the design system guidelines as the project evolves.
