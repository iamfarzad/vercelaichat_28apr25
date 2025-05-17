'use client';

import React from 'react';

interface ChatRootProps {
  children: React.ReactNode;
}

export function ChatRoot({ children }: ChatRootProps) {
  // ChatRoot provides the main container for the chat interface
  return (
    <div className="flex flex-col h-full w-full bg-background text-foreground">
      {/* Chat header, messages, and input will be rendered as children */}
      {children}
    </div>
  );
}

export default ChatRoot;
