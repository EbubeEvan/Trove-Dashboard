import { Card } from '../../../components/ui/Card';
import { computeAllocation } from '../lib/computeAllocation';
import type { AllocationHolding } from '../types/allocation';

interface AllocationBarProps {
  holdings: AllocationHolding[];
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
  return (
    SECTOR_COLORS[sector] ??
    ['var(--color-accent-blue)', 'var(--color-purple)', 'var(--color-cream)'][index % 3]
  );
}

export function AllocationBar({ holdings }: Readonly<AllocationBarProps>) {
  const allocation = computeAllocation(holdings);

  if (allocation.length === 0) {
    return (
      <Card className='flex flex-col gap-4'>
        <h2 className='text-heading text-text-default m-0 font-semibold'>Asset Allocation</h2>
        <p className='text-body text-text-neutral m-0'>No active holdings to allocate yet.</p>
      </Card>
    );
  }

  return (
    <Card className='flex flex-col gap-4'>
      <h2 className='text-heading text-text-default m-0 font-semibold'>Asset Allocation</h2>

      <div
        className='rounded-pill bg-bg-default flex h-3 w-full overflow-hidden'
        role='img'
        aria-label='Portfolio allocation by sector'
      >
        {allocation.map((a, i) => (
          <div
            key={a.sector}
            className='h-full min-w-0.75 transition-[flex-basis] duration-180 ease-in-out'
            style={{ flexBasis: `${a.percent}%`, background: colorForSector(a.sector, i) }}
            title={`${a.sector}: ${a.percent.toFixed(1)}%`}
          />
        ))}
      </div>

      <div className='flex flex-wrap gap-x-6 gap-y-4'>
        {allocation.map((a, i) => (
          <div
            key={a.sector}
            className='flex animate-[slideUp_300ms_ease-out_both] items-center gap-2'
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span
              className='h-2.25 w-2.25 shrink-0 rounded-full'
              style={{ background: colorForSector(a.sector, i) }}
            />
            <div className='flex flex-col gap-px'>
              <span className='text-caption text-text-neutral'>{a.sector}</span>
              <span className='text-card-value text-text-default font-semibold'>
                {a.percent.toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
