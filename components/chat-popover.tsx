'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SidebarProvider, useSidebar } from './ui/sidebar';
import { SidebarHistory } from './sidebar-history';
// import { ChatUIWrapper } from './chat-ui-wrapper'; // Not used
import { CrossIcon, SidebarLeftIcon } from './icons';
import { cn } from '../lib/utils';
import { Button } from './ui/button';
import type { Session } from 'next-auth';
import type { UIMessage } from 'ai';
// import type { VisibilityType } from './visibility-selector'; // No longer needed here

import { ChatPanel } from './ChatPanel';

interface ChatPopoverProps {
  open: boolean;
  onClose: () => void;
  id: string;
  initialMessages?: UIMessage[];
  selectedChatModel: string;
  // selectedVisibilityType?: VisibilityType; // Removed
  session: Session;
  className?: string;
  popoverClassName?: string;
}

export function ChatPopover({
  open,
  onClose,
  id,
  initialMessages = [],
  selectedChatModel,
  // selectedVisibilityType = 'private', // Removed
  session,
  className,
  popoverClassName,
}: ChatPopoverProps) {
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle escape key and body scroll
  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!isMounted || !open) return null;

  return createPortal(
    <SidebarProvider>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/40 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Chat dialog"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <div
          ref={modalRef}
          role="document"
          className={cn(
            'relative w-full h-full max-w-none max-h-none',
            'bg-background/95 backdrop-blur-md rounded-none shadow-none overflow-hidden',
            'border-none',
            popoverClassName,
          )}
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        >
          <Button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 size-9 rounded-full bg-background/95 backdrop-blur-sm hover:bg-accent"
            aria-label="Close chat dialog"
          >
            <CrossIcon size={16} />
          </Button>

          {/* Suspense boundary prevents hydration mismatch for async children */}
          <React.Suspense fallback={null}>
            <ChatContent
              id={id}
              initialMessages={initialMessages}
              selectedChatModel={selectedChatModel}
              session={session}
              className={cn('w-full h-full', className)}
            />
          </React.Suspense>
        </div>
      </div>
    </SidebarProvider>,
    document.body,
  );
}

function ChatContent({
  id,
  initialMessages,
  selectedChatModel,
  session,
  className,
}: Omit<ChatPopoverProps, 'open' | 'onClose' | 'popoverClassName' | 'selectedVisibilityType'>) {
  // Only render ChatPanel, sidebar logic is handled inside ChatPanel
  return (
    <ChatPanel
      id={id}
      initialMessages={initialMessages ?? []}
      selectedChatModel={selectedChatModel}
      isReadonly={false}
      session={session}
      className={className}
    />
  );
}

// Enhanced SidebarStateConsumer with render props pattern
function SidebarStateConsumer({
  children,
}: {
  children: (props: {
    sidebarIsOpen: boolean;
    toggleSidebar: () => void;
  }) => React.ReactNode;
}) {
  const { open: sidebarIsOpen, setOpen } = useSidebar();
  const toggleSidebar = () => setOpen(!sidebarIsOpen);
  return <>{children({ sidebarIsOpen, toggleSidebar })}</>;
}
