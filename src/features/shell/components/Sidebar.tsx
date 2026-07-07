import { useRouterState } from '@tanstack/react-router';
import {
  LayoutGrid,
  LineChart,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Settings,
} from 'lucide-react';
import { useEffect } from 'react';

import troveLogo from '../../../assets/logos/trove-logo.png';
import { Tooltip } from '../../../components/ui/Tooltip';
import { cx } from '../../../lib/classNames';
import { deriveUsername } from '../../../lib/deriveUsername';
import { useAuthStore } from '../../../stores/auth-store';
import { useUiStore } from '../../../stores/ui-store';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/dashboard' },
  { label: 'Transactions', icon: Receipt },
  { label: 'Markets', icon: LineChart },
  { label: 'Settings', icon: Settings },
];

interface SidebarProps {
  className?: string;
  forceExpanded?: boolean;
}

function getSidebarWidth(forceExpanded: boolean | undefined, isExpanded: boolean) {
  if (forceExpanded) return '100%';
  if (isExpanded) return 'var(--sidebar-width-expanded)';
  return 'var(--sidebar-width-collapsed)';
}

function getNavIconSize(forceExpanded: boolean | undefined, isExpanded: boolean) {
  if (forceExpanded) return 22;
  if (isExpanded) return 20;
  return 24;
}

function SidebarLogo({
  forceExpanded,
  isExpanded,
}: Readonly<{ forceExpanded?: boolean; isExpanded: boolean }>) {
  if (!isExpanded) return null;

  return (
    <div className={cx('flex h-12 shrink-0 items-center overflow-hidden', forceExpanded && 'h-14')}>
      <img
        src={troveLogo}
        alt='Trove'
        className={cx('h-auto w-40 max-w-none object-contain', forceExpanded && 'w-48')}
      />
    </div>
  );
}

export function Sidebar({ className, forceExpanded }: Readonly<SidebarProps>) {
  const email = useAuthStore((s) => s.email);
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isExpanded = forceExpanded || !collapsed;
  const sidebarWidth = getSidebarWidth(forceExpanded, isExpanded);
  const navIconSize = getNavIconSize(forceExpanded, isExpanded);
  const username = deriveUsername(email);

  useEffect(() => {
    if (forceExpanded) return;
    const mq = window.matchMedia('(max-width: 900px)');
    setSidebarCollapsed(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSidebarCollapsed(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceExpanded]);

  return (
    <aside
      className={cx(
        'border-border bg-surface-card flex flex-col border-r px-4 py-5 transition-[width,min-width] duration-300 ease-out',
        forceExpanded && 'px-6 py-7',
        forceExpanded ? 'relative h-full' : 'fixed top-0 left-0 z-40 h-screen',
        className,
      )}
      style={{ width: sidebarWidth, minWidth: sidebarWidth }}
    >
      <div
        className={cx(
          'mb-7 flex items-center gap-3 px-1',
          isExpanded ? 'justify-between' : 'justify-center',
          forceExpanded && 'mb-8',
        )}
      >
        <SidebarLogo forceExpanded={forceExpanded} isExpanded={isExpanded} />
        {!forceExpanded && (
          <button
            className='text-text-neutral hover:bg-bg-default flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-1.5 transition-colors duration-180 ease-in-out'
            onClick={toggleSidebar}
            aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {isExpanded ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        )}
      </div>

      <nav className={cx('flex flex-1 flex-col gap-1', forceExpanded && 'gap-2')}>
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const active = to === pathname;
          const disabled = !to;
          const item = (
            <button
              key={label}
              className={cx(
                'rounded-input text-heading flex w-full cursor-pointer items-center gap-3.5 overflow-hidden border-0 px-3.5 py-3 text-left font-medium whitespace-nowrap transition-[background,color,padding] duration-200 ease-out',
                forceExpanded && 'gap-4 px-4 py-3.5',
                !isExpanded && 'justify-center p-2.5',
                active && 'bg-primary-light text-primary',
                !active && 'bg-transparent',
                !active && !disabled && 'text-text-neutral',
                !active && disabled && 'text-text-disabled cursor-not-allowed',
              )}
              disabled={disabled}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={navIconSize} className='shrink-0' />
              {isExpanded && <span className='overflow-hidden text-ellipsis'>{label}</span>}
            </button>
          );

          if (!disabled) return item;

          return (
            <Tooltip key={label} label='Coming soon'>
              {item}
            </Tooltip>
          );
        })}
      </nav>

      <div
        className={cx(
          'border-border flex items-center justify-center gap-3 border-t p-2 pt-5',
          forceExpanded && 'gap-3 pt-5',
        )}
      >
        <div
          className={cx(
            'bg-primary text-heading flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold text-white',
            forceExpanded && 'h-12 w-12 text-base',
          )}
        >
          {username.charAt(0)}
        </div>
        {isExpanded && (
          <div className='overflow-hidden'>
            <p
              className={cx(
                'text-heading text-text-default m-0 overflow-hidden text-ellipsis whitespace-nowrap',
                forceExpanded && 'text-heading',
              )}
            >
              {username}
            </p>
            <p
              className={cx(
                'text-body text-text-neutral m-0 whitespace-nowrap',
                forceExpanded && 'text-body',
              )}
            >
              Premium Member
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
