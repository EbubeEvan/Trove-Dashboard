import { useEffect } from 'react';
import { LayoutGrid, Receipt, LineChart, Settings, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useUiStore } from '../../core/stores/ui-store';
import { Tooltip } from '../../core/design-system/Tooltip';
import { cx } from '../../lib/classNames';

// Only Dashboard is a real, built view (per brief: a single dashboard view).
// The others are shown -- matching the wireframe's nav -- but disabled with
// a "coming soon" tooltip rather than routed to duplicate or fake content.
// "Portfolio" is intentionally omitted: its content would be identical to
// Dashboard, so listing both as separate items would misrepresent them.
const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutGrid, active: true },
  { label: 'Transactions', icon: Receipt, active: false },
  { label: 'Markets', icon: LineChart, active: false },
  { label: 'Settings', icon: Settings, active: false },
];

export function Sidebar() {
  const collapsed = useUiStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUiStore((s) => s.toggleSidebar);
  const setSidebarCollapsed = useUiStore((s) => s.setSidebarCollapsed);

  // Auto-collapse to the icon-only rail on tablet/mobile widths, but respect
  // a manual toggle afterwards (only reacts to width changes, e.g. rotation).
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 900px)');
    setSidebarCollapsed(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSidebarCollapsed(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <aside
      className={cx(
        'sticky top-0 flex h-screen flex-col border-r border-(--color-border) bg-(--color-surface-card) px-(--space-3) py-(--space-5) transition-[width,min-width] duration-180 ease-in-out',
        collapsed
          ? 'w-(--sidebar-width-collapsed) min-w-(--sidebar-width-collapsed)'
          : 'w-(--sidebar-width-expanded) min-w-(--sidebar-width-expanded)',
      )}
    >
      <div className="mb-(--space-6) flex items-center justify-between px-(--space-2)">
        {!collapsed && <span className="overflow-hidden whitespace-nowrap text-lg font-semibold text-(--color-primary)">Trove</span>}
        <button
          className="flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent p-1.5 text-(--color-text-neutral) transition-colors duration-180 ease-in-out hover:bg-(--color-bg-default)"
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-(--space-1)">
        {NAV_ITEMS.map(({ label, icon: Icon, active }) => {
          const item = (
            <button
              key={label}
              className={cx(
                'flex w-full cursor-pointer items-center gap-(--space-3) overflow-hidden whitespace-nowrap rounded-(--radius-input) border-0 bg-transparent px-(--space-3) py-2.5 text-left text-(length:--font-size-body) font-medium text-(--color-text-neutral) transition-[background,color] duration-180 ease-in-out',
                collapsed && 'justify-center p-2.5',
                active && 'bg-(--color-primary-light) text-(--color-primary)',
                !active && 'cursor-not-allowed text-(--color-text-disabled)',
              )}
              disabled={!active}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={18} />
              {!collapsed && <span className="overflow-hidden text-ellipsis">{label}</span>}
            </button>
          );

          if (active) return item;

          return (
            <Tooltip key={label} label="Coming soon">
              {item}
            </Tooltip>
          );
        })}
      </nav>

      <div className="flex items-center gap-(--space-2) border-t border-(--color-border) p-(--space-2) pt-(--space-4)">
        <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-(--color-primary) text-[13px] font-semibold text-white">
          A
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-(length:--font-size-card-value) text-(--color-text-default)">
              Adaeze Okonkwo
            </p>
            <p className="m-0 whitespace-nowrap text-(length:--font-size-caption) text-(--color-text-neutral)">
              Premium Member
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
