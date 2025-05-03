import { cn } from '@/lib/utils';
import { forwardRef, InputHTMLAttributes } from 'react';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className={cn(
            'toggle w-14 h-6 bg-card border border-border rounded-full relative cursor-pointer flex items-center justify-between px-1',
            className,
          )}
          ref={ref}
          {...props}
        />
        {label && <span className="ml-2 text-sm">{label}</span>}
      </label>
    );
  },
);

Toggle.displayName = 'Toggle';

export { Toggle };
