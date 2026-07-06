import { Card } from '../../core/design-system/Card';
import { EmptyState } from '../../core/design-system/StatusState';
import type { Holding } from '../../lib/types';
import { computeAccountGroups, formatCurrency } from '../../lib/derivePortfolio';

interface AccountListProps {
  holdings: Holding[];
  currency: string;
}

export function AccountList({ holdings, currency }: AccountListProps) {
  const groups = computeAccountGroups(holdings);

  if (groups.length === 0) {
    return (
      <EmptyState
        title="No accounts yet"
        description="Once you hold an active position, it'll be grouped here by sector."
      />
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
      {groups.map((g) => (
        <Card key={g.category} padding="compact">
          <p className="mb-1 mt-0 text-size-card-value font-semibold text-text-default">
            {g.category}
          </p>
          <p className="mb-3 mt-0 text-size-caption text-text-neutral">
            {g.positions} {g.positions === 1 ? 'position' : 'positions'}
          </p>
          <p className="m-0 text-xl font-semibold text-text-default">
            {formatCurrency(g.totalValue, currency)}
          </p>
        </Card>
      ))}
    </div>
  );
}
