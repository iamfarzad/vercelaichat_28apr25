
# Project: AI Chat Popover for Consulting Website - PRD & To-Do List

## 1. Project Goal & Overview

**Goal:** To integrate a globally accessible, persistent AI chat popover into your Next.js website (`iamfarzad/vercelaichat_28apr25`). This popover will:

* Use the UI/UX patterns of the Vercel AI Chatbot.
* Be customized with your brand colors and identity.
* Retain full functionality, including message streaming and rendering of AI "artifacts" (tool invocations).
* Be triggerable from various parts of the site, especially a hero "ask bar" on the homepage.
* Persist chat history across page navigations.
* Support additional static pages for your consulting services (`/home`, `/about`, `/services`, `/contact`).

## 2. Core Technologies & Initial Setup

* **Next.js (App Router):** Assumed as your primary framework.
* **Vercel AI SDK:** For chat functionality (`useChat`, `streamText`, tools).
* **`shadcn/ui`:** For UI components (Popover, Button, Input, ScrollArea, etc.).
* **Tailwind CSS:** For styling.
* **Zustand:** For simple global state management (popover visibility, initial query).
* **AI Provider:** OpenAI, Groq, Anthropic, etc. (Ensure API keys are set up in your `.env.local` or Vercel environment variables).

**Checkpoint:**

* [ ] Your Next.js project (`iamfarzad/vercelaichat_28apr25`) is running locally.
* [ ] `shadcn/ui` is initialized (`npx shadcn-ui@latest init`).
* [ ] Vercel AI SDK (`ai` package) and your chosen AI provider's SDK (e.g., `@ai-sdk/openai`) are installed.
* [ ] Zustand is installed (`npm install zustand` or `pnpm add zustand`).

## 3. Phase 1: Global State & Popover Foundation

### 3.1. Setup Global State for Popover (Zustand)

* **Objective:** Create a store to manage the popover's open/closed state and any initial query sent to it.
* **File to Create (Your Version):** `src/stores/chatStore.ts` (or `app/stores/chatStore.ts`)

    ```
    // src/stores/chatStore.ts
    import { create } from 'zustand';

    interface ChatState {
      isPopoverOpen: boolean;
      initialQuery: string | null;
      openPopover: (initialQuery?: string) => void;
      closePopover: () => void;
      setInitialQuery: (query: string | null) => void;
    }

    export const useChatStore = create<ChatState>((set) => ({
      isPopoverOpen: false,
      initialQuery: null,
      openPopover: (initialQueryFromTrigger) => set({ isPopoverOpen: true, initialQuery: initialQueryFromTrigger || null }),
      closePopover: () => set({ isPopoverOpen: false, initialQuery: null }),
      setInitialQuery: (query) => set({ initialQuery }),
    }));
    ```

* **Checkpoint:**
  * [ ] `chatStore.ts` file is created with the code above.

### 3.2. Create Global Chat Popover Component Shell

* **Objective:** Create the main component that will house the popover and the `useChat` hook. This component will persist across page navigations.
* **File to Create (Your Version):** `src/components/GlobalChatPopover.tsx` (or `app/components/GlobalChatPopover.tsx`)

    ```
    // src/components/GlobalChatPopover.tsx
    'use client';

    import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // From shadcn/ui
    import { Button } from '@/components/ui/button'; // From shadcn/ui
    import { MessageSquareText } from 'lucide-react'; // Icon for the trigger
    import { useChatStore } from '@/stores/chatStore'; // Your Zustand store
    import { useEffect } from 'react';
    // Placeholder for ChatUI for now
    // import ChatUI from './ChatUI';

    export default function GlobalChatPopover() {
      const { isPopoverOpen, openPopover, closePopover, initialQuery, setInitialQuery } = useChatStore();

      // We'll add useChat hook here later in Phase 5

      return (
        <Popover open={isPopoverOpen} onOpenChange={(open) => (open ? openPopover() : closePopover())}>
          <PopoverTrigger asChild>
            <Button
              variant="outline" // Customize later
              size="icon"
              className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg"
              aria-label="Open AI Chat"
            >
              <MessageSquareText className="h-6 w-6" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            align="end"
            className="w-[calc(100vw-32px)] sm:w-[400px] h-[70vh] sm:h-[550px] p-0 z-50 flex flex-col" // Basic popover styling
            onInteractOutside={(e) => {
              // Optional: e.preventDefault(); if you want to prevent closing on outside click sometimes
            }}
          >
            {/* ChatUI component will go here in Phase 4 */}
            <div className="p-4">Popover Content Area - ChatUI will replace this.</div>
            <button onClick={closePopover} className="m-2 p-1 bg-red-500 text-white">Close Me (Temp)</button>
          </PopoverContent>
        </Popover>
      );
    }
    ```

