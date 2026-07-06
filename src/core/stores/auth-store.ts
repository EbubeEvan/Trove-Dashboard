import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  setSession: (token: string, email: string) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  email: null,
  setSession: (_token, email) => set({ isAuthenticated: true, email }),
  clearSession: () => set({ isAuthenticated: false, email: null }),
}));
