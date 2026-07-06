import { createFileRoute, redirect } from '@tanstack/react-router';
import { useAuthStore } from '../core/stores/auth-store';
import { DashboardShell } from '../features/shell/DashboardShell';
import { DashboardPage } from '../features/dashboard/DashboardPage';

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
