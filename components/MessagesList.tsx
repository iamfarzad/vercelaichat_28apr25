'use client';

import type { Message, ToolInvocation } from 'ai/react'; // Updated import
import React, { useState, useEffect, useRef } from 'react';

interface MessagesListProps {
  messages: Message[];
  addToolResult: (args: { toolCallId: string; result: string }) => void;
}

// Interface for the expected structure of getServiceInformation tool result
interface ServiceInfo {
  serviceName: string;
  description: string; // Matching PRD
  duration?: string;
  cost?: string;
  notFound?: boolean;
}

// Interface for the expected structure of askForConfirmation tool arguments
interface AskForConfirmationArgs {
  message: string;
}

export default function MessagesList({ messages, addToolResult }: MessagesListProps): React.ReactElement {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [confirmationSent, setConfirmationSent] = useState<Record<string, boolean>>({});

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleConfirmation = (toolCallId: string, confirmed: boolean) => {
    addToolResult({
      toolCallId,
      result: JSON.stringify({ confirmed }),
    });
    setConfirmationSent((prev) => ({ ...prev, [toolCallId]: true }));
  };

  return (
    <div className="p-4 space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${
            msg.role === 'user' ? 'justify-end' : 'justify-start'
          }`}
        >
          <div
            className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg shadow ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.role === 'assistant' && <strong className="text-sm font-semibold">AI:</strong>}
            {msg.role === 'user' && <strong className="text-sm font-semibold">You:</strong>}
            {/* Removed direct rendering for msg.role === 'tool' as results are handled via toolInvocations */}
            
            <div className="mt-1 whitespace-pre-wrap text-sm">
              {msg.content}

              {/* Render tool invocations and results for assistant messages */}
              {msg.role === 'assistant' &&
                msg.toolInvocations &&
                msg.toolInvocations.map((toolInvocation: ToolInvocation) => (
                  <div key={toolInvocation.toolCallId} className="mt-2">
:start_line:70
-------
                    {toolInvocation.toolName === 'askForConfirmation' &&
                      (!toolInvocation.result && !confirmationSent[toolInvocation.toolCallId] ? (
                        <div className="my-2 p-3 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-700 rounded-lg shadow-sm text-sm">
                          <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                            {(toolInvocation.args as AskForConfirmationArgs).message || 'Are you sure?'}
                          </p>
                          <div className="mt-2 space-x-2">
                            <button
                              type="button"
                              onClick={() => handleConfirmation(toolInvocation.toolCallId, true)}
                              className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                            >
                              Yes
                            </button>
                            <button
                              type="button"
                              onClick={() => handleConfirmation(toolInvocation.toolCallId, false)}
                              className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      ) : (
                        toolInvocation.result && (
                          <div className="my-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs italic">
                            User responded: {JSON.parse(toolInvocation.result as string).confirmed ? 'Yes' : 'No'}
                          </div>
                        )
                      ))}
                    {toolInvocation.toolName === 'getServiceInformation' && toolInvocation.result && (
                      <div className="my-2 p-3 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 rounded-lg shadow-sm text-sm">
                        <h4 className="font-semibold text-sky-700 dark:text-sky-300 mb-1">
                          Service: {(toolInvocation.result as ServiceInfo).serviceName}
                        </h4>
                        <p className="text-foreground">{(toolInvocation.result as ServiceInfo).description}</p>
                        {(toolInvocation.result as ServiceInfo).duration && (
                          <p className="text-xs mt-1 text-muted-foreground">
                            Duration: {(toolInvocation.result as ServiceInfo).duration}
                          </p>
                        )}
                        {(toolInvocation.result as ServiceInfo).cost && (
                          <p className="text-xs text-muted-foreground">
                            Cost: {(toolInvocation.result as ServiceInfo).cost}
                          </p>
                        )}
                        {(toolInvocation.result as ServiceInfo).notFound && (
                           <p className="text-xs mt-1 text-amber-600 dark:text-amber-400">
                             Note: {(toolInvocation.result as ServiceInfo).description}
                           </p>
                        )}
                      </div>
                    )}
                    
                    {/* Fallback for pending or other tools - can be enhanced */}
                    {toolInvocation.toolName !== 'askForConfirmation' &&
                     toolInvocation.toolName !== 'getServiceInformation' &&
                     !toolInvocation.result && (
                       <div className="my-1 p-2 bg-purple-100 dark:bg-purple-900/30 rounded text-xs italic">
                         AI is using tool: {toolInvocation.toolName}...
                       </div>
                    )}
                     {toolInvocation.toolName !== 'askForConfirmation' &&
                     toolInvocation.toolName !== 'getServiceInformation' &&
                     toolInvocation.result && (
                       <div className="my-1 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs italic">
                         Tool {toolInvocation.toolName} returned.
                       </div>
                    )}
                  </div>
                ))}
            </div>
            {/* Removed the separate block for msg.role === 'tool' */}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}