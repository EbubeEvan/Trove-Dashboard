import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import { Badge } from '../../../components/ui/Badge';
import { Card } from '../../../components/ui/Card';
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
    <Card
      padding='compact'
      className='flex min-h-[64px] shrink-0 flex-wrap items-center gap-3 sm:flex-nowrap'
    >
      <div
        className={cx(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
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

      <div className='border-border flex w-full flex-row-reverse items-center justify-between gap-4 border-t pt-3 sm:w-auto sm:flex-col sm:items-end sm:justify-normal sm:gap-1 sm:border-t-0 sm:pt-0'>
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