* **Checkpoint:**
  * [ ] `GlobalChatPopover.tsx` created with basic Popover structure.
  * [ ] Temporary "Close Me" button works.

### 3.3. Integrate Global Popover into Main Layout

* **Objective:** Ensure the `GlobalChatPopover` is rendered on every page.
* **File to Modify (Your Version):** `src/app/layout.tsx`

    ```
    // src/app/layout.tsx
    import './globals.css'; // Your global styles
    import { Inter } from 'next/font/google'; // Or your preferred font
    import GlobalChatPopover from '@/components/GlobalChatPopover'; // Adjust path if needed
    // Import your Header/Footer components if you have them
    // import Header from '@/components/layout/Header';
    // import Footer from '@/components/layout/Footer';

    const inter = Inter({ subsets: ['latin'] });

    export const metadata = {
      title: 'Your AI Consulting Co.', // Your site title
      description: 'Expert AI Solutions and Courses', // Your site description
    };

    export default function RootLayout({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            {/* <Header /> */}
            <main className="min-h-screen"> {/* Ensure content pushes footer down */}
              {children}
            </main>
            {/* <Footer /> */}
            <GlobalChatPopover /> {/* <<< ADD THIS LINE */}
          </body>
        </html>
      );
    }
    ```

* **Checkpoint:**
  * [ ] The popover trigger button (MessageSquareText icon) appears on all pages.
  * [ ] Clicking the trigger opens and closes the placeholder popover content.

## 4. Phase 2: Building the Chat UI (Branded & Functional)

This is where you replicate the look and feel of the Vercel AI Chatbot's chat interface.

* **Reference (Original Vercel Template):** Look at `vercel/ai-chatbot/components/chat.tsx` (or similar files in their examples) for UI structure, component usage (`ScrollArea`, message bubble styling).

### 4.1. Create the Core `ChatUI` Component Structure

