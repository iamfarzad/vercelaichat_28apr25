'use client';

import type { Attachment, UIMessage } from 'ai';
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  memo,
} from 'react';
import { toast } from 'sonner';
import { useLocalStorage, useWindowSize } from 'usehooks-ts';

import { ArrowUpIcon, PaperclipIcon, StopIcon } from './icons';
import { PreviewAttachment } from './preview-attachment';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SuggestedActions } from './suggested-actions';
import equal from 'fast-deep-equal';
import type { UseChatHelpers } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function PureMultimodalInput({
  chatId,
  input,
  setInput,
  handleSubmit,
  status,
  stop,
  attachments,
  setAttachments,
  messages,
  setMessages,
  append,
  className,
}: {
  chatId: string;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  handleSubmit: (event?: React.FormEvent<HTMLFormElement>) => void;
  status: 'ready' | 'submitted' | 'streaming' | 'error';
  stop: () => void;
  attachments: Array<Attachment>;
  setAttachments: Dispatch<SetStateAction<Array<Attachment>>>;
  messages: Array<UIMessage>;
  setMessages: UseChatHelpers['setMessages'];
  append: UseChatHelpers['append'];
  className?: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { width } = useWindowSize();
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Show suggestions only when input is focused and empty
  useEffect(() => {
    setShowSuggestions(isFocused && input.trim() === '');
  }, [isFocused, input]);

  useEffect(() => {
    if (textareaRef.current) {
      adjustHeight();
    }
  }, [isFocused, input]);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 2}px`;
    }
  };

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = '98px';
    }
  };

  const [localStorageInput, setLocalStorageInput] = useLocalStorage(
    'input',
    '',
  );

  useEffect(() => {
    if (textareaRef.current) {
      const domValue = textareaRef.current.value;
      // Prefer DOM value over localStorage to handle hydration
      const finalValue = domValue || localStorageInput || '';
      setInput(finalValue);
      adjustHeight();
    }
    // Only run once after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setLocalStorageInput(input);
  }, [input, setLocalStorageInput]);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    adjustHeight();
    // showSuggestions is now handled by useEffect above
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadQueue, setUploadQueue] = useState<Array<string>>([]);

  const submitForm = useCallback(() => {
    window.history.replaceState({}, '', `/chat/${chatId}`);

    handleSubmit(undefined, {
      experimental_attachments: attachments,
    });

    setAttachments([]);
    setLocalStorageInput('');
    resetHeight();
    setShowSuggestions(false);

    if (width && width > 768) {
      textareaRef.current?.focus();
    }
  }, [
    attachments,
    handleSubmit,
    setAttachments,
    setLocalStorageInput,
    width,
    chatId,
  ]);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const { url, pathname, contentType } = data;

        return {
          url,
          name: pathname,
          contentType: contentType,
        };
      }
      const { error } = await response.json();
      toast.error(error);
    } catch (error) {
      toast.error('Failed to upload file, please try again!');
    }
  };

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      setUploadQueue(files.map((file) => file.name));

      try {
        const uploadPromises = files.map((file) => uploadFile(file));
        const uploadedAttachments = await Promise.all(uploadPromises);
        const successfullyUploadedAttachments = uploadedAttachments.filter(
          (attachment) => attachment !== undefined,
        );

        setAttachments((currentAttachments) => [
          ...currentAttachments,
          ...successfullyUploadedAttachments,
        ]);
      } catch (error) {
        console.error('Error uploading files!', error);
      } finally {
        setUploadQueue([]);
      }
    },
    [setAttachments],
  );

  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 bg-card',
        className,
      )}
    >
      <form
        className="flex items-end gap-2 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (status !== 'streaming' && input.trim()) handleSubmit();
        }}
        role="search"
        aria-label="Chat input"
      >
        <button
          type="button"
          className="flex items-center justify-center rounded-md p-2 h-11 w-11 border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Attach file"
          tabIndex={0}
          onClick={() => {
            const inputElement = document.createElement('input');
            inputElement.type = 'file';
            inputElement.accept = 'image/*,video/*,audio/*,application/pdf';
            inputElement.multiple = true;
            inputElement.addEventListener('change', (event) => {
              const files = (event.target as HTMLInputElement).files;
              if (!files) return;
              const newAttachments = Array.from(files).map((file) => ({
                id: crypto.randomUUID(),
                type: file.type,
                name: file.name,
                size: file.size,
                url: URL.createObjectURL(file),
              }));
              setAttachments((prev) => [...prev, ...newAttachments]);
            });
            inputElement.click();
          }}
        >
          <PaperclipIcon className="h-5 w-5" />
        </button>
        <Textarea
          data-testid="chat-input"
          ref={textareaRef}
          className="flex-1 min-h-[44px] max-h-40 resize-none bg-transparent outline-none px-3 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary"
          placeholder="Send a message…"
          value={input}
          onChange={handleInput}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (status !== 'streaming' && input.trim()) handleSubmit();
            }
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Type your message"
          rows={1}
          tabIndex={0}
        />
        <button
          type="submit"
          className={cn(
            'flex items-center justify-center rounded-md p-2 h-11 w-11 bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary transition disabled:opacity-50',
            status === 'streaming' || !input.trim() ? 'cursor-not-allowed' : '',
          )}
          disabled={status === 'streaming' || !input.trim()}
          aria-label={status === 'streaming' ? 'Stop' : 'Send'}
          tabIndex={0}
        >
          {status === 'streaming' ? (
            <StopIcon className="size-5" />
          ) : (
            <ArrowUpIcon className="size-5" />
          )}
        </button>
      </form>

      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-row gap-2 bg-muted/40 rounded-lg p-2"
          >
            {attachments.map((attachment) => (
              <PreviewAttachment
                key={attachment.id}
                attachment={attachment}
                onRemove={() => {
                  setAttachments((prev) =>
                    prev.filter((a) => a.id !== attachment.id),
                  );
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <SuggestedActions
              chatId={chatId}
              messages={messages}
              setMessages={setMessages}
              append={append}
              onSubmit={(action) => {
                setInput(action.content);
                handleSubmit();
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <SendButton
        input={input}
        submitForm={submitForm}
        uploadQueue={uploadQueue}
      />
    </div>
  );
}

export const MultimodalInput = memo(
  PureMultimodalInput,
  (prevProps, nextProps) => {
    if (prevProps.input !== nextProps.input) return false;
    if (prevProps.status !== nextProps.status) return false;
    if (!equal(prevProps.attachments, nextProps.attachments)) return false;

    return true;
  },
);

function PureAttachmentsButton({
  fileInputRef,
  status,
}: {
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  status: UseChatHelpers['status'];
}) {
  return (
    <Button
      data-testid="attachments-button"
      className="rounded-md rounded-bl-lg p-[7px] h-fit border border-border hover:bg-muted"
      onClick={(event) => {
        event.preventDefault();
        fileInputRef.current?.click();
      }}
      disabled={status !== 'ready'}
      variant="ghost"
    >
      <PaperclipIcon size={14} />
    </Button>
  );
}

const AttachmentsButton = memo(PureAttachmentsButton);

function PureStopButton({
  stop,
  setMessages,
}: {
  stop: () => void;
  setMessages: UseChatHelpers['setMessages'];
}) {
  return (
    <Button
      data-testid="stop-button"
      className="rounded-full p-1.5 h-fit border border-border"
      onClick={(event) => {
        event.preventDefault();
        stop();
        setMessages((messages) => messages);
      }}
    >
      <StopIcon size={14} />
    </Button>
  );
}

const StopButton = memo(PureStopButton);

function PureSendButton({
  submitForm,
  input,
  uploadQueue,
}: {
  submitForm: () => void;
  input: string;
  uploadQueue: Array<string>;
}) {
  return (
    <Button
      data-testid="send-button"
      className="rounded-full p-1.5 h-fit border border-border"
      onClick={(event) => {
        event.preventDefault();
        submitForm();
      }}
      disabled={input.length === 0 || uploadQueue.length > 0}
      aria-label="Send"
    >
      <ArrowUpIcon size={14} />
    </Button>
  );
}

const SendButton = memo(PureSendButton, (prevProps, nextProps) => {
  if (prevProps.uploadQueue.length !== nextProps.uploadQueue.length)
    return false;
  if (prevProps.input !== nextProps.input) return false;
  return true;
});
