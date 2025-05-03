'use client';

import React, { useEffect, useState, useRef, memo } from 'react';
import { createPortal } from 'react-dom';
import { SidebarProvider, useSidebar } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { ChatUIWrapper } from './chat-ui-wrapper';
import { X, PanelLeftIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ModernButton } from './ui/modern-button';
import type { Session } from 'next-auth';
import type { UIMessage } from 'ai';
import type { VisibilityType } from './visibility-selector';

interface ChatPopoverProps {
  open: boolean;
  onClose: () => void;
  id: string;
  initialMessages?: UIMessage[];
  selectedChatModel: string;
  selectedVisibilityType?: VisibilityType;
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
  selectedVisibilityType = 'private',
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
    <SidebarProvider defaultOpen={true}>
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/40 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-label="Chat dialog"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* Animated subtle grid background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" />
        <div
          ref={modalRef}
          role="document"
          className={cn(
            'relative flex w-[95vw] max-w-[1200px] h-[92vh] md:h-[94vh] lg:h-[92vh]',
            'bg-background/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden',
            'border border-border transition-all duration-200',
            popoverClassName,
          )}
        >
          <ModernButton
            onClick={onClose}
            className="absolute top-3 right-3 z-50 size-9 rounded-full bg-background/80 backdrop-blur-sm border border-border"
            aria-label="Close chat dialog"
          >
            <X className="size-4" />
          </ModernButton>

          <ChatContent
            id={id}
            initialMessages={initialMessages}
            selectedChatModel={selectedChatModel}
            selectedVisibilityType={selectedVisibilityType}
            session={session}
            className={className}
          />
        </div>
      </div>
    </SidebarProvider>,
    document.body,
  );
}

// Separate ChatContent component for better organization
function ChatContent({
  id,
  initialMessages,
  selectedChatModel,
  selectedVisibilityType,
  session,
  className,
}: Omit<ChatPopoverProps, 'open' | 'onClose' | 'popoverClassName'>) {
  const { open: sidebarIsOpen, toggle: toggleSidebar } = useSidebar();

  return (
    <div className="flex w-full h-full relative">
      {/* Sidebar */}
      <div
        className={cn(
          'h-full border-r border-border bg-muted/30 overflow-hidden transition-all duration-300',
          sidebarIsOpen ? 'w-[260px] opacity-100' : 'w-0 opacity-0',
        )}
      >
        {sidebarIsOpen && <AppSidebar user={session?.user} />}
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full relative">
        {!sidebarIsOpen && (
          <ModernButton
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="absolute top-3 left-3 z-40 p-2 rounded-md bg-background/80 backdrop-blur-sm border border-border"
            aria-label="Open sidebar"
          >
            <PanelLeftIcon className="size-4" />
          </ModernButton>
        )}

        <ChatUIWrapper
          id={id}
          initialMessages={initialMessages}
          selectedChatModel={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          session={session}
          sidebarIsOpen={sidebarIsOpen}
          className={className}
        />
      </div>
    </div>
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
  const { open: sidebarIsOpen, toggle: toggleSidebar } = useSidebar();
  return <>{children({ sidebarIsOpen, toggleSidebar })}</>;
}
