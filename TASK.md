# ⚠️ AUTHENTICATION MUST BE MUTED

- Authentication (auth) is disabled/muted for all development and design work.
- No route or component should require real authentication.
- All usage of `next-auth` or `next-auth/react` must be bypassed, removed, or replaced with mock/guest logic.
- Middleware must not enforce authentication or redirect.
- Do not re-enable authentication until production prep.

# ✅ TASK.md – Vercel Chat AI Modal Integration (Source of Truth)

This file tracks the complete implementation of the floating modal-based chat UI.
It defines all the components, responsibilities, layout behaviors, and outstanding work.

---

## 🎯 Goal

Implement the full Vercel Chat AI interface inside a floating modal (`ChatPopover`) opened from the homepage.

---

## 🧱 Core Components

- `ChatPopover.tsx`: Modal wrapper. Handles portal, escape key, outside click, and renders layout.
- `ChatUIWrapper.tsx`: Composes layout for sidebar + chat + input using `SidebarProvider`.
- `HomePageClient.tsx`: Entry point with "Click to Chat" button that opens the modal.

---

## ✅ Completed

- [x] Clean modal open/close logic with ESC and background scroll lock
- [x] Full Chat UI composed via `ChatUIWrapper`
- [x] Scrollable chat area with sticky bottom input bar
- [x] Sidebar rendered inside the modal layout
- [x] Toggle button for sidebar visibility on mobile
- [x] Tailwind-based responsive layout (mobile + desktop)
- [x] Fixed build error: replaced non-existent `next/form` import in `auth-form.tsx` with standard `<form>`
- [x] Migration script now loads `.env` correctly for DB credentials (dotenv default)
- [x] Added clear production build instructions and one-command setup in README
- [x] Added `setup` script to package.json for onboarding
- [x] README and .env.example now clearly document environment setup and requirements
- [x] Enhanced MultimodalInput component with file attachments and dynamic resizing
- [x] Fixed syntax errors in message-actions.tsx component

---

## 🚧 To-Do

### 🔁 Functional

- [ ] Integrate working `session` and `selectedChatModel` from NextAuth or server context
- [ ] Ensure sidebar toggle works correctly across all screen sizes
- [ ] Validate scroll-to-bottom behavior on message stream
- [ ] Support uploading or multimodal UI (if desired)
- [ ] Fix remaining lint warnings in message-actions.tsx
- [ ] Test message actions (copy, upvote, downvote) functionality

### ✨ Enhancements

- [x] Modular Hero Section with AskBar and CTAButton (replaces old CTA/button logic)
- [x] AskBar sends its value as first chat message when popover opens
- [x] Animate the GlowingOrb with a pulse or effect
- [ ] CTAButton links to Calendly or opens a booking modal
- [ ] Add smooth open/close animation using `framer-motion`
- [ ] Remember sidebar visibility state (e.g. with `localStorage`)
- [ ] Optional dark/light theme toggle
- [ ] Add loading indicator to "Click to Chat" button
- [x] Resolve any remaining lint errors (type issues, imports, accessibility)
- [x] Double-check all modular imports/exports in hero-section and chat components

---

## 🧪 Manual Test Checklist

- [ ] Button opens chat modal cleanly
- [ ] Modal closes with ESC or outside click
- [ ] Chat renders with messages + input + sidebar
- [ ] Sidebar can toggle on small screens
- [ ] Input stays fixed during scroll
- [ ] Works on mobile and desktop

---

## 🧪 Automated Test Coverage

- [ ] All major components have adjacent or `tests/components/` test files
- [ ] All custom hooks and utilities have test files in `tests/hooks/` or `tests/lib/`
- [ ] Jest test suite runs with 80%+ coverage
- [ ] All tests pass (`npm test`)

---

## 🛡️ Build/Deploy Reliability (2025-05-01)

- All required dependencies are listed and lockfile is present for reproducible installs.
- Migration script now loads `.env` by default, so DB credentials are always picked up.
- README documents both development and production build workflows, including `.env` setup.
- One-command onboarding script (`pnpm run setup`) added for easy local start.
- All environment-dependent errors and onboarding friction resolved.
- Project is now portable and can be cloned, installed, and built anywhere with proper `.env`.

---

## 📁 Files Involved

- `/components/ChatPopover.tsx`
- `/components/ChatUIWrapper.tsx`
- `/components/HomePageClient.tsx`

---

## 🧪 Manual Test Checklist

- [ ] Button opens chat modal cleanly
- [ ] Modal closes with ESC or outside click
- [ ] Chat renders with messages + input + sidebar
- [ ] Sidebar can toggle on small screens
- [ ] Input stays fixed during scroll
- [ ] Works on mobile and desktop

# Project Troubleshooting & Progress Log

## Tooltip Containment & Positioning

- **Problem:** Tooltips were leaking outside the chat modal and sometimes clipped or misplaced.
- **Troubleshooting Steps:**
  - Implemented `TooltipContainerContext` in `chat-ui-wrapper.tsx` to provide a modal container ref for tooltips.
  - Updated `TooltipContent` in `ui/tooltip.tsx` to use this context and render via `createPortal`.
  - Removed `overflow-hidden` from the modal container to allow tooltips to be fully visible.
  - Added `collisionPadding={8}` to improve collision detection and ensure tooltips remain within boundaries.
  - Verified all tooltips use `side="bottom"` for proper positioning.
- **Result:** Tooltips now appear under buttons, remain fully visible, and are contained within the chat modal.

## Sidebar Layout & Content Expansion

- **Problem:** When the sidebar was closed, the main content area did not expand fully, leaving a gap on the left.
- **Troubleshooting Steps:**
  - Adjusted the sidebar's flex and width classes in `chat-ui-wrapper.tsx` (tried `hidden`, `w-0`, and transition tweaks).
  - Identified the root cause: the gap was due to `mx-auto` centering on the chat content container.
  - **Solution:** Moved the header row (window controls, visibility selector) outside of the centered `.mx-auto` container, so it hugs the left edge while the chat remains centered.
- **Result:** Main content now expands fully when the sidebar is closed, and header alignment matches the design.

## Duplicate Header Issue

- **Problem:** Two sets of window controls and visibility selectors appeared (one in the header, one in the chat column).
- **Troubleshooting Steps:**
  - Searched for all usages of `ChatHeader`.
  - Removed the import and JSX for `ChatHeader` from `chat.tsx`, ensuring it only renders in `chat-ui-wrapper.tsx`.
- **Result:** Only a single header appears at the top of the modal, matching the intended hierarchy.

## General Debugging & Linting

- Followed best practices: made changes only in canonical files, avoided duplicate components, and kept layout consistent with the original Vercel AI Chat template.
- Addressed TypeScript and linter errors as they arose, especially after moving or removing components.

---

**Summary:**

- Resolved tooltip containment and positioning issues.
- Fixed layout expansion for the chat area when the sidebar is closed.
- Eliminated duplicate headers.
- Maintained clean architecture and design fidelity throughout troubleshooting.

---

*For future reference, continue to log major issues and their solutions here for a clear project history.*

---

*Last updated: May 2, 2025* ✅

---

## 📝 Task Progress (Automated Test Coverage)

- [x] Scaffolded empty test files for all major components in `components/`
- [x] Moved/scaffolded test files into `tests/components/` as needed
- [ ] Scaffold missing test files for custom hooks in `hooks/` (`tests/hooks/`)
- [ ] Scaffold missing test files for utilities in `lib/` (`tests/lib/`)
- [ ] Run Jest test suite and ensure 80%+ coverage
- [ ] All tests pass (`npm test`)
- [ ] Summarize results and update this checklist

---
