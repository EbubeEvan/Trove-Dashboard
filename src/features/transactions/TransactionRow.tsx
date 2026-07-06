import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Card } from '../../core/design-system/Card';
import { Badge } from '../../core/design-system/Badge';
import type { Transaction } from '../../lib/types';
import { formatCurrency } from '../../lib/derivePortfolio';
import { cx } from '../../lib/classNames';

interface TransactionRowProps {
  transaction: Transaction;
}

const STATUS_TONE = {
  COMPLETED: 'success',
  PENDING: 'pending',
  FAILED: 'negative',
} as const;

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function TransactionRow({ transaction: t }: TransactionRowProps) {
  const isBuy = t.type === 'BUY';
  const failed = t.status === 'FAILED';

  return (
    <Card padding="compact" className="flex items-center gap-3">
      <div
        className={cx(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]',
          isBuy
            ? 'bg-primary-light text-primary'
            : 'bg-negative-bg text-negative',
        )}
      >
        {isBuy ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}
      </div>

      <div className="min-w-0 flex-1">
        <p className="m-0 overflow-hidden text-ellipsis whitespace-nowrap text-size-card-value font-medium text-text-default">
          {isBuy ? 'Buy' : 'Sell'} {t.name}
        </p>
        <p className="mb-0 mt-0.5 text-size-caption text-text-neutral">
          {formatDate(t.date)} &middot; {t.shares} shares
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1 text-right">
        <p
          className={cx(
            'm-0 text-size-card-value font-semibold',
            failed && 'text-text-disabled line-through',
            !failed && isBuy && 'text-text-default',
            !failed && !isBuy && 'text-success',
          )}
        >
          {isBuy ? '−' : '+'}
          {formatCurrency(t.totalAmount)}
        </p>
        <Badge tone={STATUS_TONE[t.status]}>{t.status}</Badge>
      </div>
    </Card>
  );
}