* **Objective:** Build the internal UI of the chat window.
* **File to Create (Your Version):** `src/components/ChatUI.tsx`

    ```
    // src/components/ChatUI.tsx
    'use client';

    import { type Message } from 'ai/react'; // Will be used later
    import { ScrollArea } from '@/components/ui/scroll-area';
    import { Input } from '@/components/ui/input';
    import { Button } from '@/components/ui/button';
    import { SendHorizonal, XIcon, BotIcon, UserIcon } from 'lucide-react';
    import React, { useRef, useEffect } from 'react';
    import Image from 'next/image';

    interface ChatUIProps {
      messages: Message[]; // Will come from useChat
      input: string; // Will come from useChat
      handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void; // From useChat
      handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // From useChat
      isLoading: boolean; // From useChat
      error?: Error | undefined; // From useChat
      onClose: () => void; // From chatStore via GlobalChatPopover
      brandName?: string;
      brandLogoUrl?: string;
      // addToolResult prop will be added in Phase 5
    }

    export default function ChatUI({
      messages, input, handleInputChange, handleSubmit, isLoading, error, onClose,
      brandName = "AI Assistant", brandLogoUrl,
    }: ChatUIProps) {
      const scrollAreaRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        if (scrollAreaRef.current) {
          scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
      }, [messages]);

      // Dummy messages for layout testing initially
      const dummyMessages: Message[] = messages.length > 0 ? messages : [
        { id: '1', role: 'assistant', content: 'Hello! How can I help you with AI today?' },
        { id: '2', role: 'user', content: 'I have a question about large language models.' },
      ];

      return (
        <div className="flex flex-col h-full bg-background rounded-md border">
          {/* Header */}
          <div className="flex items-center justify-between p-3 px-4 border-b">
            <div className="flex items-center gap-2">
              {brandLogoUrl && <Image src={brandLogoUrl} alt={brandName} width={24} height={24} className="rounded-sm" />}
              <h3 className="font-semibold text-md text-foreground">{brandName}</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close chat">
              <XIcon className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            </Button>
          </div>

          {/* Message List Area */}
          <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {dummyMessages.length === 0 && !isLoading && (
                <p className="text-muted-foreground text-sm text-center py-8">
                  Ask me anything!
                </p>
              )}
              {dummyMessages.map((m) => ( // Use dummyMessages for now
                <div key={m.id} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'assistant' && (
                    <span className="flex-shrink-0 p-1.5 bg-muted rounded-full mb-1 border">
                      <BotIcon className="h-4 w-4 text-foreground" />
                    </span>
                  )}
                  <div
                    className={`max-w-[75%] p-3 rounded-lg shadow-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-card text-card-foreground border rounded-bl-none'
                    }`}
                  >
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <span className="flex-shrink-0 p-1.5 bg-primary text-primary-foreground rounded-full mb-1 border border-primary-foreground/20">
                      <UserIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              ))}
              {/* Placeholder for loading indicator */}
              {/* {isLoading && <div className="text-muted-foreground">Thinking...</div>} */}
            </div>
          </ScrollArea>

          {/* Error Display Area (Implement later) */}
          {/* {error && <div className="p-2 text-sm text-destructive bg-destructive/10 border-t">Error: {error.message}</div>} */}

          {/* Input Form Area */}
          <form onSubmit={handleSubmit} className="p-3 border-t bg-background">
            <div className="flex items-center gap-2">
              <Input
                value={input} // Will be empty initially
                onChange={handleInputChange}
                placeholder="Ask about AI, courses, or services..."
                disabled={isLoading} // Will be false initially
                className="flex-grow bg-muted border-muted focus-visible:ring-primary focus-visible:ring-1"
              />
              <Button type="submit" disabled={isLoading || !input?.trim()} aria-label="Send message">
                <SendHorizonal className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </div>
      );
    }
    ```

* **File to Modify (Your Version):** `src/components/GlobalChatPopover.tsx`
  * Uncomment `import ChatUI from './ChatUI';`
  * Replace the placeholder `<div>Popover Content Area...</div>` and temporary close button with:

        ```
        <ChatUI
          messages={[]} // Empty for now, will come from useChat
          input=""     // Empty for now
          handleInputChange={() => {}} // Placeholder
          handleSubmit={(e) => e.preventDefault()} // Placeholder
          isLoading={false} // Placeholder
          onClose={closePopover}
          brandName="Your AI Helper" // Customize
          // brandLogoUrl="/logo.svg" // Optional: Path to your logo in public/
        />
        ```

* **Checkpoint:**
  * [ ] `ChatUI.tsx` is created and renders inside the `GlobalChatPopover`.
  * [ ] The popover now shows the header, dummy message list, and input form.
  * [ ] The "Close" (X) button in the `ChatUI` header works.

### 4.2. Style `ChatUI` with Your Brand Colors (via `shadcn/ui` Theming)

