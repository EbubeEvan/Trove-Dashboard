export interface NetWorthHolding {
  shares: number;
  avgCost: number;
  currentPrice: number;
}

export interface PortfolioTotals {
  totalCurrentValue: number;
  totalInvested: number;
  netGainLossAmount: number;
  netGainLossPercent: number;
}
