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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-(--space-4)">
      {groups.map((g) => (
        <Card key={g.category} padding="compact">
          <p className="mb-(--space-1) mt-0 text-(length:--font-size-card-value) font-semibold text-(--color-text-default)">
            {g.category}
          </p>
          <p className="mb-(--space-3) mt-0 text-(length:--font-size-caption) text-(--color-text-neutral)">
            {g.positions} {g.positions === 1 ? 'position' : 'positions'}
          </p>
          <p className="m-0 text-xl font-semibold text-(--color-text-default)">
            {formatCurrency(g.totalValue, currency)}
          </p>
        </Card>
      ))}
    </div>
  );
}
