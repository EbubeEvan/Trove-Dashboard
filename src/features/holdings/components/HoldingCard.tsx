import { Badge } from '../../../components/ui/Badge';
import { BADGE_TONE_CLASSES } from '../../../components/ui/badgeTones.ts';
import { Card } from '../../../components/ui/Card';
import { cx } from '../../../lib/classNames';
import {
  currentValue,
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
  hasUnavailablePrice,
  isClosedPosition,
} from '../../../lib/derivePortfolio';
import { gainLoss } from '../lib/holdingMetrics';
import type { Holding } from '../types/holding';

interface HoldingCardProps {
  holding: Holding;
}

export function HoldingCard({ holding: h }: Readonly<HoldingCardProps>) {
  const closed = isClosedPosition(h);
  const unavailable = hasUnavailablePrice(h);
  const { amount, percent } = gainLoss(h);
  const isPositive = amount > 0;
  const isNegative = amount < 0;
  let squareTone = 'border-transparent bg-primary-light text-primary';

  if (isNegative) {
    squareTone = BADGE_TONE_CLASSES.negative;
  }

  if (closed || unavailable) {
    squareTone = BADGE_TONE_CLASSES.neutral;
  }

  return (
    <Card
      padding='compact'
      className='flex min-h-16 shrink-0 flex-wrap items-center gap-3 sm:flex-nowrap'
    >
      <div
        className={cx(
          'text-body flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border font-semibold',
          squareTone,
        )}
      >
        {h.ticker.slice(0, 2)}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-card-value text-text-default m-0 flex flex-wrap items-center gap-2 font-semibold'>
          {h.ticker}
          {closed && <Badge tone='neutral'>Closed position</Badge>}
        </p>
        <p className='text-caption text-text-neutral mt-0.5 mb-0 overflow-hidden text-ellipsis whitespace-nowrap'>
          {h.name}
        </p>
      </div>

      <div className='border-border flex w-full items-center justify-between gap-4 border-t pt-3 sm:w-auto sm:justify-end sm:gap-6 sm:border-t-0 sm:pt-0'>
        <div className='shrink-0 text-right'>
          <p className='text-caption text-text-disabled m-0'>Shares</p>
          <p className='text-card-value text-text-default mt-0.5 mb-0 text-center'>{h.shares}</p>
        </div>

        <div className='min-w-22.5 shrink-0 text-right'>
          {unavailable ? (
            <p className='text-card-value text-text-disabled m-0 font-normal italic'>
              Price unavailable
            </p>
          ) : (
            <p className='text-card-value text-text-default m-0 font-semibold'>
              {formatCurrency(currentValue(h), h.currency)}
            </p>
          )}
          {!unavailable && !closed && (
            <p
              className={cx(
                'text-caption mt-0.5 mb-0 font-medium',
                isPositive && 'text-success',
                isNegative && 'text-negative',
                !isPositive && !isNegative && 'text-text-disabled',
              )}
            >
              {formatSignedCurrency(amount, h.currency)} ({formatSignedPercent(percent)})
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
