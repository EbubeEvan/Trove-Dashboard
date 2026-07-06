import { useNavigate } from '@tanstack/react-router';
import { Bell, LogOut } from 'lucide-react';
import { useAuthStore } from '../../core/stores/auth-store';
import { Tooltip } from '../../core/design-system/Tooltip';

export function TopBar() {
  const email = useAuthStore((s) => s.email);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate({ to: '/login' });
  }

  const firstName = email ? email.split('@')[0] : 'there';

  return (
    <header className="sticky top-0 z-5 flex items-center justify-between border-b border-(--color-border) bg-(--color-bg-canvas) px-(--space-6) py-(--space-4)">
      <div>
        <p className="m-0 text-(length:--font-size-heading) font-semibold text-(--color-text-default)">
          Welcome back, {firstName}
        </p>
        <p className="mb-0 mt-0.5 text-(length:--font-size-caption) text-(--color-text-neutral)">
          Here's how your portfolio is doing today
        </p>
      </div>

      <div className="flex items-center gap-(--space-3)">
        <Tooltip label="Coming soon">
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-(--color-border) bg-(--color-surface-card) text-(--color-text-neutral) transition-colors duration-180 ease-in-out hover:bg-(--color-bg-default)"
            aria-label="Notifications"
            disabled
          >
            <Bell size={17} />
          </button>
        </Tooltip>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-(--color-border) bg-(--color-surface-card) text-(--color-text-neutral) transition-colors duration-180 ease-in-out hover:bg-(--color-bg-default)"
          aria-label="Log out"
          onClick={handleLogout}
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
