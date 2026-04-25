# Brewly — PRD

## Original Problem Statement
User wants Brewly creator-monetization app: classy homepage + dashboard with 6 feature pages, real per-user data, JWT auth, and supporting integrations.

## Tech Stack
React 19 + Tailwind v3 + lucide-react · FastAPI + Motor (async MongoDB) · JWT email/password auth via httpOnly cookies.

## Routes
| Path | Auth | Purpose |
|---|---|---|
| `/` | public | Landing: Hero + How it works (3 steps) + Pricing (Free/Gold, monthly/yearly toggle) + Footer |
| `/login`, `/signup` | public | Split-screen ink + cream auth forms |
| `/dashboard` | protected | Greeting + 4 stat cards + recent uploads (real per-user data) |
| `/dashboard/library` | protected | Real user uploads, search, folders, grid/list, add/delete, favorite toggle |
| `/dashboard/favorites` | protected | Real user favorites with empty state |
| `/dashboard/studio` | protected | Video player customizer — upload/library pick, accent/theme/icon-style/lower-third controls, click-middle-to-play, branded export-ready preview |
| `/dashboard/webinars` | protected | UI complete (data mocked — Phase 2 needs LiveKit/Daily) |
| `/dashboard/channels` | protected | UI complete (mocked) |
| `/dashboard/analytics` | protected | UI complete (mocked) |
| `/dashboard/remix` | protected | UI complete (mocked — Phase 2 needs fal.ai) |

## Backend API
| Endpoint | Auth | Purpose |
|---|---|---|
| POST `/api/auth/register` | — | Creates user + auto-seeds metrics + 4 sample uploads |
| POST `/api/auth/login` | — | Email-keyed brute-force lockout (5 attempts → 15min) |
| POST `/api/auth/logout` | ✓ | Clears httpOnly cookies |
| GET `/api/auth/me` | ✓ | Returns current user |
| GET `/api/dashboard/metrics` | ✓ | Per-user earnings/views/fans/streak (deterministic via `random.Random(user_id)`) |
| GET/POST `/api/uploads`, DELETE `/api/uploads/{id}` | ✓ | Per-user uploads CRUD |
| GET/POST `/api/favorites`, DELETE `/api/favorites/{id}` | ✓ | Per-user favorites; POST validates upload ownership |

## Architecture
- `server.py` — single-file FastAPI with all routers, JWT helpers, seed logic
- `lib/auth.jsx` — AuthProvider + useAuth hook + axios.defaults.withCredentials
- `lib/data.js` — useMetrics, useUploads, useFavorites hooks
- `pages/Auth.jsx` — shared AuthShell wrapping LoginPage + SignupPage
- `components/DashboardLayout.jsx` — Sidebar + TopBar (with avatar dropdown → logout) shared by every dashboard page

## Test Credentials (also in /app/memory/test_credentials.md)
- Admin: `admin@brewly.app` / `admin123`
- Cookies: httpOnly + secure + samesite=none

## Implemented (Jan 2026)
- ✅ JWT auth (register, login, logout, me, brute-force lockout)
- ✅ Per-user data (metrics + uploads + favorites isolated by user_id, deterministic seeding)
- ✅ Login/Signup pages matching Brewly aesthetic
- ✅ Protected routes redirect to /login
- ✅ Avatar dropdown with logout
- ✅ Landing: How it works (3 numbered doodle-cards with hand-drawn SVG mug/heart/sparkle illos), Pricing (monthly/yearly toggle, Free + Brewly Gold tiers, ink-emphasized Gold card), 5-col Footer with socials
- ✅ Library: real CRUD with search, folder filters, grid/list toggle, favorite + delete actions
- ✅ Favorites: real backend, empty state, filter tabs
- ✅ Dashboard home wired to real metrics + recent uploads
- ✅ **Studio (`/dashboard/studio`)** — custom HTML5 video player with click-middle-to-play, centered play/pause overlay, bottom controls (play, ±10s seek, mute, scrubber, fullscreen, time), library picker grid, file upload with object-URL cleanup, accent color presets + custom hex picker (auto-converted to HSL), theme presets (cream/ink/mint), icon style toggle (filled/outline), customizable lower-third title chip, live preview summary, gradient poster while video loads

## Backend QA Results (testing agent iteration_1)
- 18/19 backend pytest pass (95%) → after fixes: brute-force lockout now triggers correctly (verified via curl)
- Per-user data isolation confirmed in UI: admin sees $2,349 / 28.9k / 464 / 4-day; new user sees different unique numbers
- Favorites validation now rejects non-existent or other-user upload IDs (400 / 404)

## Phase 2 (deferred — waiting on keys)
- **Remix** → fal.ai video clip generation (needs `FAL_KEY`)
- **Webinars** → LiveKit or Daily.co (needs API key + secret)

## Backlog
- Password reset flow (`/forgot-password`, `/reset-password`)
- Profile settings page
- Real channel embed page (`/c/:slug`)
- Webinars/Channels/Analytics → real per-user data when integrations land
