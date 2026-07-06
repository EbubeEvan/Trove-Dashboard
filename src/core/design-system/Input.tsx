import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';
import { cx } from '../../lib/classNames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, id, className, ...rest }: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-(length:--font-size-caption) font-medium text-(--color-text-neutral)">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cx(
          'h-11.5 rounded-(--radius-input) border border-(--color-border) bg-(--color-bg-default) px-(--space-4) text-(length:--font-size-body) text-(--color-text-default) transition-[border-color,background] duration-180 ease-in-out placeholder:text-(--color-text-disabled) focus:border-(--color-primary) focus:bg-(--color-surface-card) focus:outline-none',
          error && 'border-(--color-negative)',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...rest}
      />
      {error && (
        <span id={`${inputId}-error`} className="text-(length:--font-size-caption) text-(--color-negative)">
          {error}
        </span>
      )}
    </div>
  );
}
