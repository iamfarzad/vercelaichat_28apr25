'use client';

import React, { createContext } from 'react';

import { Chat } from './chat';
import { ChatHeader } from './chat-header';

import type { Session } from 'next-auth';
import type { UIMessage } from 'ai';
import type { VisibilityType } from './visibility-selector';

/**
 * Pure presentational wrapper for the chat UI.
 * All state and event handlers must be passed as props.
 */
export interface ChatUIWrapperProps {
  id: string;
  initialMessages?: UIMessage[];
  selectedChatModel?: string;
  selectedVisibilityType?: VisibilityType;
  isReadonly?: boolean;
  session: Session;
  sidebarIsOpen: boolean;
}

/**
 * ChatUIWrapper now accepts modalContainerRef for strict overlay containment (tooltips/popovers).
 */
/**
 * TooltipContainerContext provides the tooltip container element to all children for strict overlay containment.
 */
export const TooltipContainerContext = createContext<HTMLElement | null>(null);

export function ChatUIWrapper({
  id,
  initialMessages = [],
  selectedChatModel = 'grok-2-1212',
  selectedVisibilityType = 'private',
  isReadonly = false,
  session,
  sidebarIsOpen,
  modalContainerRef,
}: ChatUIWrapperProps & {
  modalContainerRef?: React.RefObject<HTMLDivElement>;
}) {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);
  React.useLayoutEffect(() => {
    if (modalContainerRef?.current) {
      setContainer(modalContainerRef.current);
    }
  }, [modalContainerRef?.current]);
  return (
    <TooltipContainerContext.Provider value={container}>
      <div ref={modalContainerRef} className="relative flex h-full w-full">

        {/* Main content area for chat UI */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header Row - Stays at the top, outside the centered chat column */}
          <header className="flex items-center gap-2 px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
            <ChatHeader
              chatId={id}
              isReadonly={isReadonly}
              selectedModelId={selectedChatModel}
              selectedVisibilityType={selectedVisibilityType}
              session={session}
            />
          </header>

          {/* Chat Row - Contains the centered content */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Centered content with max width constraint */}
            <div className="size-full max-w-3xl flex flex-col flex-1 min-w-0 min-h-0 bg-background">
              <Chat
                id={id}
                initialMessages={initialMessages}
                selectedChatModel={selectedChatModel}
                selectedVisibilityType={selectedVisibilityType}
                isReadonly={isReadonly}
                session={session}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipContainerContext.Provider>
  );
}
