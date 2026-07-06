import { usePortfolio } from '../../core/hooks/usePortfolio';
import { NetWorthCard } from '../net-worth/NetWorthCard';
import { AllocationBar } from '../allocation/AllocationBar';
import { AccountList } from '../accounts/AccountList';
import { HoldingsTransactionsPanel } from './HoldingsTransactionsPanel';
import { DashboardSkeleton } from './DashboardSkeleton';
import { ErrorState } from '../../core/design-system/StatusState';

export function DashboardPage() {
  const { data, isLoading, isError, refetch, isFetching } = usePortfolio();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Couldn't load your portfolio"
        description="Something went wrong pulling your holdings and transactions. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const { holdings, transactions, user } = data;

  return (
    <div className="flex flex-col gap-(--space-5)" style={{ opacity: isFetching ? 0.7 : 1 }}>
      <div className="grid grid-cols-[1.2fr_1fr] items-stretch gap-(--space-5) max-[900px]:grid-cols-1">
        <NetWorthCard holdings={holdings} currency="USD" />
        <AllocationBar holdings={holdings} />
      </div>

      <div>
        <h2 className="mb-(--space-3) mt-0 text-(length:--font-size-heading) font-semibold text-(--color-text-default)">
          Accounts
        </h2>
        <AccountList holdings={holdings} currency="USD" />
      </div>

      <HoldingsTransactionsPanel holdings={holdings} transactions={transactions} />

      <p className="text-center text-(length:--font-size-caption) text-(--color-text-disabled)">
        Last updated {new Date(user.lastUpdated).toLocaleString()}
      </p>
    </div>
  );
}
