import { ErrorState } from '../../../components/design-system/StatusState';
import { usePortfolio } from '../../../hooks/usePortfolio';
import { AccountList } from '../../accounts/components/AccountList';
import { AllocationBar } from '../../allocation/components/AllocationBar';
import { NetWorthCard } from '../../net-worth/components/NetWorthCard';
import { DashboardSkeleton } from './DashboardSkeleton';
import { HoldingsTransactionsPanel } from './HoldingsTransactionsPanel';

export function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = usePortfolio();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Couldn't load your portfolio"
        description='Something went wrong pulling your holdings and transactions. Please try again.'
        onRetry={() => refetch()}
      />
    );
  }

  const { holdings, transactions, user } = data;

  return (
    <div className='flex flex-col gap-5' style={{ opacity: isFetching ? 0.7 : 1 }}>
      <div className='grid grid-cols-[1.2fr_1fr] items-stretch gap-5 max-[900px]:grid-cols-1'>
        <NetWorthCard holdings={holdings} currency='USD' />
        <AllocationBar holdings={holdings} />
      </div>

      <div>
        <h2 className='text-heading text-text-default mt-0 mb-3 font-semibold'>Accounts</h2>
        <AccountList holdings={holdings} currency='USD' />
      </div>

      <HoldingsTransactionsPanel holdings={holdings} transactions={transactions} />

      <p className='text-caption text-text-disabled text-center'>
        Last updated {new Date(user.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
