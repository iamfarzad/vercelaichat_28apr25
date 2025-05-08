'use client';

import { type ReactNode, useMemo, useState } from 'react';
import { Button, type ButtonProps } from '@/components/ui/button'; // Added ButtonProps
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

import {
  CheckCircleFillIcon,
  ChevronDownIcon,
  GlobeIcon,
  LockIcon,
} from './icons';
// import { useChatVisibility } from '@/hooks/use-chat-visibility'; // Removed internal hook

export type VisibilityType = 'private' | 'public';

const visibilities: Array<{
  id: VisibilityType;
  label: string;
  description: string;
  icon: ReactNode;
}> = [
  {
    id: 'private',
    label: 'Private',
    description: 'Only you can access this chat',
    icon: <LockIcon />,
  },
  {
    id: 'public',
    label: 'Public',
    description: 'Anyone with the link can access this chat',
    icon: <GlobeIcon />,
  },
];

// Define props interface
interface VisibilitySelectorProps extends Omit<ButtonProps, 'onSelect'> {
  // Omit onSelect from ButtonProps if it clashes
  chatId: string;
  selectedVisibilityType: VisibilityType;
  onVisibilityChange: (updatedVisibilityType: VisibilityType) => void; // Added prop
  className?: string; // className was implicitly part of ButtonProps
}

export function VisibilitySelector({
  chatId, // Keep chatId if needed for other logic, though not directly for visibility state now
  className,
  selectedVisibilityType,
  onVisibilityChange, // Use passed prop
  ...buttonProps // Spread remaining button props
}: VisibilitySelectorProps) {
  const [open, setOpen] = useState(false);

  // const { visibilityType, setVisibilityType } = useChatVisibility({ // Removed
  //   chatId,
  //   initialVisibility: selectedVisibilityType,
  // });

  const selectedVisibility = useMemo(
    () =>
      visibilities.find(
        (visibility) => visibility.id === selectedVisibilityType,
      ), // Use prop
    [selectedVisibilityType],
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className={cn(
          // className from props is applied here
          'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
          className,
        )}
      >
        <Button
          variant="outline"
          // className="hidden md:flex md:px-2 md:h-[34px]" // Removed className from here as it's on DropdownMenuTrigger, parent className handles styling
          {...buttonProps} // Spread other button props
        >
          {selectedVisibility?.icon}
          {selectedVisibility?.label}
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-[300px]">
        {visibilities.map((visibility) => (
          <DropdownMenuItem
            key={visibility.id}
            onSelect={() => {
              // This is the correct onSelect for DropdownMenuItem
              onVisibilityChange(visibility.id); // Call passed callback
              setOpen(false);
            }}
            className="gap-4 group/item flex flex-row justify-between items-center"
            data-active={visibility.id === selectedVisibilityType} // Use prop
          >
            <div className="flex flex-col gap-1 items-start">
              {visibility.label}
              {visibility.description && (
                <div className="text-xs text-muted-foreground">
                  {visibility.description}
                </div>
              )}
            </div>
            <div className="text-foreground dark:text-foreground opacity-0 group-data-[active=true]/item:opacity-100">
              <CheckCircleFillIcon />
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
