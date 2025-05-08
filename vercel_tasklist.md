# Chat AI SDK Parity Task List

## 1. Analysis & Comparison

### Original Vercel Chat AI SDK Features

- [ ] Modal-based chat UI with sidebar (chat history), chat area, sticky input, and model/visibility selectors
- [ ] Artifacts support: text, code, image, sheet, etc., with proper rendering in chat
- [ ] Multimodal input (file upload, etc.)
- [ ] Responsive, accessible, and theme-aware UI
- [ ] Uses shadcn/ui and Tailwind for styling
- [ ] Data persistence for chat history and artifacts
- [ ] Handles error, loading, and empty states for all async data
- [ ] Accessibility: aria-labels, keyboard navigation
- [ ] All features work with or without authentication (guest mode)

### Your Current Implementation

- [x] Modal chat UI (ChatPopover) with sidebar and chat area
- [x] Chat UI composed via ChatUIWrapper
- [x] Sidebar toggle, sticky input, responsive layout
- [x] Multimodal input and message actions present
- [x] Hero section, grid background, and branding customizations
- [x] Artifacts system (artifacts/ folder, artifact components) present
- [x] Error/empty states implemented for chat and messages
- [ ] Authentication is muted for dev/design

### Gaps/Areas to Validate

- [x] Sidebar: Error/empty state handling, chat history rendering
- [ ] Artifacts: Are all artifact types rendered in chat as in the original?
- [ ] Message bubbles: Avatars, timestamps, actions, and correct styling
- [x] Loading/empty/error states: For chat area implemented
- [x] Loading/empty/error states: For sidebar
- [ ] Loading/empty/error states: For artifacts
- [ ] Accessibility: All interactive elements have aria-labels, keyboard navigation
- [ ] Data persistence: Chat history and artifacts are saved and loaded
- [ ] Responsive and theme-aware UI everywhere

---

## 2. Parity Checklist

### Chat UI & Modal

- [ ] Modal opens/closes cleanly (ESC, outside click)
- [ ] Sidebar with chat history, user nav, and error/empty state handling
- [ ] Sidebar toggle works on all screen sizes
- [ ] Chat area renders messages as styled bubbles (with avatars, timestamps, actions)
- [ ] Sticky input bar with multimodal input (text, file upload)
- [ ] Model selector and visibility selector in header
- [x] Loading, empty, and error states for chat implemented
- [x] Loading, empty, and error states for sidebar
- [ ] Accessibility: aria-labels, keyboard navigation, skip links

### Artifacts

- [ ] All artifact types (text, code, image, sheet) supported and rendered in chat
- [ ] Artifact actions/toolbars (copy, run, polish, etc.) present
- [ ] Artifacts persisted and retrievable in chat history
- [ ] Artifact UI is accessible and theme-aware

### General

- [ ] Responsive layout and mobile support
- [ ] Theme support (light/dark)
- [ ] shadcn/ui and Tailwind used for all UI primitives
- [ ] Data persistence for chat and artifacts
- [ ] All dependencies and lockfiles up to date
- [ ] Automated/manual tests for all major features

---

## 3. Next Steps

- [ ] Refactor `multimodal-input.tsx` to match Vercel AI Chatbot UX: sticky footer, toolbar, artifact previews, quick actions.
- [ ] Integrate multimodal input visually/functionally into floating chat dialog/modal.
- [ ] Connect Ask Bar so it always opens the floating chat dialog/modal with the initial question.
- [ ] Audit and fix accessibility (ARIA, keyboard navigation, skip links).
- [ ] Ensure responsive and theme-aware UI for all chat components.
- [ ] Ensure all artifact types and actions are rendered in chat.
- [ ] Sidebar/history and model/visibility selectors present and functional in modal.
- [ ] Add/verify unit and integration tests for all new/changed UI and logic.

---
