import React from "react";

/* Cozy hand-drawn Brewly mug logo. Always inherits currentColor via strokes. */
export const BrewlyLogo = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    {/* Saucer */}
    <ellipse cx="24" cy="40" rx="16" ry="2.5" fill="hsl(var(--accent))" stroke="hsl(var(--secondary))" strokeWidth="2" />
    {/* Mug body */}
    <path
      d="M10 17h22v14a7 7 0 0 1-7 7h-8a7 7 0 0 1-7-7V17z"
      fill="hsl(var(--surface))"
      stroke="hsl(var(--secondary))"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Handle */}
    <path
      d="M32 21c4 0 6 2.2 6 5s-2 5-6 5"
      stroke="hsl(var(--secondary))"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
    {/* Coffee */}
    <path
      d="M12 19h18v2a4 4 0 0 1-4 4H16a4 4 0 0 1-4-4v-2z"
      fill="hsl(var(--primary))"
    />
    {/* Steam */}
    <path d="M17 10c1.5-2 0-4 1.5-6" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M24 10c1.5-2 0-4 1.5-6" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M31 10c1.5-2 0-4 1.5-6" stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Smile */}
    <circle cx="19" cy="28" r="1.2" fill="hsl(var(--secondary))" />
    <circle cx="27" cy="28" r="1.2" fill="hsl(var(--secondary))" />
    <path d="M19 32c1.5 1.6 4.5 1.6 6 0" stroke="hsl(var(--secondary))" strokeWidth="1.8" strokeLinecap="round" fill="none" />
  </svg>
);

/* Coral → mustard gradient hero art with floating chips and doodles. */
export const HeroIllustration = () => (
  <div className="relative w-full aspect-[5/5] max-w-[560px] mx-auto" data-testid="hero-illustration">
    {/* Soft glow halo */}
    <div className="absolute -inset-6 rounded-full bg-accent/40 blur-3xl" aria-hidden="true" />
    {/* Main gradient art block */}
    <div
      className="relative h-full w-full rounded-[2rem] border-2 border-secondary overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, hsl(8 85% 67%) 0%, hsl(18 90% 68%) 40%, hsl(45 95% 65%) 100%)",
        boxShadow: "8px 8px 0 0 hsl(var(--secondary))",
      }}
    >
      {/* Doodle sparkles */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400" fill="none" aria-hidden="true">
        <g stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round">
          <path d="M60 90 l0 20 M50 100 l20 0" />
          <path d="M340 70 l0 14 M333 77 l14 0" />
          <path d="M300 320 l0 18 M291 329 l18 0" />
          <circle cx="80" cy="310" r="5" fill="hsl(var(--surface))" />
          <circle cx="330" cy="180" r="3" fill="hsl(var(--surface))" />
        </g>
        {/* Wavy line */}
        <path d="M40 240 Q80 210 120 240 T200 240 T280 240 T360 240"
              stroke="hsl(var(--surface))" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75" />
      </svg>

      {/* Big centered mug */}
      <div className="absolute inset-0 flex items-center justify-center animate-float">
        <div className="relative">
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none" aria-hidden="true">
            {/* Plate */}
            <ellipse cx="120" cy="200" rx="92" ry="12" fill="hsl(var(--secondary))" opacity="0.25" />
            {/* Mug */}
            <rect x="46" y="72" width="130" height="116" rx="22"
                  fill="hsl(var(--surface))" stroke="hsl(var(--secondary))" strokeWidth="4" />
            {/* Handle */}
            <path d="M176 100c26 0 38 14 38 32s-12 32-38 32"
                  stroke="hsl(var(--secondary))" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* Coffee line */}
            <rect x="54" y="80" width="114" height="16" rx="6" fill="hsl(var(--secondary))" />
            {/* Heart on mug */}
            <path d="M111 134c-8-10-24-4-24 8 0 10 14 18 24 28 10-10 24-18 24-28 0-12-16-18-24-8z"
                  fill="hsl(8 85% 67%)" stroke="hsl(var(--secondary))" strokeWidth="3" />
            {/* Steam */}
            <path d="M80 56c6-8 0-14 6-22" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M112 50c6-10 0-16 6-26" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M144 56c6-8 0-14 6-22" stroke="hsl(var(--secondary))" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      </div>
    </div>

    {/* Floating tip chip — top left */}
    <div
      className="absolute -top-4 -left-4 md:-left-8 doodle-card px-4 py-3 animate-wiggle"
      style={{ boxShadow: "3px 3px 0 0 hsl(var(--secondary))" }}
      data-testid="hero-chip-tip"
    >
      <div className="flex items-center gap-2">
        <span className="h-8 w-8 rounded-full bg-primary border-2 border-secondary inline-flex items-center justify-center text-primary-foreground font-extrabold">$</span>
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">New tip</div>
          <div className="font-display text-lg font-extrabold leading-none">+$12 from Alex</div>
        </div>
      </div>
    </div>

    {/* Floating member chip — bottom right */}
    <div
      className="absolute -bottom-4 -right-4 md:-right-8 doodle-card px-4 py-3"
      style={{ boxShadow: "3px 3px 0 0 hsl(var(--secondary))" }}
      data-testid="hero-chip-member"
    >
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          <span className="h-7 w-7 rounded-full border-2 border-secondary bg-accent" />
          <span className="h-7 w-7 rounded-full border-2 border-secondary bg-primary" />
          <span className="h-7 w-7 rounded-full border-2 border-secondary bg-muted" />
        </div>
        <div className="font-display text-sm font-extrabold leading-tight">
          3 new<br />members today
        </div>
      </div>
    </div>

    {/* Tiny sparkle chip — middle right */}
    <div
      className="absolute top-1/2 -right-3 md:-right-6 -translate-y-1/2 doodle-pill bg-accent px-3 py-1.5 font-extrabold text-sm"
      style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}
    >
      ✦ 0% fees
    </div>
  </div>
);

/* Five-star inline review row */
export const FiveStars = () => (
  <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
    {[0,1,2,3,4].map(i => (
      <svg key={i} width="18" height="18" viewBox="0 0 20 20" fill="hsl(var(--accent))" stroke="hsl(var(--secondary))" strokeWidth="1.5">
        <path d="M10 1.8l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15.3l-5.2 2.8 1-5.9L1.5 8l5.9-.9L10 1.8z" strokeLinejoin="round" />
      </svg>
    ))}
  </div>
);
