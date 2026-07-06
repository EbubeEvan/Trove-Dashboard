import type { ReactNode } from 'react';
import { cx } from '../../lib/classNames';

export type BadgeTone = 'success' | 'negative' | 'pending' | 'neutral';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone, children }: BadgeProps) {
  const toneClasses = {
    success: 'bg-success-bg text-success',
    negative: 'bg-negative-bg text-negative',
    pending:
      'border-pending-border bg-pending-bg text-pending-text',
    neutral: 'bg-bg-default text-text-neutral',
  };

  return (
    <span
      className={cx(
        'inline-flex items-center whitespace-nowrap rounded-pill border border-transparent px-2.5 py-[3px] text-size-caption font-semibold uppercase tracking-[0.02em]',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
