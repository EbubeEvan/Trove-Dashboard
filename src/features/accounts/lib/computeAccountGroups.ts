import { currentValue, getActiveHoldings } from '../../../lib/derivePortfolio';
import type { AccountGroup, AccountHolding } from '../types/account';

export function computeAccountGroups(holdings: AccountHolding[]): AccountGroup[] {
  const active = getActiveHoldings(holdings);
  const bySector = new Map<string, { positions: number; totalValue: number }>();

  for (const h of active) {
    const entry = bySector.get(h.sector) ?? { positions: 0, totalValue: 0 };
    entry.positions += 1;
    entry.totalValue += currentValue(h);
    bySector.set(h.sector, entry);
  }

  return Array.from(bySector.entries())
    .map(([category, v]) => ({ category, ...v }))
    .sort((a, b) => b.totalValue - a.totalValue);
}
