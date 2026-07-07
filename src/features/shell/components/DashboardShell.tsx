import type { ReactNode } from 'react';

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

  return (
    <div className='bg-bg-page flex min-h-screen overflow-x-hidden'>
      <div className='hidden min-[901px]:flex min-[901px]:flex-shrink-0'>
        <Sidebar />
      </div>

      <Sheet open={mobileSheetOpen} onClose={() => setMobileSheetOpen(false)}>
        <Sidebar className='w-full min-w-0' forceExpanded />
      </Sheet>

      <div className='flex min-w-0 flex-1 flex-col'>
        <TopBar />
        <main className='mx-auto box-border w-full max-w-[1240px] flex-1 p-4 sm:p-6'>
          {children}
        </main>
      </div>
    </div>
  );
}
