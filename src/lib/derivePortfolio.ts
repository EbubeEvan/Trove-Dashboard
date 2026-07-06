import type { Holding, PortfolioData, Transaction } from './types';

/**
 * All portfolio math lives here as pure functions, deliberately kept
 * independent of React/Zustand/TanStack Query so the quirk-handling
 * rules are easy to read, reuse, and unit test in isolation.
 *
 * --- Data quirk decisions (see README for full rationale) ---
 * 1. NVDA currentPrice === 0        -> treated as "price unavailable",
 *                                      excluded from current value math,
 *                                      but its cost basis still counts
 *                                      toward "invested" (a real buy happened).
 * 2. DIS shares === 0               -> treated as a closed position,
 *                                      excluded from value, allocation,
 *                                      and account grouping entirely.
 * 3/4. Transaction status PENDING/FAILED -> surfaced as-is for UI badges,
 *                                      no math changes needed here.
 * 5. Negative gain/loss              -> sign-aware formatting helpers below.
 * 6. summary.totalPortfolioValue is stale/unreliable -> we never read it;
 *                                      everything is computed from holdings.
 */

export function hasUnavailablePrice(h: Holding): boolean {
  return h.currentPrice === 0;
}

export function isClosedPosition(h: Holding): boolean {
  return h.shares === 0;
}

/** Holdings that actually count toward value, allocation, and grouping. */
export function getActiveHoldings(holdings: Holding[]): Holding[] {
  return holdings.filter((h) => !isClosedPosition(h) && !hasUnavailablePrice(h));
}

export function currentValue(h: Holding): number {
  if (hasUnavailablePrice(h) || isClosedPosition(h)) return 0;
  return h.shares * h.currentPrice;
}

export function investedValue(h: Holding): number {
  // A closed (0-share) position never contributed capital that still counts.
  if (isClosedPosition(h)) return 0;
  // NVDA's cost basis is real even though its live price is unavailable.
  return h.shares * h.avgCost;
}

export function gainLoss(h: Holding): { amount: number; percent: number } {
  if (hasUnavailablePrice(h) || isClosedPosition(h)) {
    return { amount: 0, percent: 0 };
  }
  const invested = investedValue(h);
  const amount = currentValue(h) - invested;
  const percent = invested === 0 ? 0 : (amount / invested) * 100;
  return { amount, percent };
}

export interface PortfolioTotals {
  totalCurrentValue: number;
  totalInvested: number;
  netGainLossAmount: number;
  netGainLossPercent: number;
}

export function computeTotals(holdings: Holding[]): PortfolioTotals {
  const totalCurrentValue = holdings.reduce((sum, h) => sum + currentValue(h), 0);
  const totalInvested = holdings.reduce((sum, h) => sum + investedValue(h), 0);
  const netGainLossAmount = totalCurrentValue - totalInvested;
  const netGainLossPercent = totalInvested === 0 ? 0 : (netGainLossAmount / totalInvested) * 100;
  return { totalCurrentValue, totalInvested, netGainLossAmount, netGainLossPercent };
}

export interface SectorAllocation {
  sector: string;
  value: number;
  percent: number;
}

/** Allocation is computed only from active holdings (closed/unpriced excluded). */
export function computeAllocation(holdings: Holding[]): SectorAllocation[] {
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

export interface AccountGroup {
  category: string;
  positions: number;
  totalValue: number;
}

/** Accounts are derived by grouping active holdings by sector (per brief). */
export function computeAccountGroups(holdings: Holding[]): AccountGroup[] {
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

export function filterTransactions(
  transactions: Transaction[],
  type: 'All' | 'BUY' | 'SELL',
): Transaction[] {
  if (type === 'All') return transactions;
  return transactions.filter((t) => t.type === type);
}

export function sortTransactionsByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Builds the "invested vs current value" comparison used by the chart,
 * derived entirely from real per-holding numbers (see quirk #6: we never
 * trust summary.totalPortfolioValue from the source JSON).
 */
export function computeInvestedVsCurrent(holdings: Holding[]) {
  const totals = computeTotals(holdings);
  return [
    { label: 'Invested', value: Math.round(totals.totalInvested * 100) / 100 },
    { label: 'Current value', value: Math.round(totals.totalCurrentValue * 100) / 100 },
  ];
}

export function formatCurrency(value: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatSignedCurrency(value: number, currency: string = 'USD'): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${formatCurrency(Math.abs(value), currency)}`;
}

export function formatSignedPercent(value: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '';
  return `${sign}${Math.abs(value).toFixed(1)}%`;
}

export function loadPortfolio(raw: PortfolioData) {
  return raw;
}
