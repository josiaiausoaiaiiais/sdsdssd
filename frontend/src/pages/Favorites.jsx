import React, { useState } from "react";
import { Heart, Search, Sparkles, Share2 } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";
import { VideoCard, FilterPill, EmptyState } from "../components/brewly/MediaPrimitives";

const FAVES = [
  { title: "The cozy creator's guide to pricing", ratio: "16:9", time: "Saved 2h ago", views: "12.4k", duration: "9:02", badge: "Saved", gradient: "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" },
  { title: "Make your first $100 — honest breakdown", ratio: "9:16", time: "Saved yesterday", views: "30.1k", duration: "2:44", badge: "Saved", badgeColor: "bg-accent text-accent-foreground", gradient: "linear-gradient(135deg, hsl(25 80% 65%), hsl(8 85% 67%))" },
  { title: "Loved this intro tune for clips", ratio: "1:1", time: "Saved 3d ago", views: "4.2k", duration: "0:20", badge: "Audio", gradient: "linear-gradient(135deg, hsl(280 50% 65%), hsl(330 70% 70%))" },
  { title: "Interview with Ada on creator taxes", ratio: "16:9", time: "Saved last week", views: "9.8k", duration: "28:10", badge: "Watch later", badgeColor: "bg-secondary text-secondary-foreground", gradient: "linear-gradient(135deg, hsl(170 40% 25%), hsl(170 40% 45%))" },
  { title: "3 hooks that doubled my shares", ratio: "9:16", time: "Saved 2w ago", views: "18k", duration: "1:12", badge: "Saved", gradient: "linear-gradient(135deg, hsl(45 95% 65%), hsl(8 85% 67%))" },
  { title: "Studio lighting on a tiny budget", ratio: "16:9", time: "Saved a month ago", views: "6.7k", duration: "6:30", badge: "Saved", badgeColor: "bg-accent text-accent-foreground", gradient: "linear-gradient(135deg, hsl(200 55% 55%), hsl(152 45% 70%))" },
];

const FILTERS = ["All", "From creators", "Watch later", "Clips", "Audio"];

export default function FavoritesPage() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const list = FAVES.filter((v) => q === "" || v.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <DashboardLayout searchPlaceholder="Search favorites…">
      <PageHeader
        eyebrow="Favorites"
        title={<>Little things <span className="italic text-primary">you loved.</span></>}
        subtitle="Your hand-picked shelf of saved videos, clips, and inspiration — always a click away."
        action={
          <div className="flex gap-2">
            <button className="doodle-btn bg-surface h-11 px-4 text-sm"><Share2 className="h-4 w-4" /> Share shelf</button>
            <button className="doodle-btn btn-primary h-11 px-5 text-sm"><Sparkles className="h-4 w-4" /> Find more</button>
          </div>
        }
      />

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="fav-stats">
        {[
          { v: FAVES.length, l: "Saved" },
          { v: "4", l: "Creators" },
          { v: "2h 14m", l: "Watch time" },
          { v: "12", l: "This month" },
        ].map((s) => (
          <div key={s.l} className="doodle-card p-4 text-center">
            <div className="font-display text-2xl font-extrabold">{s.v}</div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Filter + search */}
      <div className="doodle-card p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your favorites…"
            className="w-full doodle-pill bg-background border-secondary/30 pl-11 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-secondary focus:ring-2 focus:ring-ring/40"
            data-testid="fav-search"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <FilterPill key={f} active={tab === f} onClick={() => setTab(f)} testId={`fav-filter-${f.toLowerCase().replace(/\s+/g, "-")}`}>{f}</FilterPill>
          ))}
        </div>
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          subtitle="Tap the little heart on any video to tuck it onto your cozy shelf."
          cta={<button className="doodle-btn btn-primary h-11 px-5 text-sm">Browse library</button>}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" data-testid="fav-grid">
          {list.map((v, i) => (
            <div key={i} className="relative">
              <VideoCard item={v} testId={`fav-video-${i}`} />
              <button className="absolute top-6 right-6 h-9 w-9 rounded-full bg-surface border-2 border-secondary inline-flex items-center justify-center shadow-doodle-sm" aria-label="Unfavorite">
                <Heart className="h-4 w-4 fill-primary text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
