'use client';

import { useState } from 'react';

interface AskBarProps {
  onSend: (value: string) => void;
}

export function AskBar({ onSend }: AskBarProps) {
  const [input, setInput] = useState('');

  function handleSend() {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  }

  return (
    <div className="flex items-center max-w-md mx-auto bg-zinc-800 rounded-full px-4 py-2 shadow-inner text-white">
      <input
        className="flex-1 bg-transparent outline-none text-base placeholder-zinc-400"
        placeholder="Ask me anything about AI consulting"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <button
        type="button"
        onClick={handleSend}
        className="ml-2 text-orange-400 hover:text-orange-300 transition"
        aria-label="Send question"
      >
        ➤
      </button>
    </div>
  );
}
