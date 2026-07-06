import type { ReactNode } from 'react';
import { AlertTriangle, Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center text-text-neutral"
      role="status"
    >
      <div className="text-text-disabled">{icon ?? <Inbox size={28} />}</div>
      <p className="m-0 text-size-heading font-semibold text-text-default">{title}</p>
      {description && <p className="m-0 max-w-80 text-size-body ">{description}</p>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  description = "We couldn't load this data. Check your connection and try again.",
  onRetry,
}: Readonly<ErrorStateProps>) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 px-4 py-8 text-center text-text-neutral"
      role="alert"
    >
      <div className="text-negative">
        <AlertTriangle size={28} />
      </div>
      <p className="m-0 text-size-heading font-semibold text-text-default">{title}</p>
      <p className="m-0 max-w-80 text-size-body">{description}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-2" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
