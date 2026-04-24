import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Home, Library, Heart, Radio, Tv, BarChart3, Wand2,
  Search, Bell, Plus, ChevronRight, Sparkles, Play, Upload,
  Flame, TrendingUp, Clock, Eye, MoreHorizontal,
} from "lucide-react";
import { BrewlyLogo } from "../components/brewly/Illustrations";

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
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2.5 px-2 py-1.5 mb-7" data-testid="sidebar-logo">
      <div className="h-10 w-10 rounded-full bg-surface border-2 border-surface/90 flex items-center justify-center">
        <BrewlyLogo size={28} />
      </div>
      <span className="font-display text-2xl font-extrabold tracking-tight">Brewly</span>
    </Link>

    {/* Nav */}
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

    {/* Pro tip card */}
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

const TopBar = () => (
  <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-secondary/10">
    <div className="flex items-center gap-3 px-6 lg:px-10 py-4">
      {/* Search pill */}
      <div className="flex-1 max-w-xl relative" data-testid="topbar-search">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search your library, analytics, fans…"
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
        <button
          className="doodle-btn btn-primary text-sm h-11 px-5"
          data-testid="topbar-create"
        >
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

const StatCard = ({ icon: Icon, label, value, delta, accent }) => (
  <div className="doodle-card p-5" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
    <div className="flex items-center justify-between">
      <span
        className={`h-10 w-10 rounded-full border-2 border-secondary inline-flex items-center justify-center ${accent}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
        Last 7d
      </span>
    </div>
    <div className="mt-4 font-display text-3xl font-extrabold leading-none">{value}</div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-sm font-bold text-muted-foreground">{label}</span>
      <span className="text-xs font-extrabold text-primary">{delta}</span>
    </div>
  </div>
);

const GreetingCard = () => (
  <div
    className="relative doodle-card-lg p-7 md:p-10"
    data-testid="greeting-card"
  >
    <div className="absolute inset-0 rounded-[var(--radius)] overflow-hidden pointer-events-none">
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
    </div>

    {/* Floating streak chip */}
    <div
      className="absolute -top-3 right-6 doodle-pill bg-accent px-3 py-1.5 flex items-center gap-1.5 text-sm font-extrabold animate-wiggle z-10"
      style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}
      data-testid="streak-chip"
    >
      <Flame className="h-4 w-4" /> 7-day streak
    </div>

    <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
      <div>
        <div className="text-sm font-extrabold uppercase tracking-wider text-primary">
          Welcome back
        </div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
          Morning, Nora <span className="inline-block animate-wiggle">👋</span>
        </h1>
        <p className="mt-3 text-muted-foreground text-base md:text-lg max-w-lg">
          You're on a roll. Brew something new — your fans are warming up their cups.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="doodle-btn btn-primary h-12 px-6" data-testid="cta-ai-generate">
            <Sparkles className="h-4 w-4" /> AI generate
          </button>
          <button className="doodle-btn bg-surface h-12 px-6" data-testid="cta-upload">
            <Upload className="h-4 w-4" /> Upload video
          </button>
        </div>
      </div>

      {/* Mini mock preview */}
      <div className="relative hidden md:block">
        <div
          className="rounded-[var(--radius)] border-2 border-secondary overflow-hidden aspect-[16/10] shadow-doodle"
          style={{
            background:
              "linear-gradient(135deg, hsl(8 85% 67%) 0%, hsl(45 95% 65%) 100%)",
          }}
        >
          <div className="h-full w-full flex items-center justify-center relative">
            <svg className="absolute inset-0" viewBox="0 0 300 200" fill="none">
              <path d="M20 140 Q60 110 100 140 T180 140 T260 140"
                    stroke="hsl(var(--surface))" strokeWidth="3" opacity="0.6" fill="none" strokeLinecap="round" />
            </svg>
            <div className="relative h-16 w-16 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-doodle">
              <Play className="h-6 w-6 ml-1 fill-foreground" />
            </div>
          </div>
        </div>
        <div
          className="absolute -bottom-3 -left-3 doodle-pill bg-surface px-3 py-1.5 text-xs font-extrabold"
          style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}
        >
          Ready to publish
        </div>
      </div>
    </div>
  </div>
);

const RECENT = [
  { title: "How I priced my first membership tier", ratio: "16:9", time: "2h ago", views: "1.2k", dur: "4:12", color: "from-[hsl(8_85%_67%)] to-[hsl(45_95%_65%)]" },
  { title: "Tuesday pep talk for shy creators", ratio: "9:16", time: "Yesterday", views: "842", dur: "1:08", color: "from-[hsl(170_40%_45%)] to-[hsl(152_45%_70%)]" },
  { title: "Behind the scenes — studio setup", ratio: "1:1", time: "3d ago", views: "3.4k", dur: "5:46", color: "from-[hsl(45_95%_65%)] to-[hsl(8_85%_67%)]" },
  { title: "Q&A: taxes, fans, & Friday-payday", ratio: "16:9", time: "Last week", views: "5.1k", dur: "12:30", color: "from-[hsl(170_40%_20%)] to-[hsl(170_40%_40%)]" },
];

const RecentUploads = () => (
  <div className="doodle-card p-5 md:p-6" data-testid="recent-uploads">
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">
          Library
        </div>
        <h2 className="font-display text-2xl font-extrabold">Recent uploads</h2>
      </div>
      <Link to="/dashboard/library" className="doodle-pill bg-surface text-sm font-extrabold px-4 py-2 hover:bg-muted/40">
        See all <ChevronRight className="inline h-4 w-4 -mt-0.5" />
      </Link>
    </div>

    <ul className="divide-y-2 divide-secondary/10">
      {RECENT.map((r, i) => (
        <li
          key={i}
          className="flex items-center gap-4 py-3 px-2 rounded-[calc(var(--radius)-8px)] hover:bg-muted/40 transition-colors cursor-pointer"
          data-testid={`recent-item-${i}`}
        >
          <div className={`h-14 w-20 rounded-lg border-2 border-secondary shrink-0 relative overflow-hidden bg-gradient-to-br ${r.color}`}>
            <span className="absolute bottom-1 right-1 text-[10px] font-extrabold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">
              {r.dur}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-base md:text-lg font-extrabold truncate">{r.title}</div>
            <div className="text-xs font-bold text-muted-foreground mt-0.5 flex items-center gap-3">
              <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{r.views}</span>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{r.time}</span>
              <span className="doodle-pill bg-surface px-2 py-0.5 text-[10px]">{r.ratio}</span>
            </div>
          </div>
          <button className="doodle-pill bg-surface h-9 w-9 inline-flex items-center justify-center shrink-0" aria-label="More">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background" data-testid="dashboard-page">
      <Sidebar />
      <main className="lg:pl-64">
        <TopBar />
        <div className="p-6 lg:p-10 space-y-8 max-w-[1400px]">
          <GreetingCard />

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" data-testid="stats-grid">
            <StatCard icon={TrendingUp} label="Total earnings" value="$2,489" delta="+12%" accent="bg-primary text-primary-foreground" />
            <StatCard icon={Eye} label="Views" value="18.4k" delta="+8%" accent="bg-accent text-accent-foreground" />
            <StatCard icon={Heart} label="New fans" value="312" delta="+21%" accent="bg-surface" />
            <StatCard icon={Flame} label="Streak days" value="7" delta="On fire" accent="bg-secondary text-secondary-foreground" />
          </div>

          <RecentUploads />
        </div>
      </main>
    </div>
  );
}
