// components/header.tsx
"use client"; // Required for using hooks like useChatStore

import Link from 'next/link';
import { useChatStore } from '@/stores/chatStore'; // Adjusted path

export default function Header() {
  const { togglePopover } = useChatStore();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center"> {/* Changed to justify-between */}
        <Link href="/" className="text-xl font-bold hover:text-gray-300">
          Company Name
        </Link>
        <nav>
          <ul className="flex space-x-4 items-center"> {/* Added items-center */}
            <li><Link href="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link href="/about" className="hover:text-gray-300">About</Link></li>
            <li><Link href="/services" className="hover:text-gray-300">Services</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
            <li>
              <button
                type="button"
                onClick={togglePopover}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Chat
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
