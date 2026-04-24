import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight, Sparkles, Play, Upload, Flame, TrendingUp, Clock, Eye,
  MoreHorizontal, Heart,
} from "lucide-react";
import DashboardLayout from "../components/DashboardLayout";

const StatCard = ({ icon: Icon, label, value, delta, accent }) => (
  <div className="doodle-card p-5" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
    <div className="flex items-center justify-between">
      <span className={`h-10 w-10 rounded-full border-2 border-secondary inline-flex items-center justify-center ${accent}`}>
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">Last 7d</span>
    </div>
    <div className="mt-4 font-display text-3xl font-extrabold leading-none">{value}</div>
    <div className="mt-2 flex items-center justify-between">
      <span className="text-sm font-bold text-muted-foreground">{label}</span>
      <span className="text-xs font-extrabold text-primary">{delta}</span>
    </div>
  </div>
);

const GreetingCard = () => (
  <div className="relative doodle-card-lg p-7 md:p-10" data-testid="greeting-card">
    <div className="absolute inset-0 rounded-[var(--radius)] overflow-hidden pointer-events-none">
      <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />
      <div className="absolute -left-10 -bottom-10 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
    </div>
    <div
      className="absolute -top-3 right-6 doodle-pill bg-accent px-3 py-1.5 flex items-center gap-1.5 text-sm font-extrabold animate-wiggle z-10"
      style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}
      data-testid="streak-chip"
    >
      <Flame className="h-4 w-4" /> 7-day streak
    </div>
    <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-8 items-center">
      <div>
        <div className="text-sm font-extrabold uppercase tracking-wider text-primary">Welcome back</div>
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
      <div className="relative hidden md:block">
        <div
          className="rounded-[var(--radius)] border-2 border-secondary overflow-hidden aspect-[16/10] shadow-doodle"
          style={{ background: "linear-gradient(135deg, hsl(8 85% 67%) 0%, hsl(45 95% 65%) 100%)" }}
        >
          <div className="h-full w-full flex items-center justify-center relative">
            <svg className="absolute inset-0" viewBox="0 0 300 200" fill="none">
              <path d="M20 140 Q60 110 100 140 T180 140 T260 140" stroke="hsl(var(--surface))" strokeWidth="3" opacity="0.6" fill="none" strokeLinecap="round" />
            </svg>
            <div className="relative h-16 w-16 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-doodle">
              <Play className="h-6 w-6 ml-1 fill-foreground" />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-3 -left-3 doodle-pill bg-surface px-3 py-1.5 text-xs font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
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
        <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Library</div>
        <h2 className="font-display text-2xl font-extrabold">Recent uploads</h2>
      </div>
      <Link to="/dashboard/library" className="doodle-pill bg-surface text-sm font-extrabold px-4 py-2 hover:bg-muted/40">
        See all <ChevronRight className="inline h-4 w-4 -mt-0.5" />
      </Link>
    </div>
    <ul className="divide-y-2 divide-secondary/10">
      {RECENT.map((r, i) => (
        <li key={i} className="flex items-center gap-4 py-3 px-2 rounded-[calc(var(--radius)-8px)] hover:bg-muted/40 transition-colors cursor-pointer" data-testid={`recent-item-${i}`}>
          <div className={`h-14 w-20 rounded-lg border-2 border-secondary shrink-0 relative overflow-hidden bg-gradient-to-br ${r.color}`}>
            <span className="absolute bottom-1 right-1 text-[10px] font-extrabold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">{r.dur}</span>
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
    <DashboardLayout>
      <GreetingCard />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" data-testid="stats-grid">
        <StatCard icon={TrendingUp} label="Total earnings" value="$2,489" delta="+12%" accent="bg-primary text-primary-foreground" />
        <StatCard icon={Eye} label="Views" value="18.4k" delta="+8%" accent="bg-accent text-accent-foreground" />
        <StatCard icon={Heart} label="New fans" value="312" delta="+21%" accent="bg-surface" />
        <StatCard icon={Flame} label="Streak days" value="7" delta="On fire" accent="bg-secondary text-secondary-foreground" />
      </div>
      <RecentUploads />
    </DashboardLayout>
  );
}
