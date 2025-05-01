import { Button } from '@/components/ui/button';

export function CTAButton({ className = '' }: { className?: string }) {
  return (
    <Button
      className={`bg-orange-500 hover:bg-orange-600 text-white text-lg px-6 py-3 rounded-full shadow-lg transition ${className}`}
    >
      Book a free call
    </Button>
  );
}
