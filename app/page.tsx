// Homepage with ChatPopover integration
'use client';
import { useState } from 'react';
import { generateUUID } from '@/lib/utils';
import HomePageClient from './home-page-client';
import { ChatPopover } from '../components/chat-popover';
import type { Session } from 'next-auth';
import type { UserType } from '@/app/(auth)/auth';

// Mock session for design work
const mockSession: Session = {
  user: {
    id: 'design-user-id',
    name: 'Design User',
    email: 'design@example.com',
    image: null,
    type: 'guest' as UserType,
  },
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const chatId = generateUUID();
  const selectedChatModel = 'grok-2-1212';
  const isSidebarCollapsed = false;

  return (
    <>
      <button
        type="button"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-blue-600 text-white shadow-lg"
        onClick={() => setChatOpen(true)}
        aria-label="Open chat"
      >
        Chat
      </button>
      <ChatPopover
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        id={chatId}
        initialMessages={[]}
        selectedChatModel={selectedChatModel}
        session={mockSession}
      />
      <HomePageClient
        session={mockSession}
        chatId={chatId}
        selectedChatModel={selectedChatModel}
        isSidebarCollapsed={isSidebarCollapsed}
      />
    </>
  );
}
