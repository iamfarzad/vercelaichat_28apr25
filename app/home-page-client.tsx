'use client';

import { useState, memo } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { generateUUID } from '@/lib/utils';
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
  const handleChatLaunch = (message?: string) => {
    console.log('Launching chat...', message || '');
    // Add your chat launch logic here
    
    // Example: Open chat popup or navigate to chat page
    // window.open('/chat', '_blank');
  };
  return (
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
        <CtaSection onButtonClick={() => {}} />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
