import { useNavigate } from '@tanstack/react-router';
import { Bell, LogOut, Menu } from 'lucide-react';

import { Tooltip } from '../../../components/ui/Tooltip';
import { useAuthStore } from '../../../stores/auth-store';
import { useUiStore } from '../../../stores/ui-store';

export function TopBar() {
  const email = useAuthStore((s) => s.email);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();
  const toggleMobileSheet = useUiStore((s) => s.toggleMobileSheet);

  function handleLogout() {
    clearSession();
    navigate({ to: '/login' });
  }

  const firstName = email ? email.split('@')[0] : 'there';

  return (
    <header className='border-border bg-bg-canvas sticky top-0 z-10 flex items-center justify-between border-b px-4 py-3 sm:px-6 sm:py-4'>
      <div className='flex items-center gap-3'>
        <button
          className='border-border bg-surface-card text-text-neutral hover:bg-bg-default flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border transition-colors duration-180 ease-in-out max-[900px]:flex min-[901px]:hidden'
          aria-label='Open navigation menu'
          onClick={toggleMobileSheet}
        >
          <Menu size={18} />
        </button>
        <div className='min-w-0'>
          <p className='text-heading text-text-default m-0 font-semibold'>
            Welcome back, {firstName}
          </p>
          <p className='text-caption text-text-neutral mt-0.5 mb-0'>
            Here{"'"}s how your portfolio is doing today
          </p>
        </div>
      </div>

      <div className='flex items-center gap-2 sm:gap-3'>
        <Tooltip label='Coming soon'>
          <button
            className='border-border bg-surface-card text-text-neutral hover:bg-bg-default flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border transition-colors duration-180 ease-in-out'
            aria-label='Notifications'
            disabled
          >
            <Bell size={17} />
          </button>
        </Tooltip>
        <button
          className='border-border bg-surface-card text-text-neutral hover:bg-bg-default flex h-9 w-9 cursor-pointer items-center justify-center rounded-[10px] border transition-colors duration-180 ease-in-out'
          aria-label='Log out'
          onClick={handleLogout}
        >
          <LogOut size={17} />
        </button>
      </div>
    </header>
  );
}
