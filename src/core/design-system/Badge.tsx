import type { ReactNode } from 'react';

import { cx } from '../../lib/classNames';

export type BadgeTone = 'success' | 'negative' | 'pending' | 'neutral';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone, children }: Readonly<BadgeProps>) {
  const toneClasses = {
    success: 'bg-success-bg text-success',
    negative: 'bg-negative-bg text-negative',
    pending: 'border-pending-border bg-pending-bg text-pending-text',
    neutral: 'bg-bg-default text-text-neutral',
  };

  return (
    <span
      className={cx(
        'rounded-pill text-size-caption inline-flex items-center border border-transparent px-2.5 py-[3px] font-semibold tracking-[0.02em] whitespace-nowrap uppercase',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
