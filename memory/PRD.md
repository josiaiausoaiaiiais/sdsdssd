# Brewly — PRD

## Original Problem Statement
> "Can you make my homepage, um, classier, the same color and style? I just want the homepage landing page and the hero of the homepage in the file I uploaded, little bit better shape and style and, uh, layout."
>
> Follow-up: user also wants the Dashboard page (left sidebar + overall layout) to look classy and sharp, per the uploaded Brewly style guide.

## Style Source of Truth
`brewly-style-guide-and-agent-prompt.md` — warm mint background, coral/mustard accents, deep-ink borders, doodle-card aesthetic, Fraunces + Nunito typography, pill buttons with 4px offset shadow.

## Tech Stack
React 19 (CRA + CRACO) · Tailwind v3 · lucide-react · FastAPI backend (untouched). No third-party integrations required.

## Architecture
- `/` → `src/pages/Landing.jsx` — sticky pill nav, hero, slim footer
- `/dashboard` → `src/pages/Dashboard.jsx` — ink sidebar + top bar + greeting card + stats + recent uploads
- Shared doodles/logo in `src/components/brewly/Illustrations.jsx`
- All Brewly HSL tokens + `doodle-card` / `doodle-pill` / `doodle-btn` utilities in `src/index.css`
- Tailwind theme extends with `surface`, `font-display` (Fraunces), `font-sans` (Nunito), `shadow-doodle`

## Implemented (Jan 2026)
- Brewly design tokens (colors, radius, shadows) wired via CSS vars + Tailwind
- Fonts loaded (Fraunces + Nunito) in `public/index.html`
- Landing: pill nav (scroll-aware), hero headline with italic coral accent, dual CTAs, 5-star proof, 4-stat trust bar, coral→mustard SVG hero illustration with animated mug + 3 floating chips (tip, members, 0% fees), slim doodle footer
- Dashboard: ink 256px sidebar with logo, 7 nav items, Pro-tip coral card; top bar with pill search, bell, Create button, avatar pill; greeting hero card with floating streak chip + gradient video preview; 4 stat cards; recent uploads list with gradient thumbnails and duration chips

## Design Compliance
- No hard-coded hex in components — all via semantic tokens
- Every interactive + critical element has a unique `data-testid`
- Single `<h1>` per page, meaningful focus rings, reduced-motion respected via CSS only

## Backlog / P1
- Landing: trust bar section, How it works, Features, Testimonials carousel, Pricing, Final CTA (deferred — user scoped to hero only)
- Dashboard: `/dashboard/library`, `/dashboard/generate`, `/studio` pages
- Auth pages `/login`, `/signup`
- `useGenerations` hook + localStorage persistence

## Next Action Items
- Expand landing with additional sections (How it works, Features, Pricing) per style guide §8
- Build Library + Generate flows with persistent storage
