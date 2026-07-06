import { Card } from '../../core/design-system/Card';
import { useUiStore } from '../../core/stores/ui-store';
import type { Holding, Transaction } from '../../lib/types';
import { HoldingsTab } from '../holdings/HoldingsTab';
import { TransactionsTab } from '../transactions/TransactionsTab';
import { cx } from '../../lib/classNames';

interface HoldingsTransactionsPanelProps {
  holdings: Holding[];
  transactions: Transaction[];
}

export function HoldingsTransactionsPanel({ holdings, transactions }: Readonly<HoldingsTransactionsPanelProps>) {
  const activeTab = useUiStore((s) => s.activeTab);
  const setActiveTab = useUiStore((s) => s.setActiveTab);

  return (
    <Card>
      <div className="mb-4 flex gap-1 border-b border-border" role="tablist" aria-label="Holdings and transactions">
        <button
          className={cx(
            'relative top-px cursor-pointer border-0 border-b-2 border-solid border-b-transparent bg-transparent px-4 py-3 text-size-body font-medium text-text-neutral transition-colors duration-180 ease-in-out hover:text-text-default',
            activeTab === 'stocks' && 'border-b-primary font-semibold text-primary',
          )}
          onClick={() => setActiveTab('stocks')}
          role="tab"
          aria-selected={activeTab === 'stocks'}
        >
          Stocks
        </button>
        <button
          className={cx(
            'relative top-px cursor-pointer border-0 border-b-2 border-solid border-b-transparent bg-transparent px-4 py-3 text-size-body font-medium text-text-neutral transition-colors duration-180 ease-in-out hover:text-text-default',
            activeTab === 'orders' && 'border-b-primary font-semibold text-primary',
          )}
          onClick={() => setActiveTab('orders')}
          role="tab"
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
