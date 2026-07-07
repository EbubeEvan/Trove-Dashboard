export interface AccountHolding {
  sector: string;
  shares: number;
  currentPrice: number;
}

export interface AccountGroup {
  category: string;
  positions: number;
  totalValue: number;
}
