import { signOut } from '@/app/(auth)/auth';
import { ModernButton } from '@/components/ui/modern-button';

export const SignOutForm = () => {
  return (
    <form
      className="w-full"
      onSubmit={async (e) => {
        e.preventDefault();
        await signOut({
          redirectTo: '/',
        });
      }}
    >
      <ModernButton
        type="submit"
        variant="secondary"
        className="w-full text-left px-1 py-0.5 text-red-500"
      >
        Sign out
      </ModernButton>
    </form>
  );
};
