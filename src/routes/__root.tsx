import { createRootRoute, Outlet } from '@tanstack/react-router';

import { EmptyState, ErrorState } from '../components/ui/StatusState';

export const Route = createRootRoute({
  errorComponent: ({ error, reset }) => (
    <ErrorState
      title='Something went wrong'
      description={error instanceof Error ? error.message : undefined}
      onRetry={reset}
    />
  ),
  notFoundComponent: () => (
    <EmptyState
      title='Page not found'
      description="The page you're looking for doesn't exist or has been moved."
    />
  ),
  component: () => <Outlet />,
});
