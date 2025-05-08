'use client';

import type { UIMessage } from 'ai';
import { PreviewMessage, ThinkingMessage } from './message';
import { useScrollToBottom } from './use-scroll-to-bottom';
import { Greeting } from './greeting';
import { memo, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import type { Vote } from '@/lib/db/schema';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { ChatErrorState } from './chat-error-boundary';

interface MessagesProps {
  chatId: string;
  status: UseChatHelpers['status'];
  votes: Array<Vote> | undefined;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  isArtifactVisible: boolean;
  className?: string;
}

function PureMessages({
  chatId,
  status,
  votes,
  messages,
  setMessages,
  reload,
  isReadonly,
  className,
}: MessagesProps) {
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();
  
  const [error, setError] = useState<Error | null>(null);

  // Reset error state when messages change
  useEffect(() => {
    if (messages.length > 0) {
      setError(null);
    }
  }, [messages]);

  // Handle errors during message loading or streaming
  useEffect(() => {
    if (status === 'error') {
      setError(new Error('Failed to load or send messages'));
    }
  }, [status]);

  if (error) {
    return (
      <ChatErrorState 
        error={error}
        retry={() => {
          setError(null);
          reload();
        }}
        className={className}
      />
    );
  }

  return (
    <div
      ref={messagesContainerRef}
      className={cn(
        'flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4',
        className,
      )}
    >
      {messages.length === 0 && status !== 'error' && <Greeting />}

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          isLoading={status === 'streaming' && messages.length - 1 === index}
          vote={
            votes
              ? votes.find((vote) => vote.messageId === message.id)
              : undefined
          }
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          className={className}
        />
      ))}

      {status === 'submitted' &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && (
          <ThinkingMessage className={className} />
        )}

      {status === 'streaming' &&
        messages.length > 0 && (
          <ThinkingMessage className={className} />
        )}

      <div
        ref={messagesEndRef}
        className="shrink-0 min-w-[24px] min-h-[24px]"
      />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {
  if (prevProps.isArtifactVisible && nextProps.isArtifactVisible) return true;

  if (prevProps.status !== nextProps.status) return false;
  if (prevProps.status && nextProps.status) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;
  if (!equal(prevProps.votes, nextProps.votes)) return false;

  return true;
});
