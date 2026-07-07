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

- **React + Vite + TypeScript**
- **TanStack Router** — file-based, type-safe routing (`src/routes/`). Only two real routes exist:
  `/login` and `/dashboard`, guarded by a simulated auth session in `beforeLoad`.
- **TanStack Query** — wraps the service layer with loading/error/caching state, so components
  consume `useQuery`/`useMutation` instead of hand-rolled fetch state.
- **Zustand** — small, cross-cutting UI state only: sidebar collapsed, balance hidden, active tab,
  active filters. Everything else stays local to its feature.
- **Axios** — a request/response-interceptor instance in `src/services/client.ts`, mocked via
  `axios-mock-adapter` in `src/services/mock-server.ts` to simulate real network latency and an
  explicit auth failure path. (Note: this is adapted from a React Native/production auth-client
  pattern — token refresh and secure storage were intentionally stripped out, since there's no real
  backend or token here.)
- **Recharts** — the sector allocation bar and the invested-vs-current-value chart.
- **Lucide React** — icons throughout.
- **CSS Modules + design tokens** — no UI library. All colors, type sizes, radii, spacing, and
  transitions are CSS custom properties in `src/core/design-system/tokens.css`, consumed by every
  component.
- **Inter, self-hosted via `@fontsource/inter`** — local font files rather than a Google Fonts
  `<link>`. Google Fonts served via CDN sends the visitor's IP to a third party on every page load;
  self-hosting avoids that request entirely, which matters for a fintech product handling EU/UK
  users under GDPR (no unnecessary third-party data sharing, no consent-banner obligation for font
  loading).

## Architecture

The app is a **modular monolith**: each domain lives in its own folder under `src/features/`, and a
feature only talks to the outside world through `src/services/` (data) and `src/core/stores/`
(shared UI state) — never by importing another feature's internals directly. Removing any one
feature folder (e.g. `features/allocation`) only breaks the one page section that renders it, not
the app's compilation or the other features.

```
src/
  core/
    design-system/    Card, Button, Input, Badge, Tooltip, Skeleton, EmptyState, ErrorState — all token-driven
    stores/           auth-store (simulated session), ui-store (sidebar/tabs/filters)
    hooks/            usePortfolio (TanStack Query wrapper)
  services/           (moved here per brief: "service layer in a folder called services")
    client.ts         axios instance + interceptors
    mock-server.ts    axios-mock-adapter: the only file that touches the raw JSON
    portfolio-service.ts   typed functions every component actually calls
  lib/
    types.ts          shared domain types
    derivePortfolio.ts   all portfolio math — pure functions, no React/store dependency (quirk rules documented inline)
  features/
    auth/             login form, validation, mutation
    net-worth/         net worth card + invested-vs-current chart
    allocation/        sector allocation bar + legend
    accounts/          sector-grouped account cards
    holdings/           Stocks tab: search, sector pills, holding cards
    transactions/       Orders tab: Buy/Sell filter, transaction rows
    dashboard/          composes the above + tab switcher + skeleton
    shell/              Sidebar, TopBar, DashboardShell
  routes/               TanStack Router file-based routes (/, /login, /dashboard)
```

No component ever imports the JSON file directly — everything passes through
`portfolioService.getPortfolio()`, which the mock adapter answers with a simulated ~700ms delay.

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
- Persist `sidebarCollapsed` / `balanceHidden` preferences (e.g. to localStorage) so they survive a
  refresh.
- Pagination or virtualization for the holdings/transactions lists if the dataset were larger —
  currently a simple scrollable list.
- A real currency-aware layer if multi-currency accounts were introduced (the source data is
  USD-only throughout).
- Skeleton/error/empty states are simulated via the mock adapter's fixed delay; with more time I'd
  add a way to trigger the failure path from the UI (e.g. a hidden query param) purely for reviewer
  convenience.
