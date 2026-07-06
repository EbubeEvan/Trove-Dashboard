import type { ReactNode } from 'react';
import { cx } from '../../lib/classNames';

export type BadgeTone = 'success' | 'negative' | 'pending' | 'neutral';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone, children }: BadgeProps) {
  const toneClasses = {
    success: 'bg-(--color-success-bg) text-(--color-success)',
    negative: 'bg-(--color-negative-bg) text-(--color-negative)',
    pending:
      'border-(--color-pending-border) bg-(--color-pending-bg) text-(--color-pending-text)',
    neutral: 'bg-(--color-bg-default) text-(--color-text-neutral)',
  };

  return (
    <span
      className={cx(
        'inline-flex items-center whitespace-nowrap rounded-(--radius-pill) border border-transparent px-2.5 py-[3px] text-(length:--font-size-caption) font-semibold uppercase tracking-[0.02em]',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  );
}
