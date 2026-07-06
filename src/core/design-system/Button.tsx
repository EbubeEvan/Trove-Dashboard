import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/classNames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className,
  disabled,
  ...rest
}: Readonly<ButtonProps>) {
  const variantClasses = {
    primary: 'bg-(--color-primary) text-white hover:enabled:bg-[#048069]',
    secondary:
      'border-(--color-border) bg-(--color-surface-card) text-(--color-text-default) hover:enabled:bg-(--color-bg-default)',
    ghost: 'bg-transparent text-(--color-text-neutral) hover:enabled:bg-(--color-bg-default)',
  };

  return (
    <button
      className={cx(
        'inline-flex h-11 cursor-pointer items-center justify-center gap-(--space-2) rounded-(--radius-input) border border-transparent px-(--space-5) text-(length:--font-size-body) font-semibold transition-[background,border-color,opacity] duration-180 ease-in-out disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          aria-label="Loading"
        />
      ) : (
        children
      )}
    </button>
  );
}
