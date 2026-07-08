import type { ReactNode } from 'react';

import { cx } from '../../lib/classNames';
import { BADGE_TONE_CLASSES, type BadgeTone } from './badgeTones.ts';

interface BadgeProps {
  tone: BadgeTone;
  children: ReactNode;
}

export function Badge({ tone, children }: Readonly<BadgeProps>) {
  return (
    <span
      className={cx(
        'rounded-pill text-caption inline-flex items-center border px-2.5 py-0.75 font-semibold tracking-[0.02em] whitespace-nowrap uppercase',
        BADGE_TONE_CLASSES[tone],
      )}
    >
      {children}
    </span>
  );
}
