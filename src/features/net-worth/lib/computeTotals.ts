import { currentValue, investedValue } from '../../../lib/derivePortfolio';
import type { NetWorthHolding, PortfolioTotals } from '../types/netWorth';

export function computeTotals(holdings: NetWorthHolding[]): PortfolioTotals {
  const totalCurrentValue = holdings.reduce((sum, h) => sum + currentValue(h), 0);
  const totalInvested = holdings.reduce((sum, h) => sum + investedValue(h), 0);
  const netGainLossAmount = totalCurrentValue - totalInvested;
  const netGainLossPercent = totalInvested === 0 ? 0 : (netGainLossAmount / totalInvested) * 100;
  return { totalCurrentValue, totalInvested, netGainLossAmount, netGainLossPercent };
}
