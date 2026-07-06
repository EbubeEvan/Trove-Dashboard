import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: Readonly<DashboardShellProps>) {
  return (
    <div className="flex min-h-screen bg-(--color-bg-page)">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="mx-auto box-border w-full max-w-[1240px] flex-1 p-(--space-6) max-[900px]:p-(--space-4) max-[640px]:p-(--space-3)">
          {children}
        </main>
      </div>
    </div>
  );
}
