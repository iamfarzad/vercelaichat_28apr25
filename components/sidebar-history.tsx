'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSWRInfinite from 'swr/infinite';
import type { User } from 'next-auth';
import { formatDistanceToNow } from 'date-fns';

import { fetcher } from '@/lib/utils';
import { TrashIcon, MessageSquareIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
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

export function SidebarHistory({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  const { data, error, mutate, size, setSize, isLoading } = useSWRInfinite<{
    chats: Chat[];
    hasMore: boolean;
  }>(getChatHistoryPaginationKey, fetcher);

  const chats = data ? data.flatMap((page) => page.chats) : [];
  const hasMore = data ? data[data.length - 1]?.hasMore : false;

  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      });
      mutate();
    },
    [mutate],
  );

  if (isLoading) {
    return (
      <div className="px-3 py-2">
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-3 py-2 text-sm text-muted-foreground">
        Error loading chat history
      </div>
    );
  }

  if (chats.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 px-2">
      {chats.map((chat) => (
        <div
          key={chat.id}
          className="group flex items-center justify-between rounded-md px-2 py-2 hover:bg-muted/50 cursor-pointer"
          onClick={() => {
            router.push(`/chat/${chat.id}`);
            setOpenMobile(false);
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <MessageSquareIcon
              size={16}
              className="text-muted-foreground shrink-0"
            />
            <div className="truncate text-sm">{chat.title || 'New Chat'}</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden group-hover:inline">
              {formatDistanceToNow(new Date(chat.createdAt), {
                addSuffix: true,
              })}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                >
                  <TrashIcon size={14} className="text-muted-foreground" />
                  <span className="sr-only">Delete chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Delete chat</TooltipContent>
            </Tooltip>
          </div>
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
  );
}
