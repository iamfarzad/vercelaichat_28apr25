import { useRef, useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const expanded = focused || value.length > 0;

  function handleIconClick() {
    inputRef.current?.focus();
  }

  return (
    <div
      className="relative"
      style={{ width: expanded ? 288 : 40, transition: 'width 0.3s' }}
    >
      <button
        type="button"
        tabIndex={-1}
        onClick={handleIconClick}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-transparent border-none p-0 m-0 cursor-pointer"
        style={{ outline: 'none' }}
        aria-label="Expand search"
      >
        <Search
          size={16}
          className="text-muted-foreground"
          aria-hidden="true"
        />
      </button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search…"
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 pr-3 py-2 border rounded-md text-sm bg-background text-foreground placeholder:text-muted-foreground transition-all duration-300 w-full focus:outline-none"
        style={{
          width: '100%',
          opacity: expanded ? 1 : 0,
          pointerEvents: expanded ? 'auto' : 'none',
          transition: 'opacity 0.2s, width 0.3s',
          borderColor: expanded ? 'oklch(0.686 0.219 41.6)' : undefined, // brand orange
          boxShadow: expanded
            ? '0 0 0 1px oklch(0.686 0.219 41.6)' // slimmer brand orange focus ring
            : undefined,
        }}
      />
    </div>
  );
}