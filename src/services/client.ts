import axios, { type AxiosRequestConfig } from 'axios';

// ------------------------------
// AXIOS INSTANCE
// ------------------------------
// Adapted from the standard project pattern: instance + interceptors +
// a thin typed wrapper. Token refresh / secure storage are intentionally
// omitted here since the brief requires no real authentication -- login
// is simulated client-side. The interceptor shape is kept so the pattern
// is consistent with other projects and easy to extend if a real API
// ever sits behind this later.
const instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

// ------------------------------
// REQUEST INTERCEPTOR
// ------------------------------
instance.interceptors.request.use((config) => {
  return config;
});

// ------------------------------
// RESPONSE INTERCEPTOR
// ------------------------------
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && error.message !== 'canceled') {
      return Promise.reject(new Error('Network error. Please check your connection and try again.'));
    }
    return Promise.reject(error);
  },
);

export const apiClient = {
  get: <T = unknown>(route: string, config?: AxiosRequestConfig) =>
    instance.get<T>(route, { ...config }),

  post: <T = unknown, D = unknown>(route: string, data: D, config?: AxiosRequestConfig) =>
    instance.post<T>(route, data, { ...config }),
};

export default instance;
