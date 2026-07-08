import { type ReactNode, useCallback, useRef, useState } from 'react';

import { cx } from '../../lib/classNames';

type TooltipSide = 'left' | 'right';

interface TooltipProps {
  label: string;
  children: ReactNode;
  fullWidth?: boolean;
}

export function Tooltip({ label, children, fullWidth = false }: Readonly<TooltipProps>) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const [side, setSide] = useState<TooltipSide>('right');

  const updateSide = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const spaceLeft = rect.left;
    const spaceRight = window.innerWidth - rect.right;
    setSide(spaceRight >= spaceLeft ? 'right' : 'left');
  }, []);

  return (
    <span
      ref={triggerRef}
      className={cx('group relative inline-flex', fullWidth && 'w-full')}
      onMouseEnter={updateSide}
      onFocusCapture={updateSide}
    >
      {children}
      <span
        className={cx(
          'bg-dark-blue text-caption pointer-events-none absolute top-1/2 z-20 -translate-y-1/2 rounded-lg px-2.5 py-1.5 font-medium whitespace-nowrap text-white opacity-0 transition-[opacity,transform] duration-180 ease-in-out group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100',
          side === 'right'
            ? 'left-[calc(100%+10px)] -translate-x-1'
            : 'right-[calc(100%+10px)] translate-x-1',
        )}
        role='tooltip'
      >
        {label}
      </span>
    </span>
  );
}
