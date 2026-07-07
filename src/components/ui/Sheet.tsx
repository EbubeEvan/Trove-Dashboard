import type { ReactNode } from 'react';
import { useCallback, useEffect, useRef } from 'react';

import { cx } from '../../lib/classNames';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'left' | 'right';
}

export function Sheet({ open, onClose, children, side = 'left' }: Readonly<SheetProps>) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div
      className={cx('fixed inset-0 z-50', open ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!open}
    >
      <div
        className={cx(
          'absolute inset-0 bg-black/50 transition-opacity duration-200 ease-in-out',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
        aria-hidden='true'
      />

      <div
        ref={panelRef}
        role='dialog'
        aria-modal='true'
        aria-label='Navigation menu'
        className={cx(
          'bg-surface-card absolute top-0 h-full w-[280px] max-w-[85vw] shadow-lg transition-transform duration-200 ease-in-out',
          side === 'left' ? 'left-0' : 'right-0',
          open ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full',
        )}
      >
        {children}
      </div>
    </div>
  );
}
