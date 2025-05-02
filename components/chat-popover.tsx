'use client';

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { SidebarProvider, useSidebar } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import { ChatUIWrapper } from '@/components/chat-ui-wrapper';
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

/**
 * ChatPopover is the logic and stateful wrapper for the chat modal and sidebar.
 * It manages sidebar open/close state and passes it to ChatUIWrapper.
 */
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
  // Debug: log all props to check runtime values
  console.log('[ChatPopover] props', {
    open,
    onClose,
    id,
    initialMessages,
    selectedChatModel,
    selectedVisibilityType,
    session,
    className,
    popoverClassName,
  });
  /**
   * Ref for the modal container, used to contain overlays (tooltips/popovers) within the chat modal.
   * This is passed to ChatUIWrapper and then to all TooltipContent components inside the modal.
   */
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!isMounted || !open) return null;

  // Provide sidebar context here and manage sidebar state
  return createPortal(
    <SidebarProvider defaultOpen={false}>
      <SidebarStateWrapper>
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm isolate"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Modal container with absolute containment for all UI elements */}
          {/*
            modalContainerRef ensures overlays (tooltips/popovers) are contained within the modal and do not bleed out.
            This ref is passed to ChatUIWrapper and then to all TooltipContent components inside the modal.
          */}
          <div
            ref={modalContainerRef}
            role="document"
            aria-label="Chat Interface"
            className={`relative flex w-[95vw] max-w-[1200px] h-[92vh] md:h-[94vh] lg:h-[92vh] bg-white dark:bg-zinc-900 rounded-lg shadow-2xl overflow-hidden isolate ${popoverClassName ?? ''}`}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-50 text-xl font-bold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 bg-white/80 dark:bg-zinc-900/80 rounded-full p-2 shadow w-9 h-9 flex items-center justify-center leading-none"
              aria-label="Close chat dialog"
            >
              ×
            </button>
            {/* Content container */}
            <div className="isolate flex size-full overflow-hidden z-[1]">
              <SidebarStateConsumer
                render={({ sidebarIsOpen }) => (
                  <>
                    {sidebarIsOpen && (
                      <div className="size-full w-[260px] max-w-[260px] border-r border-zinc-200 dark:border-zinc-800 overflow-hidden duration-300 transition-[width]">
                        <AppSidebar user={session?.user} />
                      </div>
                    )}
                    <ChatUIWrapper
                      id={id}
                      initialMessages={initialMessages}
                      selectedChatModel={selectedChatModel}
                      selectedVisibilityType={selectedVisibilityType}
                      session={session}
                    />
                  </>
                )}
              />
            </div>
          </div>
        </div>
      </SidebarStateWrapper>
    </SidebarProvider>,
    document.body,
  );
}

// Helper to bridge sidebar state/context to props for ChatUIWrapper
function SidebarStateWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

interface SidebarStateConsumerProps {
  render: (props: { sidebarIsOpen: boolean }) => React.ReactNode;
}

function SidebarStateConsumer({ render }: SidebarStateConsumerProps) {
  const { open: sidebarIsOpen } = useSidebar();
  return <>{render({ sidebarIsOpen })}</>;
}
