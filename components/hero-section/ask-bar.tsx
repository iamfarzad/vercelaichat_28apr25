'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface AskBarProps {
  onSend: (value: string) => void;
}

export function AskBar({ onSend }: AskBarProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput(''); // Optionally clear input
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full max-w-md mx-auto bg-card/80 backdrop-blur-md rounded-full px-5 py-3 shadow-lg border border-border"
    >
      <input
        className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
        placeholder="Ask me anything about..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className={`ml-2 text-brand-orange hover:text-[oklch(var(--brand-orange)/0.8)] transition-colors p-1 rounded-full ${!input.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!input.trim()}
        aria-label="Send question"
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
