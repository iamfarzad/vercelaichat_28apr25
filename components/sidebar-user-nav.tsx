'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import type { User } from 'next-auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserIcon, LogOutIcon, SettingsIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ModernButton } from './ui/modern-button';

export function SidebarUserNav({ user }: { user: User }) {
  const router = useRouter();
  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
            <Avatar className="h-8 w-8">
              {user?.image ? (
                <AvatarImage src={user.image} alt={user.name ?? ''} />
              ) : (
                <AvatarFallback className="text-xs">
                  {initials ?? <UserIcon size={16} />}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium">{user?.name}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                {user?.email}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[200px]">
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => router.push('/settings')}
            >
              <SettingsIcon size={14} />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 text-destructive focus:text-destructive"
              onClick={() => signOut()}
            >
              <LogOutIcon size={14} />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ModernButton
        variant="secondary"
        className="px-4 py-2 text-sm"
        onClick={() => signOut()}
      >
        Sign out
      </ModernButton>
    </div>
  );
}
