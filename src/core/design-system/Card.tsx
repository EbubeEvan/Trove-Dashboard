import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/classNames';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: 'default' | 'compact' | 'none';
}

export function Card({ children, padding = 'default', className, ...rest }: Readonly<CardProps>) {
  const paddingClasses = {
    default: 'p-6',
    compact: 'p-4',
    none: 'p-0',
  };

  return (
    <div
      className={cx(
        'rounded-card border border-border bg-surface-card shadow-card transition-shadow duration-180 ease-in-out',
        paddingClasses[padding],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
