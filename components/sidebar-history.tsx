'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';
import type { User } from 'next-auth';
import { formatDistanceToNow } from 'date-fns';

import { fetcher } from '@/lib/utils';
import { TrashIcon, MessageSquareIcon, PinIcon, PinOffIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { SidebarErrorState } from './sidebar-error-state';
import { ChatItem } from './sidebar-history-item';

import { useSidebar } from './ui/sidebar';
interface Chat {
  id: string;
  title: string;
  createdAt: Date;
  userId: string;
  path: string;
}

export function getChatHistoryPaginationKey(
  pageIndex: number,
  previousPageData: any,
) {
  // reached the end
  if (previousPageData && !previousPageData.chats?.length) return null;

  // first page, we don't have previousPageData
  if (pageIndex === 0) return `/api/chat/history?limit=10&page=1`;

  // add the cursor to the API endpoint
  return `/api/chat/history?limit=10&page=${pageIndex + 1}`;
}

import { ModelSelector } from './model-selector';
import type { Session } from 'next-auth';

export function SidebarHistory({
  user,
  selectedModelId,
  session,
}: {
  user: User | undefined;
  selectedModelId: string;
  session: Session;
}) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  // --- Sidebar Enhancements State ---
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [pinned, setPinned] = useState<string[]>([]);
  const [sessions, setSessions] = useState<{ id: string; name: string }[]>([
    { id: 'default', name: 'Default' },
  ]);
  const [activeSession, setActiveSession] = useState('default');

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite<{
    chats: Chat[];
    hasMore: boolean;
  }>(getChatHistoryPaginationKey, fetcher);

  const chats = data ? data.flatMap((page) => page.chats) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : false;

  // --- Pure logic for filtering, searching, pinning, deduplication ---
  const filteredChats = useMemo(() => {
    let result = chats;
    if (filter !== 'all') {
      result = result.filter((c) => c.title?.toLowerCase().includes(filter));
    }
    if (search) {
      result = result.filter((c) =>
        c.title?.toLowerCase().includes(search.toLowerCase()),
      );
    }
    // Deduplicate by id
    const seen = new Set();
    result = result.filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
    // Pin sorting: pinned first
    return [
      ...result.filter((c) => pinned.includes(c.id)),
      ...result.filter((c) => !pinned.includes(c.id)),
    ];
  }, [chats, filter, search, pinned]);

  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      });
      mutate();
    },
    [mutate],
  );

  const handlePin = useCallback(
    (chatId: string) => {
      setPinned((prev) =>
        prev.includes(chatId) ? prev.filter((id) => id !== chatId) : [...prev, chatId],
      );
    },
    [],
  );

  const handleRetry = useCallback(() => {
    mutate();
  }, [mutate]);

  // --- Multi-session UI handlers (simple local only) ---
  const handleNewSession = () => {
    const newId = `session-${Date.now()}`;
    setSessions((prev) => [...prev, { id: newId, name: `Session ${prev.length}` }]);
    setActiveSession(newId);
  };

  if (isLoading) {
    return (
      <div className="px-3 py-2">
        <div className="animate-pulse space-y-3">
          {[...Array(5)].map((_, i) => (
            <div
              key={`loading-skeleton-${i}-${Date.now()}`}
              className="h-12 bg-muted/50 rounded-md"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <SidebarErrorState
        isError
        error={error instanceof Error ? error : new Error('Failed to load chat history')}
        retry={handleRetry}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3 p-2">
      {/* Session/User Info */}
      <div className="flex flex-col gap-1 mb-2">
        <div className="text-xs text-muted-foreground">
          {session?.user?.name || session?.user?.email}
        </div>
      </div>
      {/* Model Info */}
      <div className="mb-2">
        <ModelSelector
          session={session}
          selectedModelId={selectedModelId}
          className="w-full"
        />
      </div>
      {/* Multi-Session UI */}
      <div className="flex items-center gap-2 mb-2">
        <Select
          value={activeSession}
          onValueChange={setActiveSession}
        >
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </Select>
        <Button size="sm" variant="outline" onClick={handleNewSession}>
          New Session
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex gap-2 mb-2">
        <Input
          placeholder="Search chats"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm"
        />
        <Select value={filter} onValueChange={setFilter}>
          <option value="all">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
        </Select>
      </div>
      {/* Chat History */}
      {filteredChats.length === 0 ? (
        <SidebarErrorState isEmpty />
      ) : (
        <div className="flex flex-col gap-1">
          {filteredChats.map((chat) => (
            <div key={chat.id} className="flex items-center justify-between">
              <ChatItem
                chat={chat}
                isActive={false}
                onDelete={handleDeleteChat}
                setOpenMobile={setOpenMobile}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={pinned.includes(chat.id) ? 'Unpin chat' : 'Pin chat'}
                    onClick={() => handlePin(chat.id)}
                  >
                    {pinned.includes(chat.id) ? (
                      <PinOffIcon size={16} className="text-yellow-500" />
                    ) : (
                      <PinIcon size={16} className="text-muted-foreground" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {pinned.includes(chat.id) ? 'Unpin' : 'Pin'}
                </TooltipContent>
              </Tooltip>
            </div>
          ))}
          {hasMore && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 w-full text-xs text-muted-foreground"
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
