# Project Checklist: Persistent Global Chat Popover

**Goal:** Implement a persistent global chat popover, adhering to PRD specifications and best practices.

## Phase 1: Foundation for Global Chat Popover
- [ ] **1.1: Identify and Delete Problematic Legacy Chat Components**
    - [ ] Identify specific file paths for `chat-popover.tsx`, `chat-ui-wrapper.tsx`, or any other components intended for a previous chat paradigm that conflicts with the global popover approach.
    - [ ] Delete identified legacy components and remove their usages from other files.
- [ ] **1.2: Create `GlobalChatPopover.tsx` Component**
    - [ ] Create `components/GlobalChatPopover.tsx` (or a similar, clearly named file).
    - [ ] Implement the basic structure for the popover (e.g., using a `div` with appropriate styling for fixed/absolute positioning, z-index, initial dimensions, and visibility controlled by state).
    - [ ] Ensure it's a client component (`'use client'`).
- [ ] **1.3: Implement Zustand Store (`stores/chatStore.ts`)**
    - [ ] Create `stores/chatStore.ts` (if it doesn't exist, otherwise augment).
    - [ ] Define state for popover visibility: `isOpen: boolean` (defaulting to `false`).
    - [ ] Define actions: `openPopover: () => set({ isOpen: true })`, `closePopover: () => set({ isOpen: false })`, `togglePopover: () => set(state => ({ isOpen: !state.isOpen }))`.
    - [ ] Define state for an initial query: `initialQuery?: string`.
    - [ ] Define action: `setInitialQuery: (query: string) => set({ initialQuery: query, isOpen: true })`.
- [x] **1.4: Integrate Popover into Root Layout (`app/layout.tsx`)**
    - [x] Import `GlobalChatPopover.tsx` into `app/layout.tsx`.
    - [x] Render `<GlobalChatPopover />` within the `<body>` of the root layout.
    - [x] The `GlobalChatPopover.tsx` component itself will use the `chatStore` to manage its visibility.
- [x] **1.5: Create Global Trigger for Popover**
    - [x] Implement a trigger mechanism. This could be a new component `components/ChatTriggerButton.tsx` or integrated into an existing `components/Header.tsx`. (Integrated into `components/Header.tsx`)
    - [x] The trigger button should use the `togglePopover` (or `openPopover`) action from `chatStore`.
- [x] **1.6: Create/Refactor Chat Content Container (e.g., `ChatInterface.tsx`)**
    - [x] Create a new client component, e.g., `components/ChatInterface.tsx`. This component will be rendered *inside* `GlobalChatPopover.tsx`.
    - [x] **Crucially: Initialize the `useChat` hook within `ChatInterface.tsx`.** This is where the core chat logic (messages, input handling, API calls) will reside.
    - [x] Pass necessary props from `useChat` (e.g., `messages`, `input`, `handleInputChange`, `handleSubmit`, `append`, `reload`, `stop`, `isLoading`) to child message display and input components.

## Phase 2: Core Chat Functionality within Popover
- [x] **2.1: Implement Basic Message Display in `ChatInterface.tsx`**
    - [x] Create or reuse a `components/MessagesList.tsx` component (client component).
    - [x] Render this inside `ChatInterface.tsx`, passing the `messages` array from `useChat`.
    - [x] Style basic message bubbles for user and assistant.
- [x] **2.2: Implement Basic Chat Input in `ChatInterface.tsx`**
    - [x] Create or reuse a `components/ChatInputBar.tsx` component (client component).
    - [x] Render this inside `ChatInterface.tsx`.
    - [x] Include a `textarea` for input and a submit `button`.
    - [x] Connect to `useChat` (`input`, `handleInputChange`, `handleSubmit`).
- [x] **2.3: Verify Basic Send/Receive Functionality**
    - [x] Ensure the popover opens/closes via the trigger.
    - [x] Test sending a message and seeing it interact with the existing [`app/api/chat/route.ts`](app/api/chat/route.ts:1) (confirmed AI response).

## Phase 3: Backend API and Tool Logic (PRD Section 5)
- [ ] **3.1: Develop Backend Chat API (`app/api/chat/route.ts`)**
    - [ ] Create or ensure `app/api/chat/route.ts` exists.
    - [ ] Implement the `POST` handler.
    - [ ] Define the system prompt as per PRD.
    - [ ] Define tool schemas for `getServiceInformation` and `askForConfirmation` using `zod` and the AI SDK's tool definition format.
   
    - [ ] Implement b - [x] Integrate the chosen AI provider SDK (e.g., OpenAI, Anthropic).asic server-side execution logic for the defined tools (can be mocked initially).
- [x] **3.2: Implement Client-Side Tool Handling in `ChatInterface.tsx`**
    - [x] Add the `experimental_onToolCall` handler to the `useChat` options in `ChatInterface.tsx`.
    - [x] This handler will receive tool invocation details from the AI.
    - [x] Based on the tool name, it will either:
            - For `getServiceInformation`: Directly call `addToolResult` with mock/actual data.
            - For `askForConfirmation`: Render UI elements (e.g., Yes/No buttons) that, when clicked, will call `addToolResult` with the user's choice.

## Phase 4: Advanced Chat Features & Remaining PRD Items
:start_line:61
-------
- [~] **4.1: Implement UI for Tool Interactions & Artifacts**
    - [x] Design and implement UI elements within the message stream or a dedicated artifact area for `askForConfirmation` (e.g., buttons).
    - [x] Design and implement UI for displaying results from `getServiceInformation` (as artifacts).
    - [ ] If using `useArtifactSelector` (from PRD), integrate its usage for managing artifact visibility.
- [ ] **4.2: Hero "Ask Bar" Integration (PRD Section 7.1)**
    - [ ] Modify `components/hero-section/ask-bar.tsx` (or its parent hero section component).
    - [ ] On submission of the Ask Bar:
            - Call the `setInitialQuery` action from `chatStore` with the user's input.
            - This action should also ensure the popover opens (`isOpen: true`).
- [ ] **4.3: Static Pages & Global Navigation (PRD Section 6)**
    - [ ] Create/Verify `app/services/page.tsx` and its layout.
    - [ ] Ensure `components/Header.tsx` is complete, includes the chat trigger (if placed there), and provides navigation.
    - [ ] Create/Verify `components/Footer.tsx` (if applicable) and integrate into `app/layout.tsx`.
    - [ ] Verify content and structure of `app/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.
- [ ] **4.4: Styling and Theming (PRD Section 4.2)**
    - [ ] Review `app/globals.css` for completeness and ensure it defines theme variables (e.g., for `shadcn/ui` if used).
    - [ ] Ensure consistent use of theme variables and Tailwind CSS best practices across all new and refactored components.

## Phase 5: Testing and Refinement
- [ ] **5.1: Unit Tests (PRD Section 8)**
    - [ ] Write unit tests for critical new/refactored components: `GlobalChatPopover.tsx`, `ChatInterface.tsx`, `chatStore.ts`, and any complex UI logic for tools.
    - [ ] Write unit tests for the `app/api/chat/route.ts` tool handling logic if feasible.
- [ ] **5.2: End-to-End Testing**
    - [ ] Manually test all user flows:
            - Opening/closing popover via global trigger.
            - Submitting query via Hero "Ask Bar" and popover opening with query.
            - Sending messages and receiving AI responses.
            - Invocation and interaction with `getServiceInformation` tool.
            - Invocation and interaction with `askForConfirmation` tool.
            - Navigation across static pages with popover persistence/state.
- [ ] **5.3: Code Review & Best Practices**
    - [ ] Final review of all new/modified code for adherence to DRY, SRP, TypeScript best practices, and Next.js conventions.
    - [ ] Ensure accessibility considerations (ARIA attributes, keyboard navigation) for the popover and its contents.
- [ ] **5.4: Documentation Review**
    - [ ] Update any relevant internal documentation or comments.
    - [ ] Ensure this checklist is up-to-date.

## Phase 6: Advanced Integrations and Model Switching
- [ ] **6.1: Perplexity API - Advanced Features & Verification**
    - [ ] Implement Advanced Feature Preservation (Streaming, Tool Calls, Real-time Web Data) as per `vercel_tasklist.md` (lines 119-141).
    - [ ] Implement Source Citation Handling for Perplexity API as per `vercel_tasklist.md` (lines 143-152).
    - [ ] Perform Verification Checklist for Perplexity API as per `vercel_tasklist.md` (lines 162-174).
- [ ] **6.2: Implement Model Switching with Artifacts**
    - [ ] Set up Provider Registry for dynamic model selection (`lib/providers.ts`) as per `vercel_tasklist.md` (lines 209-255).
    - [ ] Create Model Selector UI (`components/model-selector.tsx`) as per `vercel_tasklist.md` (lines 258-281).
    - [ ] Configure Tools based on Selected Model in `app/api/chat/route.ts` as per `vercel_tasklist.md` (lines 289-351).
    - [ ] Implement Artifact Renderers in `components/chat-message.tsx` as per `vercel_tasklist.md` (lines 357-417).
    - [ ] Integrate Model Switching in the Chat UI (`components/chat.tsx`) as per `vercel_tasklist.md` (lines 421-462).

- [ ] **TODO (Revisit on May 9th): Database Connection Issue (`ERR_INVALID_URL`)**
    - **Status:** Was investigating `ERR_INVALID_URL` when running locally.
    - **Last Action:** Confirmed `DATABASE_URL` in [`.env.local`](.env.local:2) is in the correct format: `DATABASE_URL="postgresql://neondb_owner:npg_0xdl8PhLprGV@ep-autumn-truth-abfwgb1e-pooler.eu-west-2.aws.neon.tech/neondb?sslmode=require"`.
    - **Next Steps (Local):**
        1. Restart the Next.js development server (`pnpm dev`).
        2. Test if the `ERR_INVALID_URL` is resolved locally by attempting a database operation (e.g., sending a chat message).
        3. If the error persists, collect new server logs.
    - **Next Steps (Vercel Deployment - if local issue is resolved):**
        1. Review Vercel environment variable settings. The application uses `DATABASE_URL`.
        2. Ensure the Vercel deployment has access to the correct `DATABASE_URL` (with SSL, matching the format above), either through automatic integration with Neon or by manually setting it in Vercel project environment variables.
    - **Context:** The error logs showed the `DATABASE_URL` being processed as `postgres\\x3a//...` (malformed). The [`README.md`](README.md:1) mentions `POSTGRES_URL`, while the code in [`lib/db/queries.ts`](lib/db/queries.ts:46) uses `DATABASE_URL`.