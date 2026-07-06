import { create } from 'zustand';

export type DashboardTab = 'stocks' | 'orders';
export type TransactionFilter = 'All' | 'BUY' | 'SELL';

interface UiState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  balanceHidden: boolean;
  toggleBalance: () => void;

  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;

  holdingsSearch: string;
  setHoldingsSearch: (q: string) => void;
  holdingsSectorFilter: string;
  setHoldingsSectorFilter: (sector: string) => void;

  transactionFilter: TransactionFilter;
  setTransactionFilter: (filter: TransactionFilter) => void;
}

export const useUiStore = create<UiState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

  balanceHidden: false,
  toggleBalance: () => set((s) => ({ balanceHidden: !s.balanceHidden })),

  activeTab: 'stocks',
  setActiveTab: (tab) => set({ activeTab: tab }),

  holdingsSearch: '',
  setHoldingsSearch: (q) => set({ holdingsSearch: q }),
  holdingsSectorFilter: 'All',
  setHoldingsSectorFilter: (sector) => set({ holdingsSectorFilter: sector }),

  transactionFilter: 'All',
  setTransactionFilter: (filter) => set({ transactionFilter: filter }),
}));
