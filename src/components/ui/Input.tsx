import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';

import { cx } from '../../lib/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...rest }: Readonly<InputProps>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className='flex w-full flex-col gap-1.5'>
      {label && (
        <label htmlFor={inputId} className='text-caption text-text-neutral font-medium'>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(
          'rounded-input border-border bg-bg-default text-body text-text-default placeholder:text-text-disabled focus:border-primary focus:bg-surface-card h-11.5 border px-4 transition-[border-color,background,box-shadow] duration-180 ease-in-out focus:shadow-[0_0_0_3px_rgba(5,154,131,0.1)] focus:outline-none',
          error && 'border-negative',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className='text-caption text-negative'>
          {error}
        </span>
      )}
    </div>
  );
}
