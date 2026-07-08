import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

// Apply dark class from persisted store before first render to prevent flash
try {
  const raw = localStorage.getItem('trove-ui');
  if (raw) {
    const { state } = JSON.parse(raw);
    if (state?.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }
} catch {
  // Ignore malformed localStorage data
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
