import { Search } from 'lucide-react';

import { EmptyState } from '../../core/design-system/StatusState';
import { useUiStore } from '../../core/stores/ui-store';
import { cx } from '../../lib/classNames';
import { filterHoldings, getSectors } from '../../lib/derivePortfolio';
import type { Holding } from '../../lib/types';
import { HoldingCard } from './HoldingCard';

interface HoldingsTabProps {
  holdings: Holding[];
}

export function HoldingsTab({ holdings }: Readonly<HoldingsTabProps>) {
  const search = useUiStore((s) => s.holdingsSearch);
  const setSearch = useUiStore((s) => s.setHoldingsSearch);
  const sector = useUiStore((s) => s.holdingsSectorFilter);
  const setSector = useUiStore((s) => s.setHoldingsSectorFilter);

  const sectors = ['All', ...getSectors(holdings)];
  const filtered = filterHoldings(holdings, search, sector);

  return (
    <div>
      <div className='mb-4 flex flex-col gap-3'>
        <div className='relative'>
          <Search
            size={16}
            className='text-text-disabled pointer-events-none absolute top-1/2 left-3 -translate-y-1/2'
          />
          <input
            className='rounded-input border-border bg-bg-default text-size-body text-text-default placeholder:text-text-disabled focus:border-primary w-full border py-2.5 pr-3 pl-[38px] transition-colors duration-180 ease-in-out outline-none'
            placeholder='Search by ticker or company name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label='Search holdings'
          />
        </div>

        <div className='flex flex-wrap gap-2' role='tablist' aria-label='Filter by sector'>
          {sectors.map((s) => (
            <button
              key={s}
              className={cx(
                'rounded-pill border-border bg-surface-card text-size-caption text-text-neutral hover:border-primary hover:text-primary cursor-pointer border px-3 py-1.5 font-medium whitespace-nowrap transition-all duration-180 ease-in-out',
                sector === s && 'border-primary bg-primary text-white hover:text-white',
              )}
              onClick={() => setSector(s)}
              role='tab'
              aria-selected={sector === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title='No holdings match'
          description='Try a different search term or clear the sector filter.'
        />
      ) : (
        <div className='flex max-h-[460px] flex-col gap-3 overflow-y-auto'>
          {filtered.map((h) => (
            <HoldingCard key={h.id} holding={h} />
          ))}
        </div>
      )}
    </div>
  );
}
