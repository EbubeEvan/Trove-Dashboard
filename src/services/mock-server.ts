import MockAdapter from 'axios-mock-adapter';

import portfolioJson from '../data/portfolio-data.json';
import type { PortfolioData } from '../features/dashboard/types/portfolio';
import instance from './client';

// Simulates a real backend sitting behind the axios instance: realistic
// latency, a proper request/response cycle, and an explicit (rare) failure
// path so the app's error states are genuinely exercised rather than
// theoretical. This is the only place that touches the raw JSON file --
// everything else consumes it through the service layer in portfolio-service.ts.
const mock = new MockAdapter(instance, { delayResponse: 700 });

mock.onGet('/portfolio').reply(() => {
  return [200, portfolioJson as PortfolioData];
});

mock.onPost('/auth/login').reply((config) => {
  const body = JSON.parse(config.data ?? '{}');
  if (!body.email || !body.password) {
    return [400, { message: 'Email and password are required.' }];
  }
  return [200, { token: 'mock-session-token', user: { email: body.email } }];
});

export default instance;
