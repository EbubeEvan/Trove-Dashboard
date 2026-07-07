import { Badge } from '../../../components/design-system/Badge';
import { Card } from '../../../components/design-system/Card';
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

  return (
    <Card padding='compact' className='flex items-center gap-3'>
      <div
        className={cx(
          'bg-primary-light text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-semibold',
          closed && 'bg-bg-default text-text-disabled',
        )}
      >
        {h.ticker.slice(0, 2)}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-size-card-value text-text-default m-0 flex items-center gap-2 font-semibold'>
          {h.ticker}
          {closed && <Badge tone='neutral'>Closed position</Badge>}
        </p>
        <p className='text-size-caption text-text-neutral mt-0.5 mb-0 overflow-hidden text-ellipsis whitespace-nowrap'>
          {h.name}
        </p>
      </div>

      <div className='shrink-0 text-right'>
        <p className='text-size-caption text-text-disabled m-0'>Shares</p>
        <p className='text-size-card-value text-text-default mt-0.5 mb-0'>{h.shares}</p>
      </div>

      <div className='min-w-[90px] shrink-0 text-right'>
        {unavailable ? (
          <p className='text-size-card-value text-text-disabled m-0 font-normal italic'>
            Price unavailable
          </p>
        ) : (
          <p className='text-size-card-value text-text-default m-0 font-semibold'>
            {formatCurrency(currentValue(h), h.currency)}
          </p>
        )}
        {!unavailable && !closed && (
          <p
            className={cx(
              'text-size-caption mt-0.5 mb-0 font-medium',
              isPositive && 'text-success',
              isNegative && 'text-negative',
              !isPositive && !isNegative && 'text-text-disabled',
            )}
          >
            {formatSignedCurrency(amount, h.currency)} ({formatSignedPercent(percent)})
          </p>
        )}
      </div>
    </Card>
  );
}
