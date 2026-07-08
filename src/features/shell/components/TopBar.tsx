import { Bell, Menu, Moon, Sun } from 'lucide-react';

import { Tooltip } from '../../../components/ui/Tooltip';
import { deriveUsername } from '../../../lib/deriveUsername';
import { useAuthStore } from '../../../stores/auth-store';
import { useUiStore } from '../../../stores/ui-store';

export function TopBar() {
  const email = useAuthStore((s) => s.email);
  const toggleMobileSheet = useUiStore((s) => s.toggleMobileSheet);
  const darkMode = useUiStore((s) => s.darkMode);
  const toggleDarkMode = useUiStore((s) => s.toggleDarkMode);

  const firstName = deriveUsername(email);

  return (
    <header className='border-border bg-bg-canvas sticky top-0 z-10 flex items-center justify-between border-b py-3 pr-4 pl-0 sm:py-4 sm:pr-6'>
      <div className='flex items-center gap-3 pl-4 min-[901px]:pl-0 sm:pl-6'>
        <button
          className='border-border bg-surface-card text-text-neutral hover:bg-bg-default rounded-input flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center border transition-colors duration-180 ease-in-out max-[900px]:flex min-[901px]:hidden'
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
            className='border-border bg-surface-card text-text-neutral hover:bg-bg-default rounded-input flex h-9 w-9 cursor-pointer items-center justify-center border transition-colors duration-180 ease-in-out'
            aria-label='Notifications'
            disabled
          >
            <Bell size={17} />
          </button>
        </Tooltip>
        <button
          className='border-border bg-surface-card text-text-neutral hover:bg-bg-default rounded-input flex h-9 w-9 cursor-pointer items-center justify-center border transition-colors duration-180 ease-in-out'
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          onClick={toggleDarkMode}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
}
