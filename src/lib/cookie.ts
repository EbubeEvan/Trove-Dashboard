// Single source of truth for session lifetime (in seconds).
// Used by both the cookie Max-Age and the localStorage expiry timer.
export const SESSION_MAX_AGE = 86400; // 24 hours

const SESSION_KEY = 'trove-session';
const COOKIE_NAME = 'trove-token';

/**
 * Parse document.cookie into a map of name → value.
 * Skips cookies marked HttpOnly (inaccessible to JS).
 */
function parseCookies(): Record<string, string> {
  const map: Record<string, string> = {};
  document.cookie.split(';').forEach((pair) => {
    const [key, ...rest] = pair.split('=');
    if (key) map[key.trim()] = rest.join('=').trim();
  });
  return map;
}

export function setCookie(token: string) {
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000).toUTCString();
  // HttpOnly cannot be set from JS; in a real backend the Set-Cookie header handles it.
  // Secure is conditional: set on HTTPS (Vercel), omitted on HTTP (localhost).
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=${token}; Path=/; Expires=${expires}; SameSite=Strict${secure}`;
}

export function getCookie(name: string): string | undefined {
  return parseCookies()[name];
}

export function removeCookie() {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_NAME}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict${secure}`;
}

// ---------------------------------------------------------------------------
// localStorage session flag — lightweight frontend indicator that mirrors
// the cookie's lifetime. Not the source of truth for the token itself.
// ---------------------------------------------------------------------------

export interface SessionFlag {
  isAuthenticated: boolean;
  email: string;
  expiresAt: number; // epoch ms
}

export function setSessionFlag(email: string) {
  const flag: SessionFlag = {
    isAuthenticated: true,
    email,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(flag));
}

export function getSessionFlag(): SessionFlag | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const flag: SessionFlag = JSON.parse(raw);
    if (flag.expiresAt <= Date.now()) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return flag;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function clearSessionFlag() {
  localStorage.removeItem(SESSION_KEY);
}
