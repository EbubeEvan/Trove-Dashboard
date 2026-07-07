/**
 * Shared portfolio primitives live here as pure functions, deliberately kept
 * independent of React/Zustand/TanStack Query so the quirk-handling
 * rules are easy to read and reuse across feature modules.
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

export function hasUnavailablePrice<T extends { currentPrice: number }>(h: T): boolean {
  return h.currentPrice === 0;
}

export function isClosedPosition<T extends { shares: number }>(h: T): boolean {
  return h.shares === 0;
}

/** Holdings that actually count toward value, allocation, and grouping. */
export function getActiveHoldings<T extends { shares: number; currentPrice: number }>(
  holdings: T[],
): T[] {
  return holdings.filter((h) => !isClosedPosition(h) && !hasUnavailablePrice(h));
}

export function currentValue<T extends { shares: number; currentPrice: number }>(h: T): number {
  if (hasUnavailablePrice(h) || isClosedPosition(h)) return 0;
  return h.shares * h.currentPrice;
}

export function investedValue<T extends { shares: number; avgCost: number }>(h: T): number {
  // A closed (0-share) position never contributed capital that still counts.
  if (isClosedPosition(h)) return 0;
  // NVDA's cost basis is real even though its live price is unavailable.
  return h.shares * h.avgCost;
}

export function gainLoss<T extends { shares: number; avgCost: number; currentPrice: number }>(
  h: T,
): {
  amount: number;
  percent: number;
} {
  if (hasUnavailablePrice(h) || isClosedPosition(h)) {
    return { amount: 0, percent: 0 };
  }
  const invested = investedValue(h);
  const amount = currentValue(h) - invested;
  const percent = invested === 0 ? 0 : (amount / invested) * 100;
  return { amount, percent };
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
