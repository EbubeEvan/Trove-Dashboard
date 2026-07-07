import { AlertTriangle, Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from './Button';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export function EmptyState({ icon, title, description }: Readonly<EmptyStateProps>) {
  return (
    <div
      className='text-text-neutral flex flex-col items-center justify-center gap-3 px-4 py-8 text-center'
      role='status'
    >
      <div className='text-text-disabled'>{icon ?? <Inbox size={28} />}</div>
      <p className='text-size-heading text-text-default m-0 font-semibold'>{title}</p>
      {description && <p className='text-size-body m-0 max-w-80'>{description}</p>}
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
      className='text-text-neutral flex flex-col items-center justify-center gap-3 px-4 py-8 text-center'
      role='alert'
    >
      <div className='text-negative'>
        <AlertTriangle size={28} />
      </div>
      <p className='text-size-heading text-text-default m-0 font-semibold'>{title}</p>
      <p className='text-size-body m-0 max-w-80'>{description}</p>
      {onRetry && (
        <Button variant='secondary' className='mt-2' onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}
