# Trove — Investment Portfolio Dashboard

A single-view portfolio dashboard built for the Trove Frontend Engineer assessment.

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL. Login is simulated — any well-formed email + a password of 6+ characters
will sign you in (see `src/services/mock-server.ts`).

```bash
npm run build     # production build (also regenerates the route tree)
npm run preview   # preview the production build
```

## Stack

- **React 19 + Vite + TypeScript**
- **TanStack Router** — file-based, type-safe routing in `src/routes/`. The app has `/login` and
  `/dashboard`, with `/` redirecting based on the simulated auth session.
- **TanStack Query** — wraps service calls with loading, error, retry, and caching state via
  `src/hooks/usePortfolio.ts` and the auth mutation in `src/features/auth/hooks/useLogin.ts`.
- **Zustand** — lightweight client state for simulated auth and dashboard UI preferences: sidebar
  collapsed, balance hidden, active tab, holdings search/sector filter, transaction filter, and dark
  mode. Auth state is in-memory and bootstrapped synchronously from the timed `trove-session` flag
  (see Authentication); UI state persists to `localStorage` via Zustand's `persist` middleware.
- **Axios + axios-mock-adapter** — a shared client in `src/services/client.ts`, mocked in
  `src/services/mock-server.ts` with realistic latency and typed service functions in
  `src/services/portfolio-service.ts`.
- **Recharts** — renders the sector allocation bar and the invested-vs-current-value chart.
- **Lucide React** — icons for navigation, controls, auth fields, and status affordances.
- **Tailwind CSS v4 + design tokens** — no UI library. Tokens live in `src/index.css` through
  Tailwind `@theme` and CSS custom properties, then components consume them through utility classes.
- **Inter, self-hosted via `@fontsource/inter`** — local font files rather than a Google Fonts
  `<link>`. Google Fonts served via CDN sends the visitor's IP to a third party on every page load;
  self-hosting avoids that request entirely, which matters for a fintech product handling EU/UK
  users under GDPR (no unnecessary third-party data sharing, no consent-banner obligation for font
  loading).

## Architecture

The app is a **modular monolith**: each domain lives in its own folder under `src/features/`, while
shared UI primitives, stores, hooks, services, and utilities sit in top-level `src/` folders. A
feature talks to app-wide state through `src/stores/` and to data through `src/services/` — never by
importing the raw JSON fixture or another feature's internals directly. Removing any one feature
folder (e.g. `features/allocation`) only breaks the page section that renders it, not the rest of
the app.

```
src/
├── assets/
│   └── logos/                    trove-logo.png, trove-logo-dark.png
├── components/
│   └── ui/                       Badge, Button, Card, Input, Sheet, StatusState, Tooltip
│                                 badgeTones (shared badge tone classes)
├── data/
│   └── portfolio-data.json       source fixture consumed only by the mock server
├── features/
│   ├── accounts/                 account grouping and account cards
│   ├── allocation/               sector allocation computation and chart
│   ├── auth/                     login page, login mutation, form validation
│   ├── dashboard/                dashboard composition, skeleton, holdings/orders panel
│   ├── holdings/                 stock cards, metrics, search, sector filters
│   ├── net-worth/                totals, net worth card, invested/current chart
│   ├── shell/                    DashboardShell, Sidebar, TopBar
│   └── transactions/             order rows, date formatting, Buy/Sell filters
├── hooks/
│   └── usePortfolio.ts           TanStack Query wrapper around portfolioService
├── lib/
│   ├── classNames.ts             class name helper
│   ├── cookie.ts                 session cookie + localStorage flag helpers
│   ├── derivePortfolio.ts        shared portfolio math and formatting rules
│   └── deriveUsername.ts         username derivation logic
├── routes/                       TanStack Router file-based routes (/, /login, /dashboard)
├── services/                     (moved here per brief: "service layer in a folder called services")
│   ├── client.ts                 axios instance + interceptors
│   ├── mock-server.ts            axios-mock-adapter: the only file that touches the raw JSON
│   └── portfolio-service.ts      typed functions every component actually calls
└── stores/
    ├── auth-store.ts             simulated auth session (cookie-backed, timed expiry)
    └── ui-store.ts               sidebar, balance visibility, tabs, filters
```

No component ever imports the JSON file directly — everything passes through
`portfolioService.getPortfolio()`, which the mock adapter answers with a simulated ~700ms delay.
`App.tsx` creates the TanStack Query client and TanStack Router provider. The generated route tree
lives in `src/routeTree.gen.ts` and is regenerated by the TanStack Router Vite plugin during builds.

## Authentication

Session state lives in two stores: a `trove-token` cookie and a `trove-session` flag in
`localStorage`. In a real backend the cookie would be `HttpOnly` and set automatically via the
`Set-Cookie` response header — here the frontend simulates that by writing it via `document.cookie`.
The localStorage flag is the lightweight indicator that route guards and the Zustand auth store read
from on app load.

1. **Login** — the mock backend returns a JWT token in the response body. The frontend stores the
   token in the `trove-token` cookie (simulating the `Set-Cookie` header a real backend would send)
   and writes a `trove-session` flag to `localStorage` with `isAuthenticated`, `email`, and
   `expiresAt`.

2. **Reload** — the auth store synchronously reads the `trove-session` flag. If `expiresAt` is in
   the future, the user stays on the dashboard. Otherwise they're redirected to `/login`.

3. **Logout** — clears the cookie and the `trove-session` flag, then navigates to `/login`.

4. **Expiry** — both the cookie and the localStorage flag share a single source of truth:
   `SESSION_MAX_AGE` (86400 s / 24 h) defined in `src/lib/cookie.ts`.

### Security attributes

