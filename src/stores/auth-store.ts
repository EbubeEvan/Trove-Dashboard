import { create } from 'zustand';

import {
  clearSessionFlag,
  getSessionFlag,
  removeCookie,
  setCookie,
  setSessionFlag,
} from '../lib/cookie';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  setSession: (token: string, email: string) => void;
  clearSession: () => void;
}

const session = getSessionFlag();

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: Boolean(session?.isAuthenticated),
  email: session?.email ?? null,
  setSession: (token, email) => {
    setCookie(token);
    setSessionFlag(email);
    set({ isAuthenticated: true, email });
  },
  clearSession: () => {
    removeCookie();
    clearSessionFlag();
    set({ isAuthenticated: false, email: null });
  },
}));
