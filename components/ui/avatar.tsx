import * as React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function Avatar({ className, size = 40, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-muted',
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    />
  );
}

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}
export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn('object-cover w-full h-full', className)}
      {...props}
    />
  ),
);
AvatarImage.displayName = 'AvatarImage';

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {}
export const AvatarFallback = React.forwardRef<
  HTMLSpanElement,
  AvatarFallbackProps
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'flex items-center justify-center w-full h-full text-xs text-muted-foreground',
      className,
    )}
    {...props}
  >
    {children || '?'}
  </span>
));
AvatarFallback.displayName = 'AvatarFallback';
