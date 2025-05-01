'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ChatPopover } from '@/components/chat-popover';
import { useSession } from 'next-auth/react';
import type { Session } from 'next-auth';
import type { UserType } from '@/app/(auth)/auth';
import { generateUUID } from '@/lib/utils';

export default function LandingPage() {
  const { data: session } = useSession();
  const [showChat, setShowChat] = useState(false);
  const chatId = generateUUID();
  const selectedChatModel = 'grok-2-1212';

  // Create a mock session if session is null
  const safeSession =
    session ||
    ({
      user: {
        id: 'guest-user-id', // Add required id field
        name: 'Guest User',
        email: 'guest@example.com',
        image: null,
        type: 'guest' as UserType, // Use correct UserType
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    } as Session); // Type assertion to Session

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
        <div className="max-w-3xl w-full text-center space-y-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Experience the Power of AI Chat
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl">
            Connect with our advanced AI assistant for instant answers, creative
            content, and helpful guidance.
          </p>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="h-16 w-16 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105"
              onClick={() => setShowChat(true)}
              aria-label="Open chat"
            >
              {/* You can use a canonical chat icon here. If you have a ChatIcon in your icons.tsx, use it. Otherwise, fallback to a message bubble emoji. */}
              {/* Example: <ChatIcon className="w-8 h-8" /> */}
              <span role="img" aria-label="Chat" className="text-3xl">
                💬
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium text-lg mb-2">Instant Answers</h3>
              <p className="text-muted-foreground">
                Get immediate responses to your questions.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium text-lg mb-2">Creative Content</h3>
              <p className="text-muted-foreground">
                Generate ideas, stories, and more.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-medium text-lg mb-2">24/7 Assistance</h3>
              <p className="text-muted-foreground">
                Available whenever you need help.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Chat Popover */}
      <ChatPopover
        open={showChat}
        onClose={() => setShowChat(false)}
        id={chatId}
        selectedChatModel={selectedChatModel}
        session={safeSession}
      />
    </div>
  );
}
