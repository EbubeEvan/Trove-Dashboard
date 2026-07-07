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
