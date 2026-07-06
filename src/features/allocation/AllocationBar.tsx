import { Card } from '../../core/design-system/Card';
import type { Holding } from '../../lib/types';
import { computeAllocation } from '../../lib/derivePortfolio';

interface AllocationBarProps {
  holdings: Holding[];
}

// Sector -> color, drawn from the Trove v3 palette's chart-segment tokens.
// Falls back to accent-blue for any sector beyond the first four, so the
// component stays correct even if the dataset grows new sectors later.
const SECTOR_COLORS: Record<string, string> = {
  Technology: 'var(--color-primary)',
  Automotive: 'var(--color-dark-blue)',
  Healthcare: 'var(--color-accent-blue)',
  Finance: 'var(--color-purple)',
  Entertainment: 'var(--color-cream)',
};

function colorForSector(sector: string, index: number): string {
  return SECTOR_COLORS[sector] ?? ['var(--color-accent-blue)', 'var(--color-purple)', 'var(--color-cream)'][index % 3];
}

export function AllocationBar({ holdings }: Readonly<AllocationBarProps>) {
  const allocation = computeAllocation(holdings);

  if (allocation.length === 0) {
    return (
      <Card className="flex flex-col gap-4">
        <h2 className="m-0 text-size-heading font-semibold text-text-default">
          Asset Allocation
        </h2>
        <p className="m-0 text-size-body text-text-neutral">
          No active holdings to allocate yet.
        </p>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="m-0 text-size-heading font-semibold text-text-default">
        Asset Allocation
      </h2>

      <div
        className="flex h-3 w-full overflow-hidden rounded-pill bg-bg-default"
        role="img"
        aria-label="Portfolio allocation by sector"
      >
        {allocation.map((a, i) => (
          <div
            key={a.sector}
            className="h-full min-w-[3px] transition-[flex-basis] duration-180 ease-in-out"
            style={{ flexBasis: `${a.percent}%`, background: colorForSector(a.sector, i) }}
            title={`${a.sector}: ${a.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-4">
        {allocation.map((a, i) => (
          <div key={a.sector} className="flex items-center gap-2">
            <span className="h-[9px] w-[9px] shrink-0 rounded-full" style={{ background: colorForSector(a.sector, i) }} />
            <div className="flex flex-col gap-px">
              <span className="text-size-caption text-text-neutral">
                {a.sector}
              </span>
              <span className="text-size-card-value font-semibold text-text-default">
                {a.percent.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
