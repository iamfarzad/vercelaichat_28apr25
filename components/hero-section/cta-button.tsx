import { ModernButton } from '@/components/ui/modern-button';

export function CTAButton({ className = '' }: { className?: string }) {
  return (
    <ModernButton
      variant="primary"
      className={`text-lg px-6 py-3 rounded-full shadow-lg transition ${className}`}
    >
      Book a free call
    </ModernButton>
  );
}
