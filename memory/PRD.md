# Brewly — PRD

## Original Problem Statement
User wants their homepage + dashboard styled classier per an uploaded Brewly style guide. Follow-up: make all six dashboard features (Library, Favorites, Webinars, Channels, Analytics, Remix) share the exact same visual style as Home + Landing — while delivering the stated feature functionality.

## Style Source of Truth
`brewly-style-guide-and-agent-prompt.md` — warm mint background, coral + mustard accents, deep-ink borders, doodle-card aesthetic, Fraunces + Nunito typography, pill buttons with 4px offset shadow, italic coral accent words in headlines.

## Tech Stack
React 19 (CRA + CRACO) · Tailwind v3 · lucide-react · FastAPI backend (untouched). All data mocked client-side — no third-party integrations yet.

## Architecture
- Shared **`DashboardLayout`** (`src/components/DashboardLayout.jsx`) wraps every dashboard page with the ink Sidebar + pill TopBar + `PageHeader`
- Shared media primitives in `src/components/brewly/MediaPrimitives.jsx`: `VideoThumb`, `VideoCard`, `FilterPill`, `EmptyState`
- Brewly tokens, `doodle-card/pill/btn` utilities, Fraunces/Nunito, float/wiggle animations in `src/index.css`

## Routes
| Path | File | Purpose |
|---|---|---|
| `/` | `pages/Landing.jsx` | Classy hero-focused landing |
| `/dashboard` | `pages/Dashboard.jsx` | Greeting card + stats + recent uploads |
| `/dashboard/library` | `pages/Library.jsx` | Uploaded videos + search + folder organization + grid/list toggle |
| `/dashboard/favorites` | `pages/Favorites.jsx` | Saved videos shelf with filters + unfavorite heart |
| `/dashboard/webinars` | `pages/Webinars.jsx` | Next-up hero card, Upcoming/Past/Automated tabs, Live + evergreen |
| `/dashboard/channels` | `pages/Channels.jsx` | Branded embeddable playlists with embed-preview mock |
| `/dashboard/analytics` | `pages/Analytics.jsx` | KPIs, views area chart, engagement heatmap, top performers |
| `/dashboard/remix` | `pages/Remix.jsx` | AI clip remixer — dropzone + style/ratio picker + generated clip grid |

## Visual Consistency Guarantees
- Every page uses the same Sidebar (active coral pill, Remix NEW badge, Pro-tip card), same TopBar (pill search, bell, Create primary, avatar pill), same `PageHeader` eyebrow+italic-accent-headline pattern
- All cards use `.doodle-card` / `.doodle-card-lg` — no raw `bg-white`
- All buttons are `.doodle-btn` pill-shaped with ink 2px border + 4px coral-or-ink offset shadow
- Filter pills share a single `FilterPill` component with consistent active=coral / inactive=surface behavior
- Gradients across thumbnails/banners always draw from the coral → mustard / ink → mint palette tokens

## Implemented (Jan 2026)
- Brewly tokens + typography + animations
- Landing hero with illustrated mug + 3 floating chips + 5-star proof + trust strip
- Home dashboard: greeting card with streak chip, 4 KPI cards, recent uploads list
- Library: search + 5 folders + grid/list toggle + sort + 9 seeded videos
- Favorites: 4-card stat strip + 5 filter tabs + 6 saved videos with unfavorite toggle
- Webinars: Next-up live hero, Upcoming/Past/Automated tabs, 3 upcoming + 3 past sessions + automation empty state
- Channels: featured channel with embed-preview browser mock + 4 channel cards with copy/embed actions
- Analytics: 4 KPIs + SVG area chart (12 weeks) + SVG heatmap (24 bars) + Top 4 performers ranking
- Remix: big AI dropzone + 5 clip styles + 3 aspect ratios + 4 "freshly clipped" short-form outputs with AI score chips

## Compliance
- No dark-on-dark or dark-on-background collisions — all contrast pairs are token-enforced
- Every interactive + critical element has a unique `data-testid`
- Single `<h1>` per page, meaningful focus rings, motion reduced to hero/chip moments

## Backlog / P1
- Persistent storage (`useGenerations` localStorage hook)
- Auth pages (`/login`, `/signup`)
- Wire real upload → remix AI pipeline (requires video-intelligence integration)
- Real webinar rooms (requires livekit/daily integration)

## Next Action Items
- Offer: add the "just tipped" ticker to the landing hero
- Wire real persistence for uploads + favorites
- Hook Remix to an actual AI clip-generation provider when user is ready
