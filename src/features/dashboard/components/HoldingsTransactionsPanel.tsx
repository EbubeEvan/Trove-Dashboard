import { Card } from '../../../components/ui/Card';
import { HoldingsTab } from '../../holdings/components/HoldingsTab';
import type { Holding } from '../../holdings/types/holding';
import { TransactionsTab } from '../../transactions/components/TransactionsTab';
import type { Transaction } from '../../transactions/types/transaction';

interface HoldingsTransactionsPanelProps {
  holdings: Holding[];
  transactions: Transaction[];
}

export function HoldingsTransactionsPanel({
  holdings,
  transactions,
}: Readonly<HoldingsTransactionsPanelProps>) {
  return (
    <div className='grid grid-cols-1 items-stretch gap-5 xl:grid-cols-[1.1fr_0.9fr]'>
      <Card>
        <h3 className='text-heading text-text-default mt-0 mb-0 font-semibold'>Holdings</h3>

        <HoldingsTab holdings={holdings} />
      </Card>

      <Card>
        <h3 className='text-heading text-text-default mt-0 mb-0 font-semibold'>
          Recent Transactions
        </h3>

        <TransactionsTab transactions={transactions} />
      </Card>
    </div>
  );
}
