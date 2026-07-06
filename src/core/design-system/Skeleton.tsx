import type { CSSProperties } from 'react';
import { cx } from '../../lib/classNames';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: string;
  className?: string;
}

export function Skeleton({ width = '100%', height = '16px', radius, className }: Readonly<SkeletonProps>) {
  const style: CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };
  return (
    <span
      className={cx(
        'block rounded-input bg-[linear-gradient(90deg,var(--color-bg-default)_25%,var(--color-border)_37%,var(--color-bg-default)_63%)] bg-[length:400%_100%] [animation:shimmer_1.4s_ease_infinite] motion-reduce:animate-none motion-reduce:bg-bg-default',
        className,
      )}
      style={style}
      aria-hidden="true"
    />
  );
}