* **Objective:** Apply your brand colors to all `shadcn/ui` components.
* **File to Modify (Your Version):** `src/app/globals.css`

    ```
    /* src/app/globals.css */
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    @layer base {
      :root {
        /* ---- YOUR BRAND COLORS START ---- */
        /* Example: A cool blue primary theme */
        --background: 210 40% 98%; /* Light mode page background */
        --foreground: 210 40% 9.8%; /* Light mode text */

        --card: 210 40% 98%;
        --card-foreground: 210 40% 9.8%;

        --popover: 210 40% 98%;
        --popover-foreground: 210 40% 9.8%;

        --primary: 221.2 83.2% 53.3%; /* Your main brand color (e.g., a vibrant blue) */
        --primary-foreground: 210 40% 98%; /* Text on your primary color (often white) */

        --secondary: 217.2 32.6% 17.5%; /* Your secondary color */
        --secondary-foreground: 210 40% 98%;

        --muted: 210 40% 96.1%; /* For subtle backgrounds, borders */
        --muted-foreground: 215 20.2% 65.1%; /* Text on muted backgrounds */

        --accent: 217.2 32.6% 17.5%; /* Accent color */
        --accent-foreground: 210 40% 98%;

        --destructive: 0 84.2% 60.2%;
        --destructive-foreground: 210 40% 98%;

        --border: 214.3 31.8% 91.4%;
        --input: 214.3 31.8% 91.4%; /* Input field background/border */
        --ring: 221.2 83.2% 53.3%; /* Focus ring color - often same as primary */
        /* ---- YOUR BRAND COLORS END ---- */

        --radius: 0.5rem; /* Controls border-radius for many components */
      }

      .dark { /* Optional: Define your dark mode colors */
        --background: 222.2 84% 4.9%;
        --foreground: 210 40% 98%;
        /* ... and so on for all variables */
      }
    }
    /* ... rest of your globals.css */
    ```

  * **Action:** Replace the HSL values above with your actual brand colors. Use an online "Hex to HSL converter".
* **Tailwind Config Check:** Ensure your `tailwind.config.js` uses these CSS variables (this is usually set up by `shadcn-ui init`).
* **Checkpoint:**
  * [ ] `Button` (like the Send button), `Input`, and message bubbles in `ChatUI` reflect your new brand colors.
  * [ ] The primary user message bubble uses `bg-primary` and `text-primary-foreground`.

## 5. Phase 3: Backend & AI SDK Integration for Full Functionality

### 5.1. Setup Backend API Route for Chat

* **Objective:** Create the Next.js API route that the `useChat` hook will call.
* **File to Create (Your Version):** `src/app/api/chat/route.ts`

    ```
    // src/app/api/chat/route.ts
    import { experimental_generateObject, streamText, tool } from 'ai'; // Or streamUI for more complex server-side UI generation
    import { OpenAI } from '@ai-sdk/openai'; // Or your chosen provider: e.g., import { Groq } from '@ai-sdk/groq';
    import { z } from 'zod';

    // Initialize your AI provider client
    // Make sure OPENAI_API_KEY (or GROQ_API_KEY, etc.) is in your .env.local
    const aiProvider = new OpenAI({
      // apiKey: process.env.OPENAI_API_KEY, // Handled automatically by the SDK
      // baseURL: process.env.OPENAI_API_BASE, // Optional: For custom endpoints or proxies
    });
    // Example for Groq: const aiProvider = new Groq();

    export const maxDuration = 30; // Optional: Set a higher timeout for Vercel Hobby tier

    export async function POST(req: Request) {
      const { messages } = await req.json();

      const result = await streamText({
        model: aiProvider.chat('gpt-4o-mini'), // Replace with your desired model, e.g., 'llama3-8b-8192' for Groq
        system: "You are a helpful AI assistant for a consulting website. Be friendly and informative. You can answer questions about AI, available courses, and consulting services.",
        messages,
        tools: {
          // Define dummy tools for now, we'll implement rendering later
          getServiceInformation: tool({
            description: 'Get details about a specific consulting service offered.',
            parameters: z.object({
              serviceName: z.string().describe('The name of the service to get information about (e.g., "AI Strategy Workshop", "Custom Model Development").'),
            }),
            execute: async ({ serviceName }) => {
              // In a real app, you'd fetch this from a DB or CMS
              if (serviceName.toLowerCase().includes("strategy")) {
                return {
                  serviceName,
                  description: "Our AI Strategy Workshop helps businesses identify AI opportunities and create a roadmap.",
                  duration: "1-2 days",
                  cost: "$5,000 - $10,000"
                };
              }
              return { serviceName, description: `Details for ${serviceName} not found. Available services: AI Strategy Workshop, Custom Model Development.`, notFound: true };
            },
          }),
          askForConfirmation: tool({ // A client-side interactive tool
            description: 'Asks the user for a yes/no confirmation before proceeding with an action. The message should be clear.',
            parameters: z.object({
                message: z.string().describe('The question or statement to present to the user for confirmation.'),
            }),
            // No execute function: This tool is handled by the client, which then calls addToolResult.
          }),
        },
      });

      return result.toDataStreamResponse();
    }
    ```

