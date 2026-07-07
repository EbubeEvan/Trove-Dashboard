import { Card } from '../../core/design-system/Card';
import { useUiStore } from '../../core/stores/ui-store';
import { cx } from '../../lib/classNames';
import type { Holding, Transaction } from '../../lib/types';
import { HoldingsTab } from '../holdings/HoldingsTab';
import { TransactionsTab } from '../transactions/TransactionsTab';

interface HoldingsTransactionsPanelProps {
  holdings: Holding[];
  transactions: Transaction[];
}

export function HoldingsTransactionsPanel({
  holdings,
  transactions,
}: Readonly<HoldingsTransactionsPanelProps>) {
  const activeTab = useUiStore((s) => s.activeTab);
  const setActiveTab = useUiStore((s) => s.setActiveTab);

  return (
    <Card>
      <div
        className='border-border mb-4 flex gap-1 border-b'
        role='tablist'
        aria-label='Holdings and transactions'
      >
        <button
          className={cx(
            'text-size-body text-text-neutral hover:text-text-default relative top-px cursor-pointer border-0 border-b-2 border-solid border-b-transparent bg-transparent px-4 py-3 font-medium transition-colors duration-180 ease-in-out',
            activeTab === 'stocks' && 'border-b-primary text-primary font-semibold',
          )}
          onClick={() => setActiveTab('stocks')}
          role='tab'
          aria-selected={activeTab === 'stocks'}
        >
          Stocks
        </button>
        <button
          className={cx(
            'text-size-body text-text-neutral hover:text-text-default relative top-px cursor-pointer border-0 border-b-2 border-solid border-b-transparent bg-transparent px-4 py-3 font-medium transition-colors duration-180 ease-in-out',
            activeTab === 'orders' && 'border-b-primary text-primary font-semibold',
          )}
          onClick={() => setActiveTab('orders')}
          role='tab'
          aria-selected={activeTab === 'orders'}
        >
          Orders
        </button>
      </div>

      {activeTab === 'stocks' ? (
        <HoldingsTab holdings={holdings} />
      ) : (
        <TransactionsTab transactions={transactions} />
      )}
    </Card>
  );
}
