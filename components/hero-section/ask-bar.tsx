'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
    <div className="flex items-center w-full max-w-md mx-auto bg-card/80 backdrop-blur-md rounded-full px-5 py-3 shadow-lg border border-border">
      {/* biome-ignore lint/nursery/noStaticElementInteractions: <explanation> */}
      <input
        className="flex-1 bg-transparent outline-none text-base placeholder-muted-foreground"
        placeholder="Ask me anything about mental clarity..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSend();
        }}
      />
      <button
        type="button"
        onClick={handleSend}
        className={`ml-2 text-brand-orange hover:text-[oklch(var(--brand-orange)/0.8)] transition-colors p-1 rounded-full ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!input.trim()}
        aria-label="Send question"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
