// components/ChatPanel.tsx
'use client';

import type { Attachment, UIMessage } from 'ai';
import { useChat } from '@ai-sdk/react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSWRConfig } from 'swr';
import { SidebarHistory } from './sidebar-history';
import { ChatHeader } from './chat-header';
import { Chat } from './chat';
import type { Session } from 'next-auth';
import { toast } from './toast';
import { cn } from '../lib/utils';
import { useChatVisibility } from '@/hooks/use-chat-visibility';
import { useArtifactSelector } from '@/hooks/use-artifact';
import useSWR from 'swr';
import { ChatErrorBoundary } from './chat-error-boundary';

type ChatPanelProps = {
  id: string;
  initialMessages: Array<UIMessage>;
  selectedChatModel: string;
  isReadonly: boolean;
  session: Session;
  className?: string;
  autoResume?: boolean;
};

// Main ChatPanel layout: sidebar, header, chat area
export function ChatPanel({
  id,
  initialMessages,
  selectedChatModel,
  isReadonly,
  session,
  className,
  autoResume,
}: ChatPanelProps) {
  // Sidebar open/close state (could be lifted up if needed)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { visibilityType, setVisibilityType } = useChatVisibility({
    chatId: id,
    initialVisibility: 'private',
  });

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    id,
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: () => Math.random().toString(36).slice(2),
    experimental_prepareRequestBody: (body) => ({
      id,
      message: body.messages.at(-1),
      selectedChatModel,
      visibility: visibilityType,
    }),
    onFinish: () => {
      mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: (error) => {
      // Show user-friendly error for non-JSON or network errors
      let message = error.message;
      if (
        message.includes("Unexpected token '<'") ||
        message.includes('Unexpected end of JSON input')
      ) {
        message =
          'The server returned an invalid response. Please try again later.';
      }
      toast({
        type: 'error',
        description: message,
      });
    },
  });

  useEffect(() => {
    const query = searchParams.get('query');
    if (
      query &&
      messages.length === 0 &&
      !initialMessages.find((m) => m.content === query && m.role === 'user')
    ) {
      append({ role: 'user', content: query });
      const newPath = window.location.pathname;
      router.replace(newPath, { scroll: false });
    }
  }, [searchParams, append, messages.length, initialMessages, router]);

  const { data: votes } = useSWR<Array<any>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    async (url: string) => {
      const res = await fetch(url);
      const text = await res.text();
      try {
        return JSON.parse(text);
      } catch {
        throw new Error('Failed to load votes: Server returned invalid JSON.');
      }
    },
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <ChatErrorBoundary>
      <div className={cn('flex h-dvh bg-background', className)}>
        {showSidebar && (
          <aside className="w-64 min-w-[16rem] max-w-xs border-r border-border/40 bg-background/95 backdrop-blur-sm transition-all duration-300">
            <SidebarHistory
              user={session.user}
              selectedModelId={selectedChatModel}
              session={session}
            />
          </aside>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <ChatHeader
            chatId={id}
            selectedModelId={selectedChatModel}
            selectedVisibilityType={visibilityType}
            onVisibilityChange={setVisibilityType}
            isReadonly={isReadonly}
            session={session}
            onToggleSidebar={() => setShowSidebar((v) => !v)}
            isSidebarOpen={showSidebar}
            onClear={() => {}}
          />

          <div className="flex-1 overflow-y-auto">
            <Chat
              id={id}
              initialMessages={initialMessages}
              selectedChatModel={selectedChatModel}
              selectedVisibilityType={undefined}
              isReadonly={isReadonly}
              session={session}
              className={className}
            />
          </div>
        </div>
      </div>
    </ChatErrorBoundary>
  );
}

// Simple whitespace token counter (can be replaced with tiktoken or similar if needed)
function countTokens(text: string): number {
  // Split on whitespace, filter out empty, return count
  return text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
}
