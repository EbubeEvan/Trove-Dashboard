import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { Sheet } from '../../../components/ui/Sheet';
import { useUiStore } from '../../../stores/ui-store';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: Readonly<DashboardShellProps>) {
  const mobileSheetOpen = useUiStore((s) => s.mobileSheetOpen);
  const setMobileSheetOpen = useUiStore((s) => s.setMobileSheetOpen);
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  const sidebarExpanded = !sidebarCollapsed;
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 901px)').matches);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className='bg-bg-page flex min-h-screen overflow-x-hidden'>
      <div className='hidden min-[901px]:flex min-[901px]:w-0 min-[901px]:shrink-0'>
        <Sidebar />
      </div>

      <Sheet open={mobileSheetOpen} onClose={() => setMobileSheetOpen(false)}>
        <Sidebar
          className='w-full min-w-0'
          forceExpanded
          onClose={() => setMobileSheetOpen(false)}
        />
      </Sheet>

      <div
        className='flex min-w-0 flex-1 flex-col transition-[margin-left] duration-300 ease-out'
        style={
          isDesktop
            ? sidebarExpanded
              ? { marginLeft: 'var(--sidebar-width-expanded)' }
              : { marginLeft: 'var(--sidebar-width-collapsed)' }
            : undefined
        }
      >
        <TopBar />
        <main className='mx-auto box-border w-full max-w-[1240px] flex-1 p-4 sm:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
