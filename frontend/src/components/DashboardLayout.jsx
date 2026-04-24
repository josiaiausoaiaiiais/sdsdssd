import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home, Library, Heart, Radio, Tv, BarChart3, Wand2,
  Search, Bell, Plus, ChevronRight, Sparkles,
} from "lucide-react";
import { BrewlyLogo } from "./brewly/Illustrations";

const NAV = [
  { to: "/dashboard", label: "Home", icon: Home, end: true },
  { to: "/dashboard/library", label: "Library", icon: Library },
  { to: "/dashboard/favorites", label: "Favorites", icon: Heart },
  { to: "/dashboard/webinars", label: "Webinars", icon: Radio },
  { to: "/dashboard/channels", label: "Channels", icon: Tv },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/remix", label: "Remix", icon: Wand2, badge: "New" },
];

const Sidebar = () => (
  <aside
    className="hidden lg:flex fixed inset-y-0 left-0 w-64 bg-secondary text-secondary-foreground flex-col p-5 z-30"
    data-testid="sidebar"
  >
    <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5 mb-7" data-testid="sidebar-logo">
      <div className="h-10 w-10 rounded-full bg-surface border-2 border-surface/90 flex items-center justify-center">
        <BrewlyLogo size={28} />
      </div>
      <span className="font-display text-2xl font-extrabold tracking-tight">Brewly</span>
    </Link>

    <nav className="flex flex-col gap-1 flex-1">
      {NAV.map(({ to, label, icon: Icon, end, badge }) => (
        <NavLink
          key={label}
          to={to}
          end={end}
          className={({ isActive }) =>
            `group relative flex items-center gap-3 px-3.5 py-2.5 rounded-full font-bold text-[0.95rem] transition-all ${
              isActive
                ? "bg-primary text-primary-foreground shadow-[3px_3px_0_0_hsl(var(--accent))]"
                : "text-secondary-foreground/70 hover:text-secondary-foreground hover:bg-white/5"
            }`
          }
          data-testid={`sidebar-link-${label.toLowerCase()}`}
        >
          <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />
          <span>{label}</span>
          {badge && (
            <span className="ml-auto text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent text-accent-foreground border border-accent-foreground/20">
              {badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>

    <div
      className="mt-6 rounded-[calc(var(--radius)-4px)] border-2 border-surface/20 bg-primary text-primary-foreground p-4 relative overflow-hidden"
      data-testid="sidebar-protip"
    >
      <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-accent/40 blur-2xl" />
      <div className="relative">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider">
          <Sparkles className="h-3.5 w-3.5" /> Pro tip
        </div>
        <p className="font-display text-lg font-extrabold leading-tight mt-2">
          Post 3 clips this week for <em className="not-italic underline decoration-wavy decoration-accent">streak&nbsp;bonus</em>.
        </p>
        <button className="mt-3 doodle-pill bg-surface text-foreground text-xs font-extrabold px-3 py-1.5">
          Learn more
        </button>
      </div>
    </div>
  </aside>
);

const TopBar = ({ searchPlaceholder = "Search your library, analytics, fans…" }) => (
  <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-secondary/10">
    <div className="flex items-center gap-3 px-6 lg:px-10 py-4">
      <div className="flex-1 max-w-xl relative" data-testid="topbar-search">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="w-full doodle-pill bg-surface border-secondary/30 pl-11 pr-4 py-2.5 text-sm font-semibold placeholder:text-muted-foreground focus:outline-none focus:border-secondary focus:ring-2 focus:ring-ring/40"
          data-testid="topbar-search-input"
        />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <button
          className="doodle-pill h-11 w-11 inline-flex items-center justify-center bg-surface hover:bg-muted/50 transition-colors relative"
          aria-label="Notifications"
          data-testid="topbar-bell"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary border border-surface" />
        </button>
        <button className="doodle-btn btn-primary text-sm h-11 px-5" data-testid="topbar-create">
          <Plus className="h-4 w-4" strokeWidth={3} />
          Create
        </button>
        <button className="doodle-pill bg-surface flex items-center gap-2 pl-1.5 pr-3 py-1.5" data-testid="topbar-avatar">
          <span className="h-7 w-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-extrabold text-sm">
            N
          </span>
          <span className="text-sm font-bold hidden sm:inline">Nora</span>
          <ChevronRight className="h-4 w-4 rotate-90" />
        </button>
      </div>
    </div>
  </div>
);

export const PageHeader = ({ eyebrow, title, subtitle, action }) => (
  <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4" data-testid="page-header">
    <div>
      {eyebrow && (
        <div className="text-xs font-extrabold uppercase tracking-[0.15em] text-primary">
          {eyebrow}
        </div>
      )}
      <h1 className="mt-1 font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-base md:text-lg max-w-2xl">{subtitle}</p>
      )}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </header>
);

export default function DashboardLayout({ children, searchPlaceholder }) {
  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <Sidebar />
      <main className="lg:pl-64">
        <TopBar searchPlaceholder={searchPlaceholder} />
        <div className="p-6 lg:p-10 space-y-8 max-w-[1400px]">{children}</div>
      </main>
    </div>
  );
}
