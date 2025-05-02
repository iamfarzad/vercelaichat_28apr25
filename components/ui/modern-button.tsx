'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ModernButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function ModernButton({ onClick, children, variant = 'primary' }: ModernButtonProps) {
  const baseStyles = 'rounded-full font-medium transition-all duration-300';
  const primaryStyles = 'bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white shadow-lg hover:shadow-xl';
  const secondaryStyles = 'bg-background hover:bg-muted text-muted-foreground border border-border hover:border-border/80';

  return (
    <Button
      onClick={onClick}
      className={`${baseStyles} ${variant === 'primary' ? primaryStyles : secondaryStyles} px-6 py-3`}
    >
      {children}
    </Button>
  );
}
