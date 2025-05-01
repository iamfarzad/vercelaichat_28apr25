# Farzad’s AI Consulting Platform

This project is a **personal website and AI consulting platform** in active development, built by customizing the [Vercel AI Chat SDK](https://github.com/vercel/ai-chatbot). The goal is to deliver advanced conversational AI demos, consulting services, and interactive features—all under a modern, branded web experience.

---

## 🚀 Project Vision

- Transform the open-source Vercel AI Chat template into a unique, personal, and professional platform for AI consulting.
- Showcase advanced chat, code, and interactive UI features.
- Provide a seamless client experience for inquiries, demos, and bookings.

---

## 🛠️ Customizations & Achievements

This project started as the Vercel AI Chat SDK, but has been heavily customized. **Key completed changes include:**

- **UI/UX:**
  - Floating modal-based chat UI (`ChatPopover`) with portal, ESC, and outside click handling.
  - Modular Hero Section with animated, parallax 3D orb (CSS-based) and AskBar.
  - Responsive layout and sidebar, mobile-first design.
  - Authentication fully muted for dev/design (see `TASK.md`).
  - Tailwind-based styling and shadcn/ui component primitives.

- **Code & Architecture:**
  - Canonical, non-duplicated components.
  - Modular imports/exports and clean file structure.
  - TypeScript and linting issues resolved.

- **AI & Code Features:**
  - Code editor with Python syntax highlighting (CodeMirror).
  - Easy extensibility for more models/providers.

> **Note:** The orb and hero-section files are just one part of the ongoing customization. See the [TASK.md](./TASK.md) for a detailed breakdown of completed and planned work.

---

## 🗺️ Roadmap & Ongoing Work

Major items still in progress or planned:
- Sidebar improvements and persistent state.
- Booking modal/Calendly integration.
- Dark/light theme toggle.
- Improved chat model selection and session handling.
- More animations and polish (framer-motion).
- Accessibility and performance enhancements.
- Full deployment and production readiness.

See [TASK.md](./TASK.md) for granular progress tracking.

---

## 🏗️ Running Locally

1. Copy environment variables:
   ```sh
   cp .env.example .env
   # Edit .env and set a valid POSTGRES_URL and any other required secrets.
   ```
2. Install dependencies:
   ```sh
   pnpm install
   # or
   npm install
   ```
3. Start the dev server:
   ```sh
   pnpm dev
   # or
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000)

---

## 🚀 Production Build

To build and run in production mode:

1. Ensure your .env file is set up with a valid POSTGRES_URL and all required secrets.
2. Build the project:
   ```sh
   pnpm build
   # or
   npm run build
   ```
3. Start the production server:
   ```sh
   pnpm start
   # or
   npm run start
   ```

---

## ⚡ One-Command Setup

For a quick start (dev/demo only):

```sh
pnpm run setup
# or
npm run setup
```

This will:
- Copy .env.example to .env (if not present)
- Install dependencies
- Generate DB client
- Start the dev server

> ⚠️ You must still edit .env and set a real POSTGRES_URL for migrations/build to succeed.
---

## 🙏 Credits & License

- **Original base:** [Vercel AI Chat SDK](https://github.com/vercel/ai-chatbot)
- **Current author:** Farzad (AI Consulting & Development)
- **License:** MIT

---

*This README is a living document and will be updated as the project evolves. For the most accurate status, see [TASK.md](./TASK.md).*
