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
      />
      <Search
        size={14}
        className="absolute left-3 text-muted-foreground pointer-events-none"
      />
    </div>
  );
}
