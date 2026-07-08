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
      <fieldset className='m-0 flex gap-2 border-0 p-0'>
        <legend className='sr-only'>Filter transactions</legend>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={cx(
              'rounded-pill bg-bg-default text-caption text-text-neutral hover:text-primary cursor-pointer border-0 px-3.5 py-1.5 font-medium transition-all duration-180 ease-in-out',
              filter === f && 'bg-primary text-white hover:text-white',
            )}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
          >
            {FILTER_LABEL[f]}
          </button>
        ))}
      </fieldset>

      {filtered.length === 0 ? (
        <EmptyState title='No transactions' description='Nothing matches this filter yet.' />
      ) : (
        <div className='custom-scrollbar flex h-[400px] flex-col gap-3 overflow-y-auto py-1 pr-3 pl-1 sm:h-[480px] xl:h-[534px]'>
          {filtered.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </div>
      )}
    </div>
  );
}
