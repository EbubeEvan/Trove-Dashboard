import {
  LayoutGrid,
  LineChart,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Settings,
} from 'lucide-react';
import { useEffect } from 'react';

import { Tooltip } from '../../../components/ui/Tooltip';
import { cx } from '../../../lib/classNames';
import { useUiStore } from '../../../stores/ui-store';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, active: true },
  { label: 'Transactions', icon: Receipt, active: false },
  { label: 'Markets', icon: LineChart, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

interface SidebarProps {
  className?: string;
  forceExpanded?: boolean;
}

export function Sidebar({ className, forceExpanded }: Readonly<SidebarProps>) {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);

  const isExpanded = forceExpanded || !collapsed;

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
        'border-border bg-surface-card flex flex-col border-r px-3 py-5 transition-[width,min-width] duration-180 ease-in-out',
        isExpanded
          ? 'w-sidebar-width-expanded min-w-sidebar-width-expanded'
          : 'w-sidebar-width-collapsed min-w-sidebar-width-collapsed',
        className,
      )}
    >
      <div className='mb-6 flex items-center justify-between px-2'>
        {isExpanded && (
          <span className='text-primary overflow-hidden text-lg font-semibold whitespace-nowrap'>
            Trove
          </span>
        )}
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

      <nav className='flex flex-1 flex-col gap-1'>
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => {
          const item = (
            <button
              key={label}
              className={cx(
                'rounded-input text-body text-text-neutral flex w-full cursor-pointer items-center gap-3 overflow-hidden border-0 bg-transparent px-3 py-2.5 text-left font-medium whitespace-nowrap transition-[background,color] duration-180 ease-in-out',
                !isExpanded && 'justify-center p-2.5',
                active && 'bg-primary-light text-primary',
                !active && 'text-text-disabled cursor-not-allowed',
              )}
              disabled={!active}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} />
              {isExpanded && <span className='overflow-hidden text-ellipsis'>{label}</span>}
            </button>
          );

          if (active) return item;

          return (
            <Tooltip key={label} label='Coming soon'>
              {item}
            </Tooltip>
          );
        })}
      </nav>

      <div className='border-border flex items-center gap-2 border-t p-2 pt-4'>
        <div className='bg-primary flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-[13px] font-semibold text-white'>
          A
        </div>
        {isExpanded && (
          <div className='overflow-hidden'>
            <p className='text-card-value text-text-default m-0 overflow-hidden text-ellipsis whitespace-nowrap'>
              Adaeze Okonkwo
            </p>
            <p className='text-caption text-text-neutral m-0 whitespace-nowrap'>Premium Member</p>
          </div>
        )}
      </div>
    </aside>
  );
}
