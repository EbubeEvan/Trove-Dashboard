import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'default' | 'compact' | 'none';
}

export function Card({ children, padding = 'default', className, ...rest }: CardProps) {
  const paddingClasses = {
    default: 'p-(--space-6)',
    compact: 'p-(--space-4)',
    none: 'p-0',
  };

  return (
    <div
      className={cx(
        'rounded-(--radius-card) border border-(--color-border) bg-(--color-surface-card) shadow-(--shadow-card) transition-shadow duration-180 ease-in-out',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
