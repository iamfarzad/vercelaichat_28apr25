'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { CombinedOrb } from '@/components/hero-section/combined-orb';
import { ChatPopover } from '@/components/chat-popover';
import { useState } from 'react';
import { HeroSection } from '@/components/hero-section';
import { cn } from '@/lib/utils';

import type { Session, UserType } from 'next-auth';

export default function LandingPage({
  session,
  chatId,
  selectedChatModel,
}: {
  session: Session | null;
  chatId?: string;
  selectedChatModel?: string;
}) {
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();

  // Create a mock session if session is null
  const safeSession =
    session ||
    ({
      user: {
        id: 'guest-user-id',
        name: 'Guest User',
        email: 'guest@example.com',
        image: null,
        type: 'guest' as UserType,
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    } as Session);

  const handleChatOpen = (message?: string) => {
    setInitialMessage(message);
    setShowChat(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 to-white dark:from-zinc-900 dark:to-zinc-800">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div
          className={cn(
            'relative w-full max-w-5xl mx-auto rounded-xl p-8',
            'glassmorphism-base',
          )}
        >
          <HeroSection
            title="AI Assistant"
            description="Ask me anything about AI consulting or get help with your projects."
            buttonText="Start Chat"
            onButtonClick={handleChatOpen}
          />
          <div className="subtle-grid absolute inset-0 -z-10 rounded-xl opacity-30" />
        </div>
      </main>
      <Footer />

      <ChatPopover
        open={showChat}
        onClose={() => setShowChat(false)}
        id={chatId || 'default-chat-id'}
        initialMessages={
          initialMessage
            ? [{ id: 'initial', role: 'user', content: initialMessage }]
            : []
        }
        selectedChatModel={selectedChatModel || 'grok-2-1212'}
        session={safeSession}
        popoverClassName="glassmorphism-base"
      />
    </div>
  );
}
