'use client';

import { MessageSquareOff, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface SidebarErrorStateProps {
  error?: Error;
  retry?: () => void;
  isError?: boolean;
  isEmpty?: boolean;
}

export function SidebarErrorState({
  error,
  retry,
  isError,
  isEmpty
}: SidebarErrorStateProps) {
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center min-h-[100px]">
        <MessageSquareOff className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          No chat history yet
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center min-h-[100px]">
        <p className="text-sm text-muted-foreground mb-2">
          {error?.message || 'Failed to load chat history'}
        </p>
        {retry && (
          <Button
            variant="ghost"
            size="sm"
            onClick={retry}
            className="h-7 px-2 text-xs gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            Try again
          </Button>
        )}
      </div>
    );
  }

  return null;
}
