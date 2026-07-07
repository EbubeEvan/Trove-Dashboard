import { Card } from '../../../components/design-system/Card';
import { EmptyState } from '../../../components/design-system/StatusState';
import { formatCurrency } from '../../../lib/derivePortfolio';
import { computeAccountGroups } from '../lib/computeAccountGroups';
import type { AccountHolding } from '../types/account';

interface AccountListProps {
  holdings: AccountHolding[];
  currency: string;
}

export function AccountList({ holdings, currency }: Readonly<AccountListProps>) {
  const groups = computeAccountGroups(holdings);

  if (groups.length === 0) {
    return (
      <EmptyState
        title='No accounts yet'
        description="Once you hold an active position, it'll be grouped here by sector."
      />
    );
  }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4'>
      {groups.map((g) => (
        <Card key={g.category} padding='compact'>
          <p className='text-size-card-value text-text-default mt-0 mb-1 font-semibold'>
            {g.category}
          </p>
          <p className='text-size-caption text-text-neutral mt-0 mb-3'>
            {g.positions} {g.positions === 1 ? 'position' : 'positions'}
          </p>
          <p className='text-text-default m-0 text-xl font-semibold'>
            {formatCurrency(g.totalValue, currency)}
          </p>
        </Card>
      ))}
    </div>
  );
}
