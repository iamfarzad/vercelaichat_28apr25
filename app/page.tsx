import { generateUUID } from '@/lib/utils';
import HomePageClient from './home-page-client';
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
  const chatId = generateUUID();
  const selectedChatModel = 'grok-2-1212';
  const isSidebarCollapsed = false;

  return (
    <HomePageClient
      session={mockSession}
      chatId={chatId}
      selectedChatModel={selectedChatModel}
      isSidebarCollapsed={isSidebarCollapsed}
    />
  );
}
