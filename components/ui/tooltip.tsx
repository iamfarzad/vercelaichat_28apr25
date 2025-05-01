'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent is rendered inside the nearest modal/dialog container (not document.body) to prevent tooltip leaks.
 * This ensures tooltips are visually and semantically contained within the modal context.
 *
 * If you render a modal/dialog, pass a `container` prop (HTMLElement ref) to TooltipContent for strict containment.
 * Falls back to Radix default portal if no container is provided.
 */
import { createPortal } from 'react-dom';
import { useContext } from 'react';
import { TooltipContainerContext } from '@/components/chat-ui-wrapper';
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    container?: HTMLElement | null;
  }
>(({ className, sideOffset = 4, container, ...props }, ref) => {
  const contextContainer = useContext(TooltipContainerContext);
  const targetContainer = container ?? contextContainer;
  const content = (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      collisionPadding={8}
      className={cn(
        'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  );
  return targetContainer ? createPortal(content, targetContainer) : content;
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
