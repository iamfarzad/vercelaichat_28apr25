# Authentication Muting & Restoration Plan

## Why Authentication Was Muted

Despite the directive in [TASK.md](./TASK.md) to mute all authentication for development, authentication logic kept appearing because:
- Legacy code and original Vercel template files still referenced `auth`, `next-auth`, and session logic.
- Not all imports/usages were removed or stubbed, so components/layouts still expected session/user data.
- Some logic was only partially muted, leading to lingering references or runtime checks.

**Goal:**
- Allow full design/development without authentication barriers.
- Make it easy to trace, reinstate, and test auth for production.

---

## Comprehensive Plan & Checklist

### 1. Locate & Mute All Auth Logic
- Search the entire codebase for `auth`, `next-auth`, `session`, `SessionProvider`, and related imports/usages.
- For each occurrence:
  - **Comment out** or stub the logic (e.g., pass `undefined` or a mock guest user).
  - Add a comment: `// AUTH MUTED FOR DEV (see auth_dis.md)`
  - If a component expects a session, always pass a mock or `undefined`.

### 2. Centralize Documentation
- Maintain this `auth_dis.md` as a living record:
  - List every file, component, or API route where auth was muted.
  - Note what was changed and where the canonical version now lives (e.g., all chat UI in `components/chat-popover.tsx`).
  - Update as you mute/unmute logic.

### 3. Consolidate Canonical Paths
- Ensure all chat, sidebar, and user logic is routed through the canonical modal/chat entrypoint (`components/chat-popover.tsx` and children).
- Remove or refactor any duplicate/legacy files or components.
- Update all imports to use the new, correct paths.

### 4. Test & Clean Up
- Test the UI to confirm all auth logic is muted and no authentication is required anywhere.
- After verifying, delete unused or duplicate files.
- Keep this checklist up to date.

### 5. Best Practices for Restoration
- When ready for production:
  1. **Uncomment all auth/session logic** in the files listed below.
  2. **Restore all redirects and session checks** for protected routes and APIs.
  3. **Test** authentication flows and protected UI thoroughly.
  4. **Remove all `// AUTH MUTED` comments** and update this document.
  5. **Ensure all imports** use the canonical component paths.

---

## Muted Authentication Locations (by Path)

### Components & UI
- `components/chat-popover.tsx` (accepts session prop, pass mock/undefined for dev)
- `components/chat-ui-wrapper.tsx` (accepts session prop, pass mock/undefined)
- `components/sidebar-user-nav.tsx` (uses `useSession`, comment/mock for dev)

### App Routes & API
- `app/(chat)/layout.tsx` (all auth/session logic removed)
- `app/(chat)/page.tsx` (comment/remove session/redirects)
- `app/(chat)/chat/[id]/page.tsx` (comment/remove session/redirects)
- `app/(chat)/api/chat/route.ts`, `api/chat/schema.ts`, `api/document/route.ts`, `api/files/upload/route.ts`, `api/history/route.ts`, `api/suggestions/route.ts`, `api/vote/route.ts` (comment/remove auth/user checks)
- `app/(chat)/actions.ts` (pass mock/undefined session)

### Auth System
- `app/(auth)/auth.ts`, `auth.config.ts`, `actions.ts` (retain logic, do not import/use in dev)
- `app/(auth)/api/auth/[...nextauth]`, `/api/auth/guest`, `/login`, `/register` (routes present, not used in dev)

### Other
- `middleware.ts` (ensure no auth/redirect logic)
- `components/sign-out-form.tsx` (remove/comment signOut logic)

---

## Canonical Structure & Routing
- All chat and sidebar logic is now routed through `components/chat-popover.tsx` and its children (e.g., `chat-ui-wrapper.tsx`).
- No authentication logic should exist outside these canonical components.
- All legacy or duplicate components should be deleted after consolidation.

---

