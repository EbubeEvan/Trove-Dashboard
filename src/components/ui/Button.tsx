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
    primary: 'bg-primary text-white hover:enabled:bg-[#048069]',
    secondary: 'border-border bg-surface-card text-text-default hover:enabled:bg-bg-default',
    ghost:
      'bg-transparent text-text-neutral hover:enabled:bg-bg-default disabled:text-text-disabled',
  };

  return (
    <button
      className={cx(
        'rounded-input text-body inline-flex h-11 cursor-pointer items-center justify-center gap-2 border border-transparent px-5 font-semibold transition-[background,border-color,opacity] duration-180 ease-in-out disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <span
          className='h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white'
          aria-label='Loading'
        />
      ) : (
        children
      )}
    </button>
  );
}
