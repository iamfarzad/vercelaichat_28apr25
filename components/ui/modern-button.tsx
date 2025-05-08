'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  (
    { className, variant = 'primary', size = 'default', children, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white shadow-lg hover:opacity-90':
              variant === 'primary',
            'bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-muted/50':
              variant === 'secondary',
            'border border-border bg-background hover:bg-muted/50 text-foreground':
              variant === 'outline',
            'text-sm px-4 py-2': size === 'sm',
            'text-base px-6 py-3': size === 'default',
            'text-lg px-8 py-4': size === 'lg',
          },
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

ModernButton.displayName = 'ModernButton';
