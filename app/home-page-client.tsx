'use client';

import { useState } from 'react';
import type { Message } from '@ai-sdk/react';
// import { Header } from '@/components/header'; // Removed
// import { Footer } from '@/components/footer'; // Removed
// import { ThemeProvider } from 'next-themes'; // Removed
import { generateUUID } from '@/lib/utils';
import type { Session } from 'next-auth';

// Added/Ensured imports for section components:
import { HeroSection } from '@/components/hero-section';
import { ServicesSection } from '@/components/services-section'; // This is the new, detailed Services section (formerly WhatIOfferSection)
import { WhyWorkWithMeSection } from '@/components/why-work-with-me-section';
import { FreeWorkshopSection } from '@/components/free-workshop-section';
import { ProofSection } from '@/components/proof-section';
import { ResultsSection } from '@/components/results-section';
import { FinalCTASection } from '@/components/final-cta-section';
import { FearsAndSolutionsSection } from '@/components/fears-and-solutions-section';
import { ImplementationStepsSection } from '@/components/implementation-steps-section';
import { RisksSection } from '@/components/risks-section';
// CtaSection import will be omitted as the component usage is removed
import { ContactSection } from '@/components/contact-section';

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
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  function handleChatLaunch(message?: string) {
    if (message) {
      setInitialMessages([{
        id: 'msg-hero',
        role: 'user',
        content: message,
        createdAt: new Date()
      }]);
    }
    setShowChat(true);
  }

  const chatId = initialChatId || generateUUID();

  return (
    <> {/* Root is a fragment */}
      {/* <Header /> Removed */}

      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
        <HeroSection
          title="What your company needs to get started with AI"
          description="AI should be simple, not complicated. We help you start the right way and master AI in daily work—employees and leaders alike."
          buttonText="Book Free Call"
          onButtonClick={handleChatLaunch}
          className="w-full max-w-3xl min-h-[60vh] flex flex-col items-center justify-center py-16 md:py-24"
        />

        {/* The old, simple ServicesSection is removed. */}
        <WhyWorkWithMeSection />
        <ServicesSection /> {/* This is the new, detailed ServicesSection (formerly WhatIOfferSection) */}
        <FreeWorkshopSection />
        <ProofSection />
        <ResultsSection />
        <FearsAndSolutionsSection />
        <ImplementationStepsSection />
        <RisksSection />
        <FinalCTASection onButtonClick={handleChatLaunch} />
        {/* <CtaSection onButtonClick={handleChatLaunch} /> */} {/* Removed CtaSection usage */}
        <ContactSection />
      </main>

      {/* <Footer /> Removed */}

    </>
  );
}
