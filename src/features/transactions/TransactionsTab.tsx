import { useUiStore } from '../../core/stores/ui-store';
import { EmptyState } from '../../core/design-system/StatusState';
import type { Transaction } from '../../lib/types';
import { filterTransactions, sortTransactionsByDateDesc } from '../../lib/derivePortfolio';
import { TransactionRow } from './TransactionRow';
import { cx } from '../../lib/classNames';

interface TransactionsTabProps {
  transactions: Transaction[];
}

const FILTERS: Array<'All' | 'BUY' | 'SELL'> = ['All', 'BUY', 'SELL'];
const FILTER_LABEL: Record<string, string> = { All: 'All', BUY: 'Buy', SELL: 'Sell' };

export function TransactionsTab({ transactions }: Readonly<TransactionsTabProps>) {
  const filter = useUiStore((s) => s.transactionFilter);
  const setFilter = useUiStore((s) => s.setTransactionFilter);

  const filtered = sortTransactionsByDateDesc(filterTransactions(transactions, filter));

  return (
    <div>
      <div className="mb-4 flex gap-2" role="tablist" aria-label="Filter transactions">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={cx(
              'cursor-pointer rounded-pill border border-border bg-surface-card px-3 py-1.5 text-size-caption font-medium text-text-neutral transition-all duration-180 ease-in-out hover:border-primary hover:text-primary',
              filter === f && 'border-primary bg-primary text-white hover:text-white',
            )}
            onClick={() => setFilter(f)}
            role="tab"
            aria-selected={filter === f}
          >
            {FILTER_LABEL[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No transactions" description="Nothing matches this filter yet." />
      ) : (
        <div className="flex max-h-[460px] flex-col gap-3 overflow-y-auto">
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