## Restoration Checklist
- [ ] Search for and uncomment all `auth`, `next-auth`, and session logic in the files listed above.
- [ ] Restore all redirects and session checks for protected routes and APIs.
- [ ] Test authentication and protected UI thoroughly.
- [ ] Remove all `// AUTH MUTED` and related comments.
- [ ] Update this document to reflect the restored state.
- [ ] Confirm all imports use canonical paths.

---

## Traceability
- This file is the single source of truth for all authentication-related changes during development.
- Update as you mute/unmute logic or refactor paths.
- Reference this document for onboarding, audits, and production prep.


This document tracks all locations where authentication (`auth`, `next-auth`, session logic, redirects, etc.) has been **muted, commented out, or replaced with guest/mock logic** for development/design purposes.

## ⚠️ Restoration Policy
See [TASK.md](./TASK.md) for the rule: **Authentication must be muted for all development.**
When preparing for production, follow this checklist to reinstate authentication logic.

---

## Muted Authentication Locations

### Components & UI
- **components/chat-popover.tsx**
  - Accepts `session` prop; currently pass `undefined` or mock for dev.
  - Reinstate: Pass real session from server when auth is enabled.
- **components/chat-ui-wrapper.tsx**
  - Accepts `session` prop; currently pass `undefined` or mock for dev.
  - Reinstate: Pass real session from server.
- **components/sidebar-user-nav.tsx**
  - Uses `useSession` from `next-auth/react`. For dev, comment out or mock session/user logic.
  - Reinstate: Uncomment and restore real session usage.

### App Routes & API
- **/app/(chat)/layout.tsx**
  - Removed all `auth` and session logic. Only renders `{children}`.
  - Reinstate: Re-add `auth()` and session logic as needed.
- **/app/(chat)/page.tsx**
  - Comment out/remove: `const session = await auth();` and related redirects.
  - Reinstate: Uncomment and restore session/redirect logic.
- **/app/(chat)/chat/[id]/page.tsx**
  - Comment out/remove: `const session = await auth();`, session checks, and redirects.
  - Reinstate: Uncomment and restore session/redirect logic.
- **/app/(chat)/api/chat/route.ts**
  - If any `auth` logic, comment out or mock for dev.
  - Reinstate: Uncomment for production.
- **/app/(chat)/api/chat/schema.ts**
  - If any user/session validation, comment out for dev.
- **/app/(chat)/api/document/route.ts**, **/api/files/upload/route.ts**, **/api/history/route.ts**, **/api/suggestions/route.ts**, **/api/vote/route.ts**
  - Comment out/remove any `auth` or user checks for dev.
- **/app/(chat)/actions.ts**
  - If any actions require session, pass mock or undefined.

### Auth System
- **/app/(auth)/auth.ts**
  - All auth logic is retained but not used in dev. Do not import/use in other files.
- **/app/(auth)/auth.config.ts**
  - No changes for dev, but not imported/used.
- **/app/(auth)/actions.ts**
  - Comment out/remove any session-required logic.
- **/app/(auth)/api/auth/[...nextauth]**, **/api/auth/guest**, **/login**, **/register**
  - Routes present but not used in dev; do not redirect to or require for UI.

### Other
- **middleware.ts**
  - Ensure no authentication/redirect logic is active.
- **components/sign-out-form.tsx**
  - Remove or comment out signOut logic for dev.

---

## Best Practices for Reinstating Authentication
1. **Uncomment all imports and logic** for `auth`, `next-auth`, and session usage in the above files.
2. **Restore all redirects and session checks** for protected routes and API endpoints.
3. **Test** the authentication and session logic thoroughly before production.
4. **Remove all `// AUTH MUTED` and `// TODO: Reinstate auth` comments** after restoring.
5. **Update this document** to reflect the current state.

---

## Traceability
- This document is the single source of truth for all authentication-related changes during development.
- When in doubt, search for `auth`, `session`, `next-auth`, and check this file for context.