import { Search } from 'lucide-react';

import { EmptyState } from '../../../components/ui/StatusState';
import { cx } from '../../../lib/classNames';
import { useUiStore } from '../../../stores/ui-store';
import { filterHoldings, getSectors } from '../lib/holdingFilters';
import type { Holding } from '../types/holding';
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
    <div className='mt-4 flex min-h-0 flex-1 flex-col gap-4'>
      <div className='flex flex-col gap-3'>
        <div className='relative'>
          <Search
            size={15}
            className='text-text-disabled peer-focus:text-primary pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 transition-colors duration-180 ease-in-out'
          />
          <input
            className='peer rounded-input border-border bg-bg-default text-body text-text-default placeholder:text-text-disabled focus:border-primary focus:bg-surface-card w-full border py-2.5 pr-3 pl-9 transition-colors duration-180 ease-in-out outline-none'
            placeholder='Search by ticker or company'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label='Search holdings'
          />
        </div>

        <fieldset className='m-0 flex flex-wrap gap-2 border-0 p-0'>
          <legend className='sr-only'>Filter by sector</legend>
          {sectors.map((s) => (
            <button
              key={s}
              className={cx(
                'rounded-pill bg-bg-default text-caption text-text-neutral hover:text-primary cursor-pointer border-0 px-3 py-1.5 font-medium whitespace-nowrap transition-all duration-180 ease-in-out active:scale-95',
                sector === s && 'bg-primary text-white hover:text-white',
              )}
              onClick={() => setSector(s)}
              aria-pressed={sector === s}
            >
              {s}
            </button>
          ))}
        </fieldset>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title='No holdings match'
          description='Try a different search term or clear the sector filter.'
        />
      ) : (
        <div
          key={`${search}-${sector}`}
          className='custom-scrollbar flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto py-1 pr-3 pl-1 min-[901px]:h-120 min-[901px]:flex-none'
        >
          {filtered.map((h, i) => (
            <div
              key={h.id}
              className='animate-[slideUp_300ms_ease-out_both]'
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <HoldingCard holding={h} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
