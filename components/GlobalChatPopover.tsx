// components/GlobalChatPopover.tsx
'use client';

import { useState, useEffect } from 'react';
import { useChatStore } from '@/stores/chatStore';
import ChatInterface from './ChatInterface';
import type { Message } from 'ai'; // For typing parsed messages

const CHAT_HISTORY_KEY = 'chatHistory'; // Same key as in ChatInterface

export default function GlobalChatPopover() {
  const isOpen = useChatStore(state => state.isOpen);
  const chatId = useChatStore(state => state.chatId);
  const initialQuery = useChatStore(state => state.initialQuery);
  const clearInitialQuery = useChatStore(state => state.clearInitialQuery);
  const setChatId = useChatStore(state => state.setChatId); // Ensure setChatId is available if needed

  const [effectiveInitialMessages, setEffectiveInitialMessages] = useState<Message[] | undefined>(undefined);

  useEffect(() => {
    if (isOpen && typeof window !== 'undefined') {
      let loadedMessages: Message[] = [];
      try {
        const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
        if (storedHistory) {
          loadedMessages = JSON.parse(storedHistory);
        }
      } catch (error) {
        console.error('Failed to parse chat history from localStorage:', error);
        localStorage.removeItem(CHAT_HISTORY_KEY); // Clear corrupted history
      }

      if (initialQuery) {
        const queryMessage: Message = {
          id: `initial-query-${Date.now()}`, // Unique ID for the query message
          role: 'user',
          content: initialQuery,
        };
        // Prepend initial query to ensure it's the first user message if history exists,
        // or the only message if history is empty.
        // This also means if the chat is re-opened with an initial query, it's added again.
        // This behavior might need refinement based on desired UX.
        // For now, we add it if present.
        loadedMessages = [queryMessage, ...loadedMessages.filter(m => m.id !== queryMessage.id)];
        
        // If there's an initial query, it implies a new interaction context,
        // so we might want to clear existing history or use a new chatId.
        // For now, we just add the query.
        // Consider if a new chatId should be generated here if initialQuery is present.
        // if (!chatId) {
        //   const newChatId = Date.now().toString(); // Simple unique ID
        //   setChatId(newChatId); // Update store if chatId is managed per session
        // }
        clearInitialQuery();
      }
      setEffectiveInitialMessages(loadedMessages);
    } else if (!isOpen) {
      // Optionally reset messages when popover is closed to ensure fresh load on reopen
      // setEffectiveInitialMessages(undefined);
    }
  }, [isOpen, initialQuery, clearInitialQuery, chatId, setChatId]);


  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-[70vh] bg-white border border-gray-300 rounded-lg shadow-xl z-50 flex flex-col">
      {/* Keying ChatInterface with chatId ensures it re-initializes if chatId changes */}
      <ChatInterface key={chatId} initialMessages={effectiveInitialMessages} chatId={chatId} />
    </div>
  );
}