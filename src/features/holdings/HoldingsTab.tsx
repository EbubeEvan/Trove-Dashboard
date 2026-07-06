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

export function HoldingsTab({ holdings }: HoldingsTabProps) {
  const search = useUiStore((s) => s.holdingsSearch);
  const setSearch = useUiStore((s) => s.setHoldingsSearch);
  const sector = useUiStore((s) => s.holdingsSectorFilter);
  const setSector = useUiStore((s) => s.setHoldingsSectorFilter);

  const sectors = ['All', ...getSectors(holdings)];
  const filtered = filterHoldings(holdings, search, sector);

  return (
    <div>
      <div className="mb-(--space-4) flex flex-col gap-(--space-3)">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-(--space-3) top-1/2 -translate-y-1/2 text-(--color-text-disabled)"
          />
          <input
            className="w-full rounded-(--radius-input) border border-(--color-border) bg-(--color-bg-default) py-2.5 pl-[38px] pr-(--space-3) text-(length:--font-size-body) text-(--color-text-default) outline-none transition-colors duration-180 ease-in-out placeholder:text-(--color-text-disabled) focus:border-(--color-primary)"
            placeholder="Search by ticker or company name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search holdings"
          />
        </div>

        <div className="flex flex-wrap gap-(--space-2)" role="tablist" aria-label="Filter by sector">
          {sectors.map((s) => (
            <button
              key={s}
              className={cx(
                'cursor-pointer whitespace-nowrap rounded-(--radius-pill) border border-(--color-border) bg-(--color-surface-card) px-(--space-3) py-1.5 text-(length:--font-size-caption) font-medium text-(--color-text-neutral) transition-all duration-180 ease-in-out hover:border-(--color-primary) hover:text-(--color-primary)',
                sector === s && 'border-(--color-primary) bg-(--color-primary) text-white hover:text-white',
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
        <div className="flex max-h-[460px] flex-col gap-(--space-3) overflow-y-auto">
          {filtered.map((h) => (
            <HoldingCard key={h.id} holding={h} />
          ))}
        </div>
      )}
    </div>
  );
}
