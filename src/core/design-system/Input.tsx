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
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-size-caption font-medium text-text-neutral">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(
          'h-11.5 rounded-input border border-border bg-bg-default px-4 text-size-body text-text-default transition-[border-color,background] duration-180 ease-in-out placeholder:text-text-disabled focus:border-primary focus:bg-surface-card focus:outline-none',
          error && 'border-negative',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-size-caption text-negative">
          {error}
        </span>
      )}
    </div>
  );
}
