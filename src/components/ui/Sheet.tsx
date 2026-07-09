import type { ReactNode } from 'react';
import { useCallback, useEffect } from 'react';

import { cx } from '../../lib/classNames';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: 'left' | 'right';
}

export function Sheet({ open, onClose, children, side = 'left' }: Readonly<SheetProps>) {
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
        className='absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out'
        style={{ opacity: open ? 1 : 0 }}
        onClick={onClose}
        aria-hidden='true'
      />

      <div
        aria-label='Navigation menu'
        className={cx(
          'bg-surface-card top-0 right-auto left-0 h-full w-84 max-w-[92vw] border-0 p-0 shadow-lg transition-[transform] duration-300 ease-out',
          side === 'left' ? 'left-0' : 'right-0 left-auto',
        )}
        style={{
          transform: open
            ? 'translateX(0)'
            : side === 'left'
              ? 'translateX(-100%)'
              : 'translateX(100%)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