* **Checkpoint:**
  * [ ] `src/app/api/chat/route.ts` created.
  * [ ] Environment variable for your AI provider's API key is set in `.env.local` (e.g., `OPENAI_API_KEY=sk-...`).

### 5.2. Integrate `useChat` in `GlobalChatPopover`

* **Objective:** Connect the frontend chat UI to the backend using the Vercel AI SDK's `useChat` hook.
* **File to Modify (Your Version):** `src/components/GlobalChatPopover.tsx`
  * Import `useChat` and `ToolCallHandler`:

        ```
        import { useChat, type ToolCallHandler, type Message } from 'ai/react';
        ```

  * Inside the `GlobalChatPopover` component function, before the `return` statement:

        ```
        // Inside GlobalChatPopover component
        const handleToolCall: ToolCallHandler = async ({ toolCall, addToolResult: clientAddToolResult }) => {
            // Example: Client-side tool like getting user's current theme preference
            if (toolCall.toolName === 'getUserThemePreference') {
              // This is a dummy example. In a real scenario, you might read from localStorage or a context.
              const theme = document.body.classList.contains('dark') ? 'dark' : 'light';
              clientAddToolResult({ toolCallId: toolCall.toolCallId, result: { theme } });
              return; // Important to return after handling
            }

            // For tools like 'askForConfirmation', the UI is rendered in ChatUI.
            // The actual addToolResult for those will be invoked by user interaction in ChatUI.
            // No specific action needed here for 'askForConfirmation' unless there's pre-interaction client logic.
            console.log(`Client-side handler: Tool call received for ${toolCall.toolName}`, toolCall.args);
            // If you don't handle a tool here, it might mean it's fully server-side or UI-interactive.
        };

        const { messages, input, handleInputChange, handleSubmit, append, isLoading, error, addToolResult } = useChat({
          api: '/api/chat', // Path to your backend API route
          initialMessages: [], // Or load from localStorage for persistence across sessions
          onToolCall: handleToolCall, // Handler for client-side tools
          onFinish: (message) => {
            console.log('Chat finished receiving message:', message);
            // You can perform actions here when a message stream is fully received
          },
          onError: (err) => {
            console.error('Chat error:', err);
            // Display a user-friendly error message in the UI
          }
        });

        // Effect to handle initial query from hero bar or elsewhere
        useEffect(() => {
          if (initialQuery && isPopoverOpen) {
            // Check if this query hasn't already been sent (to avoid re-sending on popover toggle)
            // A simple check: if the last message isn't this query, or no messages exist.
            const lastUserMessage = messages.filter(m => m.role === 'user').pop();
            if (!lastUserMessage || lastUserMessage.content !== initialQuery) {
                 append({ role: 'user', content: initialQuery });
            }
            setInitialQuery(null); // Clear it after attempting to send
          }
        }, [initialQuery, isPopoverOpen, append, setInitialQuery, messages]);
        ```

  * Update the props passed to `<ChatUI>`:

        ```
        <ChatUI
          messages={messages} // Now from useChat
          input={input}       // Now from useChat
          handleInputChange={handleInputChange} // From useChat
          handleSubmit={(e) => handleSubmit(e)} // From useChat, wrap if you need to pass options
          isLoading={isLoading} // From useChat
          error={error}       // From useChat
          onClose={closePopover}
          brandName="Your AI Helper"
          // brandLogoUrl="/logo.svg"
          addToolResult={addToolResult} // <<< PASS THIS DOWN
        />
        ```

