import './mock-server'; // registers mock routes on the shared axios instance

import type { PortfolioData } from '../lib/types';
import { apiClient } from './client';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: { email: string };
}

/**
 * Service layer: every component consumes portfolio data through these
 * functions, never by importing the JSON file directly (per brief).
 * TanStack Query hooks in core/hooks wrap these with loading/error/caching.
 */
export const portfolioService = {
  getPortfolio: async (): Promise<PortfolioData> => {
    const res = await apiClient.get<PortfolioData>('/portfolio');
    return res.data;
  },

  login: async (payload: LoginPayload): Promise<LoginResult> => {
    const res = await apiClient.post<LoginResult, LoginPayload>('/auth/login', payload);
    return res.data;
  },
};
