'use client';

import { useState } from 'react';
import { Search } from 'lucide-react'; // or <i className="fas fa-search" />

export default function SearchBar() {
  const [value, setValue] = useState('');

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-9 h-9 pl-9 pr-3 py-2 bg-card border border-border rounded-full text-foreground placeholder:text-muted-foreground outline-none transition-all duration-300"
      />
      <Search
        size={14}
        className="absolute left-3 text-muted-foreground pointer-events-none"
      />
    </div>
  );
}
