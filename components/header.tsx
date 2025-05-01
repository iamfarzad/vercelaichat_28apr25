'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">YourBrand</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Desktop Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center">
            <Link href="/" className="px-4 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="px-4 py-2 text-sm font-medium">
              About
            </Link>
            <Link href="/features" className="px-4 py-2 text-sm font-medium">
              Features
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 min-h-[44px] min-w-[44px]"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[250px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <Link
                    href="/"
                    className="px-2 py-4 text-base font-medium border-b border-border/40"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="px-2 py-4 text-base font-medium border-b border-border/40"
                  >
                    About
                  </Link>
                  <Link
                    href="/features"
                    className="px-2 py-4 text-base font-medium border-b border-border/40"
                  >
                    Features
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 w-9"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <SunIcon className="h-4 w-4" />
              ) : (
                <MoonIcon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