| Attribute  | Value                   | Purpose                                                                                |
| ---------- | ----------------------- | -------------------------------------------------------------------------------------- |
| `HttpOnly` | (set by backend)        | JS cannot read the cookie — blocks XSS token theft                                     |
| `Secure`   | `true` (auto on Vercel) | Conditionally set — active when `location.protocol === 'https:'`, omitted on localhost |
| `SameSite` | `Strict`                | Blocks ALL cross-site requests — strongest CSRF protection                             |
| `Max-Age`  | `86400`                 | 24-hour session lifetime                                                               |

**Why `SameSite=Strict`:** Trove is a fintech product where security outweighs link-sharing
convenience. `Strict` blocks the cookie on all cross-site requests, including top-level navigations
from external sites — no cross-origin request can carry the session.

**Tradeoff — deep linking:** If a user clicks a shared link to the dashboard from another site
(Slack, email, etc.), the cookie is not sent on the initial navigation, so they briefly see the
login page. This is the accepted cost of the stronger CSRF posture. `SameSite=Lax` would allow the
cookie on top-level navigations but is weaker against CSRF.

**Production note:** In a real backend, `HttpOnly` would be set via the `Set-Cookie` header (not
`document.cookie`), and CSRF tokens or `Origin` header validation should be layered on top for
defense in depth.

## Current app state

The implemented product is a single portfolio dashboard behind a simulated login. Any valid email
and a password of at least 6 characters signs the user in. Auth state is persisted via a timed
cookie and localStorage flag (see [Authentication](#authentication)).

The dashboard currently includes:

- Net worth summary computed from holdings, not from the stale `summary.totalPortfolioValue` field.
- Invested vs. current value chart.
- Sector allocation chart.
- Account grouping by active holdings.
- Holdings panel with ticker/company search and sector filters.
- Recent Transactions panel with All/Buy/Sell filters and descending date sorting.
- Pending and failed transaction badge states.
- Closed-position and unavailable-price handling in holding cards.
- Loading skeleton, empty states, and retryable error state.
- Collapsible sidebar that auto-collapses below 900px.
- Disabled sidebar items for Transactions, Markets, and Settings with "Coming soon" tooltips.
- Dark mode toggle in the top bar with persisted preference (localStorage). Click the user avatar in
  the sidebar to access the logout option.

### Layout decisions

**Filters live inside their respective cards** — the search/sector filters for holdings and the
All/Buy/Sell filters for transactions are placed inside their card headers rather than above or
alongside them. This keeps each panel self-contained: the user's eye stays within the card they're
scanning, and the two columns don't compete for shared filter space above the fold. It also avoids a
disjointed layout where filters float at the top but only affect one half of the screen.

**No "View All" links** — the wireframe shows a "View All" affordance on each card, but since the
brief scopes a single dashboard view and the dedicated Holdings / Transactions pages don't exist,
including the link would be a dead end. Omitting it avoids misleading the user into thinking
navigation is available when it isn't.

**No "Ad Funds" button** — the wireframe includes an "Ad Funds" button at the bottom of the sidebar,
but this feature isn't available in the data or the brief. Adding a non-functional button would be
misleading; the mock data has no deposit/withdrawal flow to back it up, so the button would either
be a dead click or fake a balance change with no real operation behind it.

### Navigation

The brief scopes a **single dashboard view**, so `/dashboard` is the only real page. The wireframe's
sidebar items (Transactions, Markets, Settings) are shown for visual fidelity but disabled with a
"Coming soon" tooltip, since building them out would either duplicate the dashboard or fake content
that doesn't exist. **"Portfolio" was deliberately left out of the sidebar** — its content would be
identical to Dashboard, so listing it as a separate (even disabled) item would misrepresent it as a
distinct, not-yet-built view rather than what it actually is: the same screen.

The sidebar is collapsible (icon-only rail when collapsed) and auto-collapses under 900px viewport
width.

## Data quirks — decisions

1. **NVDA `currentPrice: 0`** — treated as "price unavailable," never as a real $0 value. It's
   excluded from current-value and allocation math (so it can't silently zero out the portfolio),
   the holding card shows "Price unavailable" instead of a dollar figure, but its cost basis
   (`shares × avgCost`) still counts on the _invested_ side, since that purchase genuinely happened.
2. **DIS `shares: 0`** — treated as a closed position: excluded from net worth, the allocation bar,
   and account grouping (an empty position shouldn't skew any of those), but still shown in the
   holdings list with a "Closed position" badge rather than deleted, so the record isn't hidden.
3. **Transaction `status: "PENDING"`** — rendered with a distinct amber badge, visually separate
   from completed trades, since the money/shares haven't finished moving yet.
4. **Transaction `status: "FAILED"`** — rendered with a red badge and the amount struck through,
   since no money or shares actually moved.
5. **Negative gain/loss** — red text with an explicit minus sign (en dash) and percentage,
   consistently formatted via `formatSignedCurrency` / `formatSignedPercent` in
   `derivePortfolio.ts`.
6. **Bonus quirk found while building:** `summary.totalPortfolioValue` in the source JSON
   (**$48,250.75**) doesn't reconcile with the sum of the actual holdings (**≈$19,134**, computed
   from `shares × currentPrice`). The brief explicitly asks for net worth "computed from all
   holdings," so the summary field is never read — every total displayed is derived live from the
   holdings array.

Since there's no historical price series in the data, the wireframe's net-worth line chart was
replaced with an **invested vs. current value bar chart** — both real, computed numbers, rather than
a fabricated trend line.

## What I'd improve with more time

- Unit tests for `derivePortfolio.ts` (the quirk-handling logic is the highest-value thing to lock
  down with tests) and a couple of component tests for the holdings/transactions filters.
- A local translations toggle for the three major Nigerian languages: Hausa, Yoruba, and Igbo.