* **File to Modify (Your Version):** `src/components/ChatUI.tsx`
  * Add `addToolResult` to `ChatUIProps`:

        ```
        interface ChatUIProps {
          // ... other props
          addToolResult?: (args: { toolCallId: string; result: any; }) => void;
        }
        ```

  * Ensure it's destructured from props:

        ```
        export default function ChatUI({
          // ... other props
          addToolResult,
        }: ChatUIProps) { /* ... */ }
        ```

  * Remove the `dummyMessages` array and use the `messages` prop directly in the `map` function.
* **Checkpoint:**
  * [ ] You can type a message in the popover's input and get a response from the AI.
  * [ ] Chat history persists if you close and reopen the popover (because `useChat` is in `GlobalChatPopover`).
  * [ ] Basic errors (if any) from the AI are shown or logged.

### 5.3. Implement Artifact (Tool Invocation) Rendering in `ChatUI`

* **Objective:** Display custom UI elements when the AI calls a tool.
* **File to Modify (Your Version):** `src/components/ChatUI.tsx`
  * Import `ToolInvocation`: `import { type Message, type ToolInvocation } from 'ai/react';`
  * Inside the `messages.map((m) => (...))` loop, after rendering `m.content`, add the logic to render tool invocations:

        ```
        {/* ... inside messages.map() ... after the main message bubble div ... */}
        {m.toolInvocations?.map((toolInvocation: ToolInvocation) => {
          const toolCallId = toolInvocation.toolCallId;

          // Example: Render 'askForConfirmation' tool (client-side interactive)
          if (toolInvocation.toolName === 'askForConfirmation') {
            return (
              <div key={toolCallId} className="ml-10 my-2 p-3 bg-muted/50 border rounded-lg shadow-sm text-sm">
                <p className="text-foreground mb-2">{toolInvocation.args.message as string}</p>
                {'result' in toolInvocation ? ( // If tool has already returned a result
                  <p className="font-semibold text-primary">Your response: {toolInvocation.result as string}</p>
                ) : (
                  addToolResult ? ( // Only show buttons if addToolResult is available and tool hasn't finished
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToolResult({ toolCallId, result: 'User confirmed: Yes' })}
                      >
                        Yes
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addToolResult({ toolCallId, result: 'User confirmed: No' })}
                      >
                        No
                      </Button>
                    </div>
                  ) : <p className="text-xs text-muted-foreground italic">Waiting for interaction...</p>
                )}
              </div>
            );
          }

          // Example: Render 'getServiceInformation' tool result (server-side tool)
          if (toolInvocation.toolName === 'getServiceInformation' && 'result' in toolInvocation) {
            const result = toolInvocation.result as any; // Cast to any or a specific type
            return (
              <div key={toolCallId} className="ml-10 my-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg shadow-sm text-sm">
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Service: {result.serviceName}</h4>
                <p className="text-foreground">{result.description}</p>
                {result.duration && <p className="text-xs mt-1">Duration: {result.duration}</p>}
                {result.cost && <p className="text-xs">Cost: {result.cost}</p>}
              </div>
            );
          }

          // Generic display for other tools or when tool is just called (no result yet)
          return (
            <div key={toolCallId} className="ml-10 my-1 p-2 bg-gray-100 dark:bg-gray-800 rounded-md text-xs text-muted-foreground italic">
              {'result' in toolInvocation
                ? `Tool ${toolInvocation.toolName} returned.` // Could stringify result if simple
                : `AI is using tool: ${toolInvocation.toolName}...`}
            </div>
          );
        })}
        ```

  * **Note:** You might need to adjust the `ml-10` (left margin) or overall structure to best fit artifacts visually under their parent message. You might wrap the message `div` and the `toolInvocations.map` in a parent `flex flex-col`.
