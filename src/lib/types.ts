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

export type TransactionType = 'BUY' | 'SELL';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;
  type: TransactionType;
  ticker: string;
  name: string;
  shares: number;
  pricePerShare: number;
  totalAmount: number;
  date: string;
  status: TransactionStatus;
}

export interface PortfolioUser {
  name: string;
  accountId: string;
  lastUpdated: string;
}

export interface PortfolioSummaryRaw {
  totalPortfolioValue: number;
  totalInvested: number;
  currency: string;
}

export interface PortfolioData {
  user: PortfolioUser;
  summary: PortfolioSummaryRaw;
  holdings: Holding[];
  transactions: Transaction[];
}
