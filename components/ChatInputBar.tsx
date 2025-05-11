'use client';

import React from 'react';

interface ChatInputBarProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function ChatInputBar({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  placeholder = 'Send a message...',
}: ChatInputBarProps) {
  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t bg-background">
      <textarea
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="flex-grow p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
        rows={1}
        disabled={isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            // Ensure form submission on Enter key press if not loading
            if (!isLoading) {
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }
          }
        }}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="ml-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}