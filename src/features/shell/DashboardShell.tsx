import type { ReactNode } from 'react';

import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: Readonly<DashboardShellProps>) {
  return (
    <div className='bg-bg-page flex min-h-screen'>
      <Sidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <TopBar />
        <main className='mx-auto box-border w-full max-w-[1240px] flex-1 p-6 max-[900px]:p-4 max-[640px]:p-3'>
          {children}
        </main>
      </div>
    </div>
  );
}