* **Checkpoint:**
  * [ ] Ask the AI to "get service information for AI Strategy Workshop." It should call the tool, and the `ChatUI` should render the structured information.
  * [ ] Ask the AI "Can you confirm if I should proceed with plan A?" It should trigger `askForConfirmation`, and Yes/No buttons should appear. Clicking them should send the result back.

## 6. Phase 4: Website Structure & Navigation

### 6.1. Create Additional Static Pages

* **Objective:** Set up the basic pages for your website content.
* **Files to Create (Your Version):**
  * `src/app/page.tsx` (This will be your Home page)
  * `src/app/about/page.tsx`
  * `src/app/services/page.tsx`
  * `src/app/contact/page.tsx`
* **Example `src/app/page.tsx` (Home Page):**

    ```
    // src/app/page.tsx (This is your new Home page)
    // We'll add the Hero "Ask Bar" here in the next phase
    export default function HomePage() {
      return (
        <div className="container mx-auto px-4 py-8">
          <section className="text-center py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
              Unlock AI Potential for Your Business
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We provide expert AI consulting, custom model development, and cutting-edge courses to elevate your operations.
            </p>
            {/* Hero "Ask Bar" will go here */}
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-semibold text-center mb-8">Our Core Services</h2>
            {/* Add content about your services */}
          </section>
        </div>
      );
    }
    ```

    Create similar basic structures for `about/page.tsx`, `services/page.tsx`, and `contact/page.tsx` with placeholder content.
* **Checkpoint:**
  * [ ] You can navigate to `/`, `/about`, `/services`, `/contact` in your browser and see basic content.
  * [ ] The global chat popover trigger is visible on all these pages.

### 6.2. Setup Basic Navigation (Header)

