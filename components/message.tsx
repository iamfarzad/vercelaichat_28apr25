'use client';

import type { UIMessage } from 'ai';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, memo, useCallback } from 'react';
import type { Vote } from '../lib/db/schema';
import { cn } from '@/lib/utils';
import { DocumentToolCall, DocumentToolResult } from './document';
import { PencilEditIcon, SparklesIcon } from './icons';
import { Markdown } from './markdown';
import { MessageActions } from './message-actions';
import { PreviewAttachment } from './preview-attachment';
import { Weather } from './weather';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { MessageEditor } from './message-editor';
import { DocumentPreview } from './document-preview';
import { MessageReasoning } from './message-reasoning';
import { LoaderIcon, ChevronDownIcon } from './icons';
import type { UseChatHelpers } from '@ai-sdk/react';
import equal from 'fast-deep-equal';

const PurePreviewMessage = ({
  chatId,
  message,
  vote,
  isLoading,
  setMessages,
  reload,
  isReadonly,
  className,
}: {
  chatId: string;
  message: UIMessage;
  vote: Vote | undefined;
  isLoading: boolean;
  setMessages: UseChatHelpers['setMessages'];
  reload: UseChatHelpers['reload'];
  isReadonly: boolean;
  className?: string;
}) => {
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [messageError, setMessageError] = useState<Error | null>(null);

  const handleRetry = useCallback(() => {
    setMessageError(null);
    reload();
  }, [reload]);

  if (messageError) {
    return (
      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Failed to load message</span>
          <button
            type="button"
            onClick={handleRetry}
            className="text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        data-testid={`message-${message.role}`}
        className={cn(
          'w-full mx-auto max-w-3xl px-2 sm:px-4 group/message overflow-hidden',
          {
            'opacity-50': isLoading,
          },
          className,
        )}
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        data-role={message.role}
      >
        <div
          className={cn(
            'flex gap-4 w-full group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl',
            {
              'w-full': mode === 'edit',
              'group-data-[role=user]/message:w-fit': mode !== 'edit',
            },
          )}
        >
          {message.role === 'assistant' && (
            <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border bg-background">
              <div className="translate-y-px">
                <SparklesIcon size={14} />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-4 w-full">
            {message.experimental_attachments && (
              <div
                data-testid={`message-attachments`}
                className="flex flex-row justify-end gap-2"
              >
                {message.experimental_attachments.map((attachment) => (
                  <PreviewAttachment
                    key={attachment.url}
                    attachment={attachment}
                  />
                ))}
              </div>
            )}

            {message.parts?.map((part, index) => {
              const { type } = part;
              const key = `message-${message.id}-part-${index}`;

              if (type === 'reasoning') {
                return (
                  <MessageReasoning
                    key={key}
                    isLoading={isLoading}
                    reasoning={part.reasoning}
                  />
                );
              }

              if (type === 'text') {
                if (mode === 'view' && part.text.trim()) {
                  return (
                    <div key={key} className="flex flex-row gap-2 items-start">
                      <div className="flex flex-col items-center">
                        {/* Toolbar */}
                        <div className="flex gap-1 mb-1 opacity-80 group-hover/message:opacity-100 transition-opacity">
                          {/* Edit */}
                          {message.role === 'user' && !isReadonly && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  aria-label="Edit message"
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full text-muted-foreground"
                                  onClick={() => setMode('edit')}
                                >
                                  <PencilEditIcon />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Edit</TooltipContent>
                            </Tooltip>
                          )}
                          {/* Copy */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                aria-label="Copy message"
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-muted-foreground"
                                onClick={() => {
                                  navigator.clipboard.writeText(part.text);
                                }}
                              >
                                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                  <rect x="4" y="4" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                                  <rect x="2.75" y="2.75" width="8.5" height="8.5" rx="2" stroke="currentColor" strokeWidth="1"/>
                                </svg>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy</TooltipContent>
                          </Tooltip>
                          {/* Delete */}
                          {!isReadonly && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  aria-label="Delete message"
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full text-muted-foreground"
                                  onClick={() => {
                                    setMessages((msgs: UIMessage[]) =>
                                      msgs.filter((m) => m.id !== message.id)
                                    );
                                  }}
                                >
                                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                    <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                                    <rect x="3" y="3" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1"/>
                                  </svg>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Delete</TooltipContent>
                            </Tooltip>
                          )}
                          {/* Retry */}
                          {message.role === 'assistant' && !isLoading && !isReadonly && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  aria-label="Retry message"
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full text-muted-foreground"
                                  onClick={handleRetry}
                                >
                                  <LoaderIcon className="animate-spin" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Retry</TooltipContent>
                            </Tooltip>
                          )}
                          {/* Markdown Preview Toggle */}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                aria-label="Toggle markdown preview"
                                variant="ghost"
                                size="icon"
                                className="rounded-full text-muted-foreground"
                                onClick={() => setShowMarkdown((v) => !v)}
                              >
                                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                                  <path d="M2 4.5A1.5 1.5 0 013.5 3h9A1.5 1.5 0 0114 4.5v7A1.5 1.5 0 0112.5 13h-9A1.5 1.5 0 012 11.5v-7z" stroke="currentColor" strokeWidth="1"/>
                                  <path d="M5 8h1v2h1V8h1" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                                </svg>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Toggle Markdown</TooltipContent>
                          </Tooltip>
                        </div>
                        {/* Timestamp/Status */}
                        <span className="text-xs text-muted-foreground select-none">
                          {message.createdAt
                            ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : isLoading
                            ? 'Sending...'
                            : 'Sent'}
                        </span>
                      </div>
                      <div
                        data-testid="message-content"
                        className={cn('flex flex-col gap-4', {
                          'bg-primary text-primary-foreground px-3 py-2 rounded-xl':
                            message.role === 'user',
                        })}
                      >
                        <Markdown
                          onError={() =>
                            setMessageError(
                              new Error('Failed to render message content'),
                            )
                          }
                        >
                          {part.text}
                        </Markdown>
                      </div>
                    </div>
                  );
                }

                if (mode === 'edit') {
                  return (
                    <div key={key} className="flex flex-row gap-2 items-start">
                      <div className="size-8" />

                      <MessageEditor
                        key={message.id}
                        message={message}
                        setMode={setMode}
                        setMessages={setMessages}
                        reload={reload}
                      />
                    </div>
                  );
                }
              }

              if (type === 'tool-invocation') {
                const { toolInvocation } = part;
                const { toolName, toolCallId, state } = toolInvocation;

                if (state === 'call') {
                  const { args } = toolInvocation;

                  return (
                    <div
                      key={toolCallId}
                      className={cn(
                        'skeleton',
                        ['getWeather'].includes(toolName) && 'skeleton',
                      )}
                    >
                      {toolName === 'getWeather' ? (
                        <Weather />
                      ) : toolName === 'createDocument' ? (
                        <DocumentPreview isReadonly={isReadonly} args={args} />
                      ) : toolName === 'updateDocument' ? (
                        <DocumentToolCall
                          type="update"
                          args={args}
                          isReadonly={isReadonly}
                        />
                      ) : toolName === 'requestSuggestions' ? (
                        <DocumentToolCall
                          type="request-suggestions"
                          args={args}
                          isReadonly={isReadonly}
                        />
                      ) : null}
                    </div>
                  );
                }

                if (state === 'result') {
                  const { result } = toolInvocation;

                  return (
                    <div key={toolCallId}>
                      {toolName === 'getWeather' ? (
                        <Weather weatherAtLocation={result} />
                      ) : toolName === 'createDocument' ? (
                        <DocumentPreview
                          isReadonly={isReadonly}
                          result={result}
                        />
                      ) : toolName === 'updateDocument' ? (
                        <DocumentToolResult
                          type="update"
                          result={result}
                          isReadonly={isReadonly}
                        />
                      ) : toolName === 'requestSuggestions' ? (
                        <DocumentToolResult
                          type="request-suggestions"
                          result={result}
                          isReadonly={isReadonly}
                        />
                      ) : (
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                      )}
                    </div>
                  );
                }
              }
            })}

            {!isReadonly && (
              <MessageActions
                key={`action-${message.id}`}
                chatId={chatId}
                message={message}
                vote={vote}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export const PreviewMessage = memo(
  PurePreviewMessage,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;
    if (prevProps.message.role !== nextProps.message.role) return false;
    if (prevProps.message.content !== nextProps.message.content) return false;
    if (
      prevProps.message.experimental_attachments?.length !==
      nextProps.message.experimental_attachments?.length
    )
      return false;
    if (
      !equal(
        prevProps.message.experimental_attachments,
        nextProps.message.experimental_attachments,
      )
    )
      return false;
    if (prevProps.vote?.isUpvoted !== nextProps.vote?.isUpvoted) return false;
    if (prevProps.vote?.isDownvoted !== nextProps.vote?.isDownvoted)
      return false;
    if (prevProps.className !== nextProps.className) return false;

    return true;
  },
);

export const ThinkingMessage = ({ className }: { className?: string }) => {
  const role = 'assistant';

  return (
    <motion.div
      data-testid="message-assistant-loading"
      className={cn('w-full mx-auto max-w-3xl px-4 group/message ', className)}
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
      data-role={role}
    >
      <div
        className={cn(
          'flex gap-4 group-data-[role=user]/message:px-3 w-full group-data-[role=user]/message:w-fit group-data-[role=user]/message:ml-auto group-data-[role=user]/message:max-w-2xl group-data-[role=user]/message:py-2 rounded-xl',
          'group-data-[role=user]/message:bg-muted',
        )}
      >
        <div className="size-8 flex items-center rounded-full justify-center ring-1 shrink-0 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-col gap-4 text-muted-foreground">
            Hmm...
          </div>
        </div>
      </div>
    </motion.div>
  );
};
