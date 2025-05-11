'use client';

import { useChat } from 'ai/react';
import type { Message } from 'ai/react';
import type { ToolCall as CoreToolCall } from 'ai';
import { useEffect } from 'react';
import MessagesList from './MessagesList';
import ChatInputBar from './ChatInputBar';

const CHAT_HISTORY_KEY = 'chatHistory';

export default function ChatInterface({
  initialMessages,
  chatId,
}: {
  initialMessages?: Message[];
  chatId?: string;
}) {
  const { messages, input, handleInputChange, handleSubmit, isLoading, addToolResult } = useChat({
    api: '/api/chat',
    id: chatId,
    initialMessages: initialMessages,
    // Corrected onToolCall to destructure { toolCall }
    onToolCall: async ({ toolCall }: { toolCall: CoreToolCall<string, unknown> }) => {
      const toolCallId = toolCall.id;
      const toolName = toolCall.tool_name;
      const toolArguments = toolCall.tool_arguments;

      let argsString: string;
      if (typeof toolArguments === 'string') {
        argsString = toolArguments;
      } else if (toolArguments && typeof toolArguments === 'object') {
        try {
          argsString = JSON.stringify(toolArguments);
        } catch (e) {
          console.error(`Error stringifying arguments for tool ${toolName} (ID: ${toolCallId}):`, e);
          addToolResult({
            toolCallId,
            result: JSON.stringify({ error: `Failed to stringify arguments for tool ${toolName}` }),
          });
          return; 
        }
      } else {
        argsString = String(toolArguments);
        if (toolArguments !== null && typeof toolArguments !== 'undefined') {
          console.warn(`Tool arguments for ${toolName} (ID: ${toolCallId}) were not string/object. Coerced: "${argsString}"`);
        }
      }
      
      let parsedArgs: any;
      try {
        parsedArgs = JSON.parse(argsString);
      } catch (error) {
        console.error(`Error parsing arguments for tool ${toolName} (ID: ${toolCallId}). Args: "${argsString}". Error:`, error);
        addToolResult({
          toolCallId,
          result: JSON.stringify({ error: `Failed to parse arguments for tool ${toolName}. Ensure valid JSON if required.` }),
        });
        return;
      }

      if (toolName === 'getServiceInformation') {
        console.log(`Tool call for getServiceInformation (ID: ${toolCallId}) received. Args:`, parsedArgs);
        // Result for this tool is expected to come from the server.
      } else if (toolName === 'askForConfirmation') {
        console.log(`Tool call for askForConfirmation (ID: ${toolCallId}) received. UI should render options. Args:`, parsedArgs);
        // No result added here; user interaction in MessagesList will call addToolResult.
      } else {
        console.warn(`Unknown tool called in onToolCall: ${toolName} (ID: ${toolCallId})`);
        addToolResult({
          toolCallId,
          result: JSON.stringify({ error: `Tool ${toolName} not found or not implemented by onToolCall.` }),
        });
      }
    },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (messages.length > 0) {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
      } else if (messages.length === 0 && localStorage.getItem(CHAT_HISTORY_KEY)) {
        localStorage.removeItem(CHAT_HISTORY_KEY);
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        <MessagesList messages={messages} addToolResult={addToolResult} />
      </div>
      <ChatInputBar
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