* **Objective:** Add a simple navigation bar.
* **File to Create/Modify (Your Version):** `src/components/layout/Header.tsx` (if it doesn't exist, create it)

    ```
    // src/components/layout/Header.tsx
    import Link from 'next/link';
    import Image from 'next/image'; // If you have a logo

    export default function Header() {
      return (
        <header className="py-4 border-b bg-background/80 backdrop-blur sticky top-0 z-40">
          <nav className="container mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-primary flex items-center gap-2">
              {/* Optional: <Image src="/logo.svg" alt="Your Company Logo" width={32} height={32} /> */}
              Your AI Consulting
            </Link>
            <ul className="flex space-x-4 md:space-x-6">
              <li><Link href="/" className="text-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/services" className="text-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </nav>
        </header>
      );
    }
    ```

* **File to Modify (Your Version):** `src/app/layout.tsx`
  * Uncomment or add the `<Header />` import and component:

        ```
        import Header from '@/components/layout/Header'; // Adjust path if needed
        // ...
        export default function RootLayout({ children }: { children: React.ReactNode; }) {
          return (
            <html lang="en" suppressHydrationWarning>
              <body className={inter.className}>
                <Header /> {/* <<< ADD THIS LINE */}
                <main className="min-h-screen">{children}</main>
                {/* <Footer /> */}
                <GlobalChatPopover />
              </body>
            </html>
          );
        }
        ```

* **Checkpoint:**
  * [ ] A navigation header appears on all pages.
  * [ ] Links in the header navigate to the correct pages.

## 7. Phase 5: Hero Section Integration

### 7.1. Implement "Ask Bar" to Trigger Chat Popover on Home Page

* **Objective:** Allow users to type an initial query on the homepage that opens the chat popover with that query.
* **File to Modify (Your Version):** `src/app/page.tsx` (your Home page)
  * Import `useState` and `useChatStore`:

        ```
        'use client'; // <<< Add this at the top of page.tsx if it's not there

        import { useState } from 'react';
        import { useChatStore } from '@/stores/chatStore'; // Adjust path
        import { Input } from '@/components/ui/input';
        import { Button } from '@/components/ui/button';
        import { SparklesIcon } from 'lucide-react'; // Or another icon
        ```

  * Inside the `HomePage` component function:

        ```
        // Inside HomePage component
        const { openPopover } = useChatStore();
        const [heroInput, setHeroInput] = useState('');

        const handleHeroSubmit = (e: React.FormEvent) => {
          e.preventDefault();
          if (!heroInput.trim()) return;
          openPopover(heroInput); // Pass the query to the store
          setHeroInput(''); // Clear hero input after submission
        };
        ```

  * Add the form to your hero section JSX:

        ```
        // Inside the hero section of src/app/page.tsx
        <form onSubmit={handleHeroSubmit} className="max-w-xl mx-auto flex gap-2 mt-8">
          <Input
            type="text"
            value={heroInput}
            onChange={(e) => setHeroInput(e.target.value)}
            placeholder="Have a question for our AI? Ask here..."
            className="flex-grow text-base p-3" // Larger input for hero
          />
          <Button type="submit" size="lg" className="gap-2"> {/* Larger button */}
            <SparklesIcon className="h-5 w-5" />
            Ask AI
          </Button>
        </form>
        ```

* **Checkpoint:**
  * [ ] The "Ask Bar" (input field and button) appears on the homepage.
  * [ ] Typing a question and clicking "Ask AI" opens the `GlobalChatPopover` and sends the typed question as the first user message.

## 8. Phase 6: Styling, Customization & Final Touches

* **Objective:** Polish the UI.
* **Popover Trigger Button Styling:**
  * Modify `className` in `src/components/GlobalChatPopover.tsx` for the `<Button variant="outline" ...>` trigger. You might want it to use your `bg-primary` color or a distinct accent.
* **Responsive Design Checks:**
  * Test the popover and website on different screen sizes (desktop, tablet, mobile).
  * Ensure the popover content (`ChatUI`) is scrollable and usable on small screens. Adjust `width` and `height` in `GlobalChatPopover.tsx` -> `PopoverContent` if needed, using Tailwind's responsive prefixes (e.g., `sm:w-[400px] w-[90vw]`).
* **Font Consistency:** Ensure your brand's chosen font (configured in `layout.tsx` via `next/font`) is applied throughout the chat UI.
* **Loading/Error States in `ChatUI`:**
  * Make sure the `isLoading` state in `ChatUI` effectively disables the input/button and perhaps shows a subtle "Thinking..." indicator.
  * If an `error` object is present, display a user-friendly message within the `ChatUI` (e.g., in the placeholder `Error Display Area`).
* **Checkpoint:**
  * [ ] All UI elements align with your brand.
  * [ ] The site and popover are responsive and look good on mobile.

## 9. Phase 7: Testing & Deployment

### 9.1. Thorough End-to-End Testing

* Test all chat functionalities: sending messages, receiving responses, tool calls (artifacts like service info and confirmation), error handling.
* Test navigation, hero bar integration.
* Test on multiple browsers.
* Check console for errors.

### 9.2. Prepare for Deployment (e.g., to Vercel)

* Ensure all environment variables (like `OPENAI_API_KEY`) are set in your Vercel project settings.
* Commit all changes to Git.
* Deploy!

---

This detailed list should guide you through the process. Take it one step at a time, test frequently, and refer back to the Vercel AI SDK documentation and examples if you get stuck on specific AI SDK features. Good luck!

```
