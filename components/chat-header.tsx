'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { ModelSelector } from './model-selector';
import { Button } from './ui/button';
import { PlusIcon, VercelIcon, MenuIcon, SidebarLeftIcon, MoreIcon, TrashIcon, PencilEditIcon, ShareIcon, DownloadIcon } from './icons';
import { memo, useContext, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { TooltipContainerContext } from './chat-ui-wrapper';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';
import type { Session } from 'next-auth';
import { SidebarUserNav } from './sidebar-user-nav';
import { signIn } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';

interface PureChatHeaderProps {
  chatId: string;
  selectedModelId?: string;
  selectedVisibilityType?: VisibilityType;
  onVisibilityChange?: (updatedVisibilityType: VisibilityType) => void;
  isReadonly?: boolean;
  session: Session;
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
  chatName?: string;
  isPublic?: boolean;
  onClear?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onExportMarkdown?: () => void;
  onExportText?: () => void;
  onShareToggle?: () => void;
  shareUrl?: string;
}

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  onVisibilityChange,
  isReadonly,
  session,
  onToggleSidebar,
  isSidebarOpen,
  chatName,
  isPublic,
  onClear,
  onRename,
  onDelete,
  onExportMarkdown,
  onExportText,
  onShareToggle,
  shareUrl,
}: PureChatHeaderProps) {
  // Default no-op handlers for optional props
  const noop = () => {};
  onClear = onClear || noop;
  onRename = onRename || noop;
  onDelete = onDelete || noop;
  onExportMarkdown = onExportMarkdown || noop;
  onExportText = onExportText || noop;
  onShareToggle = onShareToggle || noop;
  onToggleSidebar = onToggleSidebar || noop;
  onVisibilityChange = onVisibilityChange || (() => {});
  isSidebarOpen = isSidebarOpen ?? false;
  isReadonly = isReadonly ?? false;
  isPublic = isPublic ?? false;
  selectedModelId = selectedModelId ?? '';
  selectedVisibilityType = selectedVisibilityType ?? 'private';
  chatName = chatName ?? '';
  shareUrl = shareUrl ?? '';
  const router = useRouter();
  const tooltipContainer = useContext(TooltipContainerContext);
  const { width: windowWidth } = useWindowSize();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // System prompt state
  const [systemPrompt, setSystemPrompt] = useState('');

  return (
    <header
      className="flex top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 overflow-visible sticky z-10 w-full border-b border-border"
      data-testid="chat-header"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-9 md:mr-1"
            onClick={onToggleSidebar}
            data-testid="sidebar-toggle-button"
          >
            {isSidebarOpen ? <span className="rotate-180 inline-block"><SidebarLeftIcon /></span> : <MenuIcon />}
            <span className="sr-only">{isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          collisionPadding={8}
          container={tooltipContainer}
        >
          {isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        </TooltipContent>
      </Tooltip>

      {windowWidth < 768 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="order-2 md:order-1 md:px-2 px-2 md:h-fit ml-auto md:ml-0"
              onClick={() => {
                router.push('/');
                router.refresh();
              }}
            >
              <PlusIcon />
              <span className="md:sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            collisionPadding={8}
            container={tooltipContainer}
          >
            New Chat
          </TooltipContent>
        </Tooltip>
      )}

      {/* Model Selector */}
      {selectedModelId && (
        <div className="inline-block order-1 md:order-2">
          <ModelSelector
            session={session}
            selectedModelId={selectedModelId}
            className="max-w-[140px] overflow-hidden text-ellipsis"
          />
        </div>
      )}

      {/* System Prompt Editor */}
      <div className="order-2 md:order-3 flex items-center gap-2">
        <label htmlFor="system-prompt" className="sr-only">
          System Prompt
        </label>
        <input
          id="system-prompt"
          type="text"
          value={systemPrompt}
          onChange={e => setSystemPrompt(e.target.value)}
          placeholder="System prompt…"
          className="text-sm px-2 py-1 rounded border border-border bg-background text-foreground w-40 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="System prompt"
        />
      </div>

      {/* Visibility Selector */}
      {!isReadonly && (
        <div className="inline-block order-3 md:order-4">
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            onVisibilityChange={onVisibilityChange}
            className="max-w-[120px] overflow-hidden text-ellipsis"
          />
        </div>
      )}

      {/* Login/User Controls */}
      <div className="order-4 md:order-5 ml-auto flex items-center gap-2">
        {session?.user ? (
          <SidebarUserNav user={session.user} />
        ) : (
          <Button
            variant="outline"
            className="py-1.5 px-3 h-fit"
            onClick={() => signIn()}
            aria-label="Sign in"
          >
            Sign in
          </Button>
        )}
      </div>

      <Button
        className="bg-card hover:bg-card/80 text-card-foreground hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-5"
        asChild
      >
        <Link
          href={`https://vercel.com/new/clone?repository-url=https://github.com/vercel/ai-chatbot&env=AUTH_SECRET&envDescription=Learn more about how to get the API Keys for the application&envLink=https://github.com/vercel/ai-chatbot/blob/main/.env.example&demo-title=AI Chatbot&demo-description=An Open-Source AI Chatbot Template Built With Next.js and the AI SDK by Vercel.&demo-url=https://chat.vercel.ai&products=[{"type":"integration","protocol":"ai","productSlug":"grok","integrationSlug":"xai"},{"type":"integration","protocol":"storage","productSlug":"neon","integrationSlug":"neon"},{"type":"blob"}]`}
          target="_noblank"
        >
          <VercelIcon size={16} />
          Deploy with Vercel
        </Link>
      </Button>
      {/* Chat-level controls */}
      <div className="order-6 ml-2 flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Chat options"
              className="size-9"
            >
              <MoreIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onClear}>
              <span className="flex items-center gap-2">
                <TrashIcon /> Clear Chat
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onRename}>
              <span className="flex items-center gap-2">
                <PencilEditIcon /> Rename Chat
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete} className="text-destructive">
              <span className="flex items-center gap-2">
                <TrashIcon /> Delete Chat
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onExportMarkdown}>
              <span className="flex items-center gap-2">
                <DownloadIcon /> Export as Markdown
              </span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onExportText}>
              <span className="flex items-center gap-2">
                <DownloadIcon /> Export as Text
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onShareToggle}>
              <span className="flex items-center gap-2">
                <ShareIcon />
                {isPublic ? 'Make Private' : 'Make Public'}
              </span>
            </DropdownMenuItem>
            {isPublic && (
              <DropdownMenuItem asChild>
                <a
                  href={shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ShareIcon /> Copy Share Link
                </a>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId &&
         prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
         prevProps.isSidebarOpen === nextProps.isSidebarOpen &&
         prevProps.chatId === nextProps.chatId;
});
