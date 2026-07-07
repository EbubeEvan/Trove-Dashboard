import { currentValue, getActiveHoldings } from '../../../lib/derivePortfolio';
import type { AllocationHolding, SectorAllocation } from '../types/allocation';

export function computeAllocation(holdings: AllocationHolding[]): SectorAllocation[] {
  const active = getActiveHoldings(holdings);
  const total = active.reduce((sum, h) => sum + currentValue(h), 0);

  const bySector = new Map<string, number>();
  for (const h of active) {
    bySector.set(h.sector, (bySector.get(h.sector) ?? 0) + currentValue(h));
  }

  return Array.from(bySector.entries())
    .map(([sector, value]) => ({
      sector,
      value,
      percent: total === 0 ? 0 : (value / total) * 100,
    }))
    .sort((a, b) => b.value - a.value);
}
