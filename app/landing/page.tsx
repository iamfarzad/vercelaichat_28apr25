import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { FloatingOrb } from '@/components/floating-orb';
import { ChatPopover } from '@/components/chat-popover';
import { useState } from 'react';
import type { Session, UserType } from 'next-auth';

export default function LandingPage({
  session,
  chatId,
  selectedChatModel,
}: { session: Session | null; chatId?: string; selectedChatModel?: string }) {
  const [showChat, setShowChat] = useState(false);
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
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-gray-100 to-white modern-landing-page">
      <Header className="modern-header" />
      <main className="modern-main">
        {/* Add modern styles and floating orb here */}
        <div className="modern-container">
          <div className="modern-content">
            <FloatingOrb className="floating-orb" />
            {/* Rest of the content remains the same */}
          </div>
        </div>
        <style>{`
            .modern-landing-page {
              font-family: 'Open Sans', sans-serif;
              background-image: linear-gradient(to bottom, #f7f7f7, #ffffff);
              background-size: 100% 300px;
              background-position: 0% 100%;
            }
            .modern-header {
              background-color: #333;
              color: #fff;
              padding: 1rem;
              text-align: center;
              border-bottom: 1px solid #444;
            }
            .modern-main {
              display: flex;
              flex-direction: column;
              align-items: center;
              padding: 2rem;
            }
            .modern-container {
              background-color: #f7f7f7;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .modern-content {
              max-width: 800px;
              margin: 0 auto;
            }
            .floating-orb {
              position: fixed;
              top: 50%;
              right: 50%;
              transform: translate(50%, -50%);
              z-index: 1;
            }
          `}</style>
      </main>
      <Footer className="modern-footer" />
      {/* Chat Popover */}
      <ChatPopover
        open={showChat}
        onClose={() => setShowChat(false)}
        id={chatId || 'default-chat-id'}
        selectedChatModel={selectedChatModel}
        session={safeSession}
        className="modern-chat-popover"
        popoverClassName="modern-chat-popover-content"
      />
    </div>
  );
}
