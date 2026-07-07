import { createFileRoute, redirect } from '@tanstack/react-router';

import { DashboardPage } from '../features/dashboard/components/DashboardPage';
import { DashboardShell } from '../features/shell/components/DashboardShell';
import { useAuthStore } from '../stores/auth-store';

export const Route = createFileRoute('/dashboard')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
  component: () => (
    <DashboardShell>
      <DashboardPage />
    </DashboardShell>
  ),
});
