import { Card } from '../../../components/ui/Card';
import { cx } from '../../../lib/classNames';
import { useUiStore } from '../../../stores/ui-store';
import { HoldingsTab } from '../../holdings/components/HoldingsTab';
import type { Holding } from '../../holdings/types/holding';
import { TransactionsTab } from '../../transactions/components/TransactionsTab';
import type { Transaction } from '../../transactions/types/transaction';

interface HoldingsTransactionsPanelProps {
  holdings: Holding[];
  transactions: Transaction[];
}

const TABS = [
  { key: 'holdings' as const, label: 'Stocks' },
  { key: 'recentTransactions' as const, label: 'Orders' },
];

export function HoldingsTransactionsPanel({
  holdings,
  transactions,
}: Readonly<HoldingsTransactionsPanelProps>) {
  const activeTab = useUiStore((s) => s.activeTab);
  const setActiveTab = useUiStore((s) => s.setActiveTab);

  return (
    <Card className='flex flex-col overflow-hidden max-[640px]:h-140 min-[641px]:max-[900px]:h-160 min-[901px]:overflow-visible'>
      <div className='flex items-center gap-2'>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={cx(
              'rounded-pill text-caption sm:text-body cursor-pointer border-0 px-4 py-1.5 font-medium transition-all duration-180 ease-in-out active:scale-95 sm:px-6 sm:py-2.5',
              activeTab === tab.key
                ? 'bg-primary text-white hover:text-white'
                : 'bg-bg-default text-text-neutral hover:text-primary',
            )}
            onClick={() => setActiveTab(tab.key)}
            aria-pressed={activeTab === tab.key}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'holdings' ? (
        <div key={activeTab} className='animate-[fadeIn_300ms_ease-out]'>
          <HoldingsTab holdings={holdings} />
        </div>
      ) : (
        <div key={activeTab} className='animate-[fadeIn_300ms_ease-out]'>
          <TransactionsTab transactions={transactions} />
        </div>
      )}
    </Card>
  );
}
