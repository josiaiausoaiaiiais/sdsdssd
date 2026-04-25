import React, { useState, useMemo } from "react";
import { Heart, Search, Sparkles, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";
import { VideoCard, FilterPill, EmptyState } from "../components/brewly/MediaPrimitives";
import { useFavorites, useUploads, relTime, fmtDuration } from "../lib/data";

const FILTERS = ["All", "Wide", "Shorts", "AI", "Uploads"];

export default function FavoritesPage() {
  const [tab, setTab] = useState("All");
  const [q, setQ] = useState("");
  const { items: favs, toggle } = useFavorites();
  const { items: allUploads } = useUploads();

  const list = useMemo(() => {
    if (!favs) return null;
    return favs.filter((v) => {
      const matchesTab = tab === "All" ||
        (tab === "Wide" && v.ratio === "16:9") ||
        (tab === "Shorts" && v.ratio === "9:16") ||
        (tab === "AI" && v.source === "ai") ||
        (tab === "Uploads" && v.source === "upload");
      const matchesQ = q === "" || v.title.toLowerCase().includes(q.toLowerCase());
      return matchesTab && matchesQ;
    });
  }, [favs, tab, q]);

  const totalUploads = allUploads?.length ?? 0;
  const totalFavs = favs?.length ?? 0;
  const watchSec = (favs || []).reduce((s, v) => s + (v.duration_sec || 0), 0);
  const watchTime = watchSec >= 3600 ? `${Math.floor(watchSec/3600)}h ${Math.floor((watchSec%3600)/60)}m` : `${Math.floor(watchSec/60)}m`;

  const toCardItem = (v) => ({
    title: v.title, ratio: v.ratio, time: relTime(v.created_at),
    views: `${v.views}`, duration: fmtDuration(v.duration_sec),
    badge: "Saved", badgeColor: "bg-primary text-primary-foreground", gradient: v.thumbnail,
  });

  return (
    <DashboardLayout searchPlaceholder="Search favorites…">
      <PageHeader
        eyebrow="Favorites"
        title={<>Little things <span className="italic text-primary">you loved.</span></>}
        subtitle="Your hand-picked shelf of saved videos — always a click away."
        action={
          <div className="flex gap-2">
            <button className="doodle-btn bg-surface h-11 px-4 text-sm"><Share2 className="h-4 w-4" /> Share shelf</button>
            <Link to="/dashboard/library" className="doodle-btn btn-primary h-11 px-5 text-sm"><Sparkles className="h-4 w-4" /> Find more</Link>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="fav-stats">
        {[
          { v: totalFavs, l: "Saved" },
          { v: totalUploads, l: "In library" },
          { v: watchTime || "0m", l: "Watch time" },
          { v: tab === "All" ? totalFavs : (list?.length ?? 0), l: "Showing" },
        ].map((s) => (
          <div key={s.l} className="doodle-card p-4 text-center">
            <div className="font-display text-2xl font-extrabold">{s.v}</div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <div className="doodle-card p-5 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search your favorites…"
            className="w-full doodle-pill bg-background border-secondary/30 pl-11 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-secondary focus:ring-2 focus:ring-ring/40"
            data-testid="fav-search" />
        </div>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <FilterPill key={f} active={tab === f} onClick={() => setTab(f)} testId={`fav-filter-${f.toLowerCase()}`}>{f}</FilterPill>
          ))}
        </div>
      </div>

      {list === null ? (
        <div className="doodle-card p-10 text-center text-muted-foreground font-bold">Loading your shelf…</div>
      ) : list.length === 0 ? (
        <EmptyState icon={Heart}
          title={totalFavs === 0 ? "No favorites yet" : "Nothing matches that filter"}
          subtitle={totalFavs === 0 ? "Tap the heart on any library video to tuck it onto your cozy shelf." : "Try a different filter or search."}
          cta={<Link to="/dashboard/library" className="doodle-btn btn-primary h-11 px-5 text-sm">Browse library</Link>} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" data-testid="fav-grid">
          {list.map((v, i) => (
            <div key={v.id} className="relative">
              <VideoCard item={toCardItem(v)} testId={`fav-video-${i}`} />
              <button onClick={() => toggle(v.id, true)} className="absolute top-6 right-6 h-9 w-9 rounded-full bg-surface border-2 border-secondary inline-flex items-center justify-center shadow-doodle-sm" aria-label="Unfavorite" data-testid={`fav-toggle-${i}`}>
                <Heart className="h-4 w-4 fill-primary text-primary" />
              </button>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
