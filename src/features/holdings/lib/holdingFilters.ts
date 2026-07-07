import { getActiveHoldings } from '../../../lib/derivePortfolio';
import type { Holding } from '../types/holding';

export function getSectors(holdings: Holding[]): string[] {
  return Array.from(new Set(getActiveHoldings(holdings).map((h) => h.sector)));
}

export function filterHoldings(holdings: Holding[], query: string, sector: string): Holding[] {
  const q = query.trim().toLowerCase();
  return holdings.filter((h) => {
    const matchesQuery =
      q === '' || h.ticker.toLowerCase().includes(q) || h.name.toLowerCase().includes(q);
    const matchesSector = sector === 'All' || h.sector === sector;
    return matchesQuery && matchesSector;
  });
}
