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
    <header className="sticky top-0 z-5 flex items-center justify-between border-b border-border bg-bg-canvas px-6 py-4">
      <div>
        <p className="m-0 text-size-heading font-semibold text-text-default">
          Welcome back, {firstName}
        </p>
        <p className="mb-0 mt-0.5 text-size-caption text-text-neutral">
          Here's how your portfolio is doing today
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Tooltip label="Coming soon">
          <button
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-surface-card text-text-neutral transition-colors duration-180 ease-in-out hover:bg-bg-default"
            aria-label="Notifications"
            disabled
          >
            <Bell size={17} />
          </button>
        </Tooltip>
        <button
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border border-border bg-surface-card text-text-neutral transition-colors duration-180 ease-in-out hover:bg-bg-default"
          aria-label="Log out"
          onClick={handleLogout}
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
