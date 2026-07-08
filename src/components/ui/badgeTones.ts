export const BADGE_TONE_CLASSES = {
  success: 'border-transparent bg-success-bg text-success',
  negative: 'border-transparent bg-negative-bg text-negative',
  pending: 'border-pending-border bg-pending-bg text-pending-text',
  neutral: 'border-transparent bg-bg-default text-text-neutral',
} as const;

export type BadgeTone = keyof typeof BADGE_TONE_CLASSES;
