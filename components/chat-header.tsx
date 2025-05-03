'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';
import { motion } from 'framer-motion';

import { ModelSelector } from '@/components/model-selector';
import { Button } from '@/components/ui/button';
import { PlusIcon, VercelIcon, MenuIcon } from './icons';
import { memo, useContext, useEffect, useState } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { TooltipContainerContext } from './chat-ui-wrapper';
import { type VisibilityType, VisibilitySelector } from './visibility-selector';
import { useSidebar } from './ui/sidebar';
import type { Session } from 'next-auth';
import { cn } from '@/lib/utils';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
  session,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  session: Session;
}) {
  const router = useRouter();
  const tooltipContainer = useContext(TooltipContainerContext);
  const { toggleSidebar } = useSidebar();
  const { width: windowWidth } = useWindowSize();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className="flex top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 overflow-visible sticky z-10 w-full"
      data-testid="chat-header"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 md:mr-1"
            onClick={toggleSidebar}
            data-testid="sidebar-toggle-button"
          >
            <MenuIcon />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          collisionPadding={8}
          container={tooltipContainer}
        >
          Toggle sidebar
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

      {selectedModelId && (
        <div className="inline-block order-1 md:order-2">
          <ModelSelector
            session={session}
            selectedModelId={selectedModelId}
            className="max-w-[140px] overflow-hidden text-ellipsis"
          />
        </div>
      )}

      {!isReadonly && (
        <div className="inline-block order-1 md:order-3">
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            className="max-w-[120px] overflow-hidden text-ellipsis"
          />
        </div>
      )}

      <Button
        className="bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 text-zinc-50 dark:text-zinc-900 hidden md:flex py-1.5 px-2 h-fit md:h-[34px] order-4 md:ml-auto"
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
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
