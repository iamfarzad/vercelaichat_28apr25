'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatPopover } from '@/components/chat-popover';
import { generateUUID } from '@/lib/utils';
import { HeroSection } from '@/components/hero-section';
import type { Session } from 'next-auth';

interface HomePageClientProps {
  session: Session;
  chatId: string;
  selectedChatModel: string;
  isSidebarCollapsed: boolean;
}

export default function HomePageClient({
  session,
  chatId: initialChatId,
  selectedChatModel = 'grok-2-1212',
  isSidebarCollapsed = false,
}: HomePageClientProps) {
  const [showChat, setShowChat] = useState(false);
  const [initialMessages, setInitialMessages] = useState<any[]>([]);

  function handleChatLaunch(message?: string) {
    if (message) {
      setInitialMessages([{ id: 'msg-hero', role: 'user', content: message }]);
    }
    setShowChat(true);
  }

  const chatId = initialChatId || generateUUID();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/50 px-4">
        <HeroSection
          title="AI consulting for founders and teams who can’t afford to guess"
          description="Get clarity on what AI can do for your business with expert guidance."
          buttonText="Click to Chat"
          onButtonClick={handleChatLaunch}
        />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 max-w-3xl w-full mx-auto">
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
      </main>

      <Footer />

      {showChat && (
        <ChatPopover
          open={showChat}
          onClose={() => setShowChat(false)}
          id={chatId}
          session={session}
          selectedChatModel={selectedChatModel}
          initialMessages={initialMessages}
        />
      )}
    </div>
  );
}
