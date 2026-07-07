import type { Holding } from '../../holdings/types/holding';
import type { Transaction } from '../../transactions/types/transaction';

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
