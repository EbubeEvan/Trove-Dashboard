import axios, { type AxiosRequestConfig } from 'axios';

// ------------------------------
// AXIOS INSTANCE
// ------------------------------
// Adapted from the standard project pattern: instance + interceptors +
// a thin typed wrapper.
// withCredentials is enabled so cookies would be sent in a real backend scenario.
const instance = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

// ------------------------------
// RESPONSE INTERCEPTOR
// ------------------------------
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response && error.message !== 'canceled') {
      return Promise.reject(
        new Error('Network error. Please check your connection and try again.'),
      );
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
