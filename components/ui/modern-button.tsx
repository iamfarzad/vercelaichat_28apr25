'use client';

import { cn } from '@/lib/utils';
import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline';
type ButtonSize = 'sm' | 'default' | 'lg';

interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'default',
    children,
    ...props
  }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300';
    const variantStyles: Record<ButtonVariant, string> = {
      primary: 'bg-gradient-to-r from-[oklch(var(--brand-orange))] to-[oklch(var(--brand-orange)/0.8)] text-white shadow-lg hover:opacity-90',
      secondary: 'bg-card/80 backdrop-blur-sm border border-border text-foreground hover:bg-muted/50',
      outline: 'border border-border bg-background hover:bg-muted/50 text-foreground',
    };
    
    const sizeStyles: Record<ButtonSize, string> = {
      sm: 'text-sm px-4 py-2',
      default: 'text-base px-6 py-3',
      lg: 'text-lg px-8 py-4',
    };

    return (
      <button
        className={cn(
          baseStyles,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

ModernButton.displayName = 'ModernButton';

export { ModernButton };
