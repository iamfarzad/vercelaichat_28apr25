'use client';

import React, { createContext, useRef, useState, useLayoutEffect } from 'react';
import { Chat } from './chat';
import { ChatHeader } from './chat-header';
import { cn } from '../lib/utils';
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
  sidebarIsOpen?: boolean;
  className?: string;
}

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
  className,
}: ChatUIWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setContainer(containerRef.current);
    }
  }, []);

  return (
    <TooltipContainerContext.Provider value={container}>
      <div
        ref={containerRef}
        className={cn(
          'relative flex h-full w-full',
          'bg-background/95 backdrop-blur-sm',
          className,
        )}
      >
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <header className="flex items-center gap-2 px-4 py-3 border-b border-border/40 bg-background/95 backdrop-blur-sm">
            <ChatHeader
              chatId={id}
              isReadonly={isReadonly}
              selectedModelId={selectedChatModel}
              selectedVisibilityType={selectedVisibilityType}
              session={session}
              onClear={() => {}}
            />
          </header>

          <div className="flex-1 flex flex-col min-h-0 overflow-hidden relative">
            <div className="max-w-3xl mx-auto flex flex-col flex-1 min-w-0 min-h-0 bg-transparent px-4">
              <Chat
                id={id}
                initialMessages={initialMessages}
                selectedChatModel={selectedChatModel}
                selectedVisibilityType={selectedVisibilityType}
                isReadonly={isReadonly}
                session={session}
                className={className}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipContainerContext.Provider>
  );
}
