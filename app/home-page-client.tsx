'use client';

import { useState, memo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ChatPopover } from '@/components/chat-popover';
import { ThemeProvider } from '@/temp-next/components/theme-provider';
import { generateUUID } from '@/lib/utils';
import { AnimatedGridPattern } from '@/components/ui/animated-grid-pattern';
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section';
import { WhyStartSection } from '@/components/why-start-section';
import { FearsAndSolutionsSection } from '@/components/fears-and-solutions-section';
import { ImplementationStepsSection } from '@/components/implementation-steps-section';
import { RisksSection } from '@/components/risks-section';
import { CtaSection } from '@/components/cta-section';
import { ContactSection } from '@/components/contact-section';
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
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
          <HeroSection
            title="What your company needs to get started with AI"
            description="AI should be simple, not complicated. We help you start the right way and master AI in daily work—employees and leaders alike."
            buttonText="Book Free Call"
            onButtonClick={handleChatLaunch}
          />

          <ServicesSection />
          <WhyStartSection />
          <FearsAndSolutionsSection />
          <ImplementationStepsSection />
          <RisksSection />
          <CtaSection onButtonClick={handleChatLaunch} />
          <ContactSection />
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
            popoverClassName="bg-background/95 backdrop-blur-md"
          />
        )}
      </div>
    </ThemeProvider>
  );
}
