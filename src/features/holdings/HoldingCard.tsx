import { Card } from '../../core/design-system/Card';
import { Badge } from '../../core/design-system/Badge';
import type { Holding } from '../../lib/types';
import {
  currentValue,
  gainLoss,
  formatCurrency,
  formatSignedCurrency,
  formatSignedPercent,
  hasUnavailablePrice,
  isClosedPosition,
} from '../../lib/derivePortfolio';
import { cx } from '../../lib/classNames';

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
    <Card padding="compact" className="flex items-center gap-3">
      <div
        className={cx(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-[13px] font-semibold text-primary',
          closed && 'bg-bg-default text-text-disabled',
        )}
      >
        {h.ticker.slice(0, 2)}
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 flex items-center gap-2 text-size-card-value font-semibold text-text-default">
          {h.ticker}
          {closed && (
            <Badge tone="neutral">Closed position</Badge>
          )}
        </p>
        <p className="mb-0 mt-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-size-caption text-text-neutral">
          {h.name}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="m-0 text-size-caption text-text-disabled">Shares</p>
        <p className="mb-0 mt-0.5 text-size-card-value text-text-default">{h.shares}</p>
      </div>

      <div className="min-w-[90px] shrink-0 text-right">
        {unavailable ? (
          <p className="m-0 text-size-card-value font-normal italic text-text-disabled">
            Price unavailable
          </p>
        ) : (
          <p className="m-0 text-size-card-value font-semibold text-text-default">
            {formatCurrency(currentValue(h), h.currency)}
          </p>
        )}
        {!unavailable && !closed && (
          <p
            className={cx(
              'mb-0 mt-0.5 text-size-caption font-medium',
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
