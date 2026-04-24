import React from "react";

/* Shared gradient video thumbnail with chips overlay. */
export const VideoThumb = ({ gradient, duration, badge, badgeColor = "bg-primary text-primary-foreground", title }) => (
  <div
    className="relative w-full aspect-video rounded-[calc(var(--radius)-4px)] border-2 border-secondary overflow-hidden shadow-doodle-sm"
    style={{ background: gradient || "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" }}
  >
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 300 170" fill="none" aria-hidden="true">
      <path d="M0 120 Q60 90 120 120 T240 120 T360 120" stroke="hsl(var(--surface))" strokeWidth="3" opacity="0.45" fill="none" strokeLinecap="round" />
      <circle cx="60" cy="40" r="3" fill="hsl(var(--surface))" opacity="0.6" />
      <circle cx="250" cy="60" r="4" fill="hsl(var(--surface))" opacity="0.5" />
    </svg>
    {badge && (
      <span className={`absolute top-2.5 left-2.5 doodle-pill ${badgeColor} px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider`} style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
        {badge}
      </span>
    )}
    {duration && (
      <span className="absolute bottom-2.5 right-2.5 text-[11px] font-extrabold bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">
        {duration}
      </span>
    )}
    {title && (
      <div className="absolute inset-x-3 bottom-10 text-surface font-display font-extrabold text-lg leading-tight truncate">
        {title}
      </div>
    )}
  </div>
);

export const VideoCard = ({ item, testId }) => (
  <div className="doodle-card p-4 group hover:-translate-y-1 transition-transform" data-testid={testId}>
    <VideoThumb {...item} />
    <div className="mt-3 flex items-start gap-2">
      <div className="min-w-0 flex-1">
        <div className="font-display text-base md:text-lg font-extrabold leading-snug truncate">{item.title}</div>
        <div className="text-xs font-bold text-muted-foreground mt-1 flex items-center gap-2">
          <span className="doodle-pill bg-surface px-2 py-0.5">{item.ratio}</span>
          <span>•</span>
          <span>{item.time}</span>
          {item.views && <><span>•</span><span>{item.views} views</span></>}
        </div>
      </div>
    </div>
  </div>
);

export const FilterPill = ({ active, children, onClick, testId }) => (
  <button
    onClick={onClick}
    className={`doodle-pill px-4 py-1.5 text-sm font-extrabold transition-all ${
      active
        ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_hsl(var(--secondary))]"
        : "bg-surface text-foreground hover:-translate-y-0.5"
    }`}
    data-testid={testId}
  >
    {children}
  </button>
);

export const EmptyState = ({ icon: Icon, title, subtitle, cta }) => (
  <div className="doodle-card p-10 text-center" data-testid="empty-state">
    {Icon && (
      <div className="mx-auto h-16 w-16 rounded-full bg-accent border-2 border-secondary flex items-center justify-center shadow-doodle-sm">
        <Icon className="h-7 w-7" strokeWidth={2.5} />
      </div>
    )}
    <h3 className="mt-4 font-display text-2xl font-extrabold">{title}</h3>
    {subtitle && <p className="mt-2 text-muted-foreground max-w-md mx-auto">{subtitle}</p>}
    {cta && <div className="mt-5 inline-block">{cta}</div>}
  </div>
);
