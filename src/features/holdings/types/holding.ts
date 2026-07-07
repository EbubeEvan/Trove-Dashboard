export interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  currency: string;
}
