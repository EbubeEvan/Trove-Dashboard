import { Search } from 'lucide-react';
import { useUiStore } from '../../core/stores/ui-store';
import { EmptyState } from '../../core/design-system/StatusState';
import type { Holding } from '../../lib/types';
import { filterHoldings, getSectors } from '../../lib/derivePortfolio';
import { HoldingCard } from './HoldingCard';
import { cx } from '../../lib/classNames';

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
      <div className="mb-4 flex flex-col gap-3">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-disabled"
          />
          <input
            className="w-full rounded-input border border-border bg-bg-default py-2.5 pl-[38px] pr-3 text-size-body text-text-default outline-none transition-colors duration-180 ease-in-out placeholder:text-text-disabled focus:border-primary"
            placeholder="Search by ticker or company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search holdings"
          />
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by sector">
          {sectors.map((s) => (
            <button
              key={s}
              className={cx(
                'cursor-pointer whitespace-nowrap rounded-pill border border-border bg-surface-card px-3 py-1.5 text-size-caption font-medium text-text-neutral transition-all duration-180 ease-in-out hover:border-primary hover:text-primary',
                sector === s && 'border-primary bg-primary text-white hover:text-white',
              )}
              onClick={() => setSector(s)}
              role="tab"
              aria-selected={sector === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No holdings match"
          description="Try a different search term or clear the sector filter."
        />
      ) : (
        <div className="flex max-h-[460px] flex-col gap-3 overflow-y-auto">
          {filtered.map((h) => (
            <HoldingCard key={h.id} holding={h} />
          ))}
        </div>
      )}
    </div>
  );
}
