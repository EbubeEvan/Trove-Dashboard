import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import { Badge } from '../../../components/design-system/Badge';
import { Card } from '../../../components/design-system/Card';
import { cx } from '../../../lib/classNames';
import { formatCurrency } from '../../../lib/derivePortfolio';
import { formatDate } from '../lib/formatDate';
import type { Transaction } from '../types/transaction';

interface TransactionRowProps {
  transaction: Transaction;
}

const STATUS_TONE = {
  COMPLETED: 'success',
  PENDING: 'pending',
  FAILED: 'negative',
} as const;

export function TransactionRow({ transaction: t }: Readonly<TransactionRowProps>) {
  const isBuy = t.type === 'BUY';
  const failed = t.status === 'FAILED';

  return (
    <Card padding='compact' className='flex items-center gap-3'>
      <div
        className={cx(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]',
          isBuy ? 'bg-primary-light text-primary' : 'bg-negative-bg text-negative',
        )}
      >
        {isBuy ? <ArrowDownLeft size={17} /> : <ArrowUpRight size={17} />}
      </div>

      <div className='min-w-0 flex-1'>
        <p className='text-card-value text-text-default m-0 overflow-hidden font-medium text-ellipsis whitespace-nowrap'>
          {isBuy ? 'Buy' : 'Sell'} {t.name}
        </p>
        <p className='text-caption text-text-neutral mt-0.5 mb-0'>
          {formatDate(t.date)} &middot; {t.shares} shares
        </p>
      </div>

      <div className='flex shrink-0 flex-col items-end gap-1 text-right'>
        <p
          className={cx(
            'text-card-value m-0 font-semibold',
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
