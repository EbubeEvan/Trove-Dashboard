import { EmptyState } from '../../../components/ui/StatusState';
import { cx } from '../../../lib/classNames';
import { useUiStore } from '../../../stores/ui-store';
import { filterTransactions, sortTransactionsByDateDesc } from '../lib/transactionFilters';
import type { Transaction } from '../types/transaction';
import type { TransactionFilter } from '../types/transactionFilter';
import { TransactionRow } from './TransactionRow';

interface TransactionsTabProps {
  transactions: Transaction[];
}

const FILTERS: TransactionFilter[] = ['All', 'BUY', 'SELL'];
const FILTER_LABEL: Record<string, string> = { All: 'All', BUY: 'Buy', SELL: 'Sell' };

export function TransactionsTab({ transactions }: Readonly<TransactionsTabProps>) {
  const filter = useUiStore((s) => s.transactionFilter);
  const setFilter = useUiStore((s) => s.setTransactionFilter);

  const filtered = sortTransactionsByDateDesc(filterTransactions(transactions, filter));

  return (
    <div className='mt-4 flex flex-col gap-4'>
      <div className='flex gap-2' role='tablist' aria-label='Filter transactions'>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={cx(
              'rounded-pill bg-bg-default text-caption text-text-neutral hover:text-primary cursor-pointer border-0 px-3.5 py-1.5 font-medium transition-all duration-180 ease-in-out',
              filter === f && 'bg-primary text-white hover:text-white',
            )}
            onClick={() => setFilter(f)}
            role='tab'
            aria-selected={filter === f}
          >
            {FILTER_LABEL[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState title='No transactions' description='Nothing matches this filter yet.' />
      ) : (
        <div className='flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-1'>
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
