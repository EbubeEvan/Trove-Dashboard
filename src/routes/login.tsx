import { createFileRoute, redirect } from '@tanstack/react-router';

import { useAuthStore } from '../core/stores/auth-store';
import { LoginPage } from '../features/auth/components/LoginPage';

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: LoginPage,
});
