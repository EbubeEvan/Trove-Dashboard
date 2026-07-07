import type { Transaction } from '../types/transaction';
import type { TransactionFilter } from '../types/transactionFilter';

export function filterTransactions(
  transactions: Transaction[],
  type: TransactionFilter,
): Transaction[] {
  if (type === 'All') return transactions;
  return transactions.filter((t) => t.type === type);
}

export function sortTransactionsByDateDesc(transactions: Transaction[]): Transaction[] {
  return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
