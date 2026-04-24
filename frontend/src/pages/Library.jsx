import React, { useState, useMemo } from "react";
import { Search, Upload, Folder, Grid2x2, List, Sparkles, Plus, MoreHorizontal, Play } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";
import { VideoCard, FilterPill } from "../components/brewly/MediaPrimitives";

const FOLDERS = [
  { id: "all", name: "All videos", count: 42 },
  { id: "tutorials", name: "Tutorials", count: 14 },
  { id: "memberships", name: "Membership drops", count: 9 },
  { id: "shorts", name: "Shorts & clips", count: 11 },
  { id: "webinars", name: "Webinar recordings", count: 8 },
];

const VIDEOS = [
  { title: "How I priced my first membership tier", ratio: "16:9", time: "2h ago", views: "1.2k", duration: "4:12", badge: "AI", folder: "memberships", gradient: "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" },
  { title: "Tuesday pep talk for shy creators", ratio: "9:16", time: "Yesterday", views: "842", duration: "1:08", badge: "Upload", badgeColor: "bg-accent text-accent-foreground", folder: "shorts", gradient: "linear-gradient(135deg, hsl(170 40% 45%), hsl(152 45% 70%))" },
  { title: "Behind the scenes — studio setup", ratio: "1:1", time: "3d ago", views: "3.4k", duration: "5:46", badge: "AI", folder: "tutorials", gradient: "linear-gradient(135deg, hsl(45 95% 65%), hsl(8 85% 67%))" },
  { title: "Q&A: taxes, fans, & Friday-payday", ratio: "16:9", time: "Last week", views: "5.1k", duration: "12:30", badge: "Webinar", badgeColor: "bg-secondary text-secondary-foreground", folder: "webinars", gradient: "linear-gradient(135deg, hsl(170 40% 20%), hsl(170 40% 40%))" },
  { title: "Cozy morning ritual for focus", ratio: "9:16", time: "2d ago", views: "2.8k", duration: "0:58", badge: "AI", folder: "shorts", gradient: "linear-gradient(135deg, hsl(25 80% 65%), hsl(45 95% 65%))" },
  { title: "Building your first paid newsletter", ratio: "16:9", time: "4d ago", views: "4.2k", duration: "9:20", badge: "Upload", badgeColor: "bg-accent text-accent-foreground", folder: "tutorials", gradient: "linear-gradient(135deg, hsl(200 50% 55%), hsl(152 45% 70%))" },
  { title: "Member spotlight — Leo's story", ratio: "16:9", time: "1w ago", views: "1.9k", duration: "7:05", badge: "Membership", folder: "memberships", gradient: "linear-gradient(135deg, hsl(330 70% 70%), hsl(8 85% 67%))" },
  { title: "Livestream replay — launch day", ratio: "16:9", time: "2w ago", views: "6.8k", duration: "48:12", badge: "Webinar", badgeColor: "bg-secondary text-secondary-foreground", folder: "webinars", gradient: "linear-gradient(135deg, hsl(280 50% 55%), hsl(330 70% 65%))" },
  { title: "Sparkle mug — timelapse doodle", ratio: "1:1", time: "3w ago", views: "980", duration: "0:32", badge: "AI", folder: "shorts", gradient: "linear-gradient(135deg, hsl(8 85% 67%), hsl(330 70% 65%))" },
];

export default function LibraryPage() {
  const [folder, setFolder] = useState("all");
  const [q, setQ] = useState("");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return VIDEOS.filter((v) =>
      (folder === "all" || v.folder === folder) &&
      (q === "" || v.title.toLowerCase().includes(q.toLowerCase()))
    );
  }, [folder, q]);

  return (
    <DashboardLayout searchPlaceholder="Search videos, folders, tags…">
      <PageHeader
        eyebrow="Your library"
        title={<>Every sip, <span className="italic text-primary">neatly shelved.</span></>}
        subtitle="Search, organize, and brew your archive into something fans can binge."
        action={
          <div className="flex gap-2">
            <button className="doodle-btn bg-surface h-11 px-4 text-sm"><Plus className="h-4 w-4" /> New folder</button>
            <button className="doodle-btn btn-primary h-11 px-5 text-sm"><Upload className="h-4 w-4" /> Upload</button>
          </div>
        }
      />

      {/* Search + view toggle */}
      <div className="doodle-card p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search your videos by title or tag…"
            className="w-full doodle-pill bg-background border-secondary/30 pl-11 pr-4 py-2.5 text-sm font-semibold focus:outline-none focus:border-secondary focus:ring-2 focus:ring-ring/40"
            data-testid="library-search"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">View</span>
          <div className="doodle-pill bg-background p-1 flex">
            <button onClick={() => setView("grid")} className={`h-9 w-9 rounded-full flex items-center justify-center ${view === "grid" ? "bg-primary text-primary-foreground" : ""}`} data-testid="view-grid"><Grid2x2 className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} className={`h-9 w-9 rounded-full flex items-center justify-center ${view === "list" ? "bg-primary text-primary-foreground" : ""}`} data-testid="view-list"><List className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      {/* Folders */}
      <section data-testid="folders">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-xl font-extrabold flex items-center gap-2"><Folder className="h-5 w-5" /> Folders</h2>
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{FOLDERS.length} collections</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {FOLDERS.map((f) => (
            <FilterPill key={f.id} active={folder === f.id} onClick={() => setFolder(f.id)} testId={`folder-${f.id}`}>
              {f.name} <span className="ml-1.5 opacity-60">· {f.count}</span>
            </FilterPill>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-extrabold">{filtered.length} video{filtered.length === 1 ? "" : "s"}</h2>
          <button className="doodle-pill bg-surface text-sm font-extrabold px-4 py-2">Sort: Recent</button>
        </div>
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5" data-testid="library-grid">
            {filtered.map((v, i) => <VideoCard key={i} item={v} testId={`library-video-${i}`} />)}
          </div>
        ) : (
          <div className="doodle-card p-3 divide-y-2 divide-secondary/10" data-testid="library-list">
            {filtered.map((v, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-muted/30 rounded-[calc(var(--radius)-8px)]">
                <div className="h-14 w-24 rounded-lg border-2 border-secondary shrink-0 relative overflow-hidden" style={{ background: v.gradient }}>
                  <Play className="h-5 w-5 absolute inset-0 m-auto text-surface" />
                  <span className="absolute bottom-0.5 right-1 text-[10px] font-extrabold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">{v.duration}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-base md:text-lg font-extrabold truncate">{v.title}</div>
                  <div className="text-xs font-bold text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span className="doodle-pill bg-surface px-2 py-0.5">{v.ratio}</span>
                    <span>• {v.time} • {v.views} views</span>
                  </div>
                </div>
                <button className="doodle-pill bg-surface h-9 w-9 inline-flex items-center justify-center"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            ))}
          </div>
        )}
      </section>
    </DashboardLayout>
  );
}
