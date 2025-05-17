declare module 'magic-ui' {
  import type { ButtonHTMLAttributes, ReactNode, FC } from 'react';
  
  export interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
  }

  export interface ShimmerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    className?: string;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
  }

  export const AnimatedGridPattern: FC<AnimatedGridPatternProps>;
  export const ShimmerButton: FC<ShimmerButtonProps>;
  // Add other exports as needed
}
