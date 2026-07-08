import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type DashboardTab = 'holdings' | 'recentTransactions';
export type TransactionFilter = 'All' | 'BUY' | 'SELL';

interface UiState {
  darkMode: boolean;
  toggleDarkMode: () => void;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  mobileSheetOpen: boolean;
  toggleMobileSheet: () => void;
  setMobileSheetOpen: (open: boolean) => void;

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

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () =>
        set((s) => {
          const next = !s.darkMode;
          document.documentElement.classList.toggle('dark', next);
          return { darkMode: next };
        }),

      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      mobileSheetOpen: false,
      toggleMobileSheet: () => set((s) => ({ mobileSheetOpen: !s.mobileSheetOpen })),
      setMobileSheetOpen: (open) => set({ mobileSheetOpen: open }),

      balanceHidden: false,
      toggleBalance: () => set((s) => ({ balanceHidden: !s.balanceHidden })),

      activeTab: 'holdings',
      setActiveTab: (tab) => set({ activeTab: tab }),

      holdingsSearch: '',
      setHoldingsSearch: (q) => set({ holdingsSearch: q }),
      holdingsSectorFilter: 'All',
      setHoldingsSectorFilter: (sector) => set({ holdingsSectorFilter: sector }),

      transactionFilter: 'All',
      setTransactionFilter: (filter) => set({ transactionFilter: filter }),
    }),
    { name: 'trove-ui' },
  ),
);
