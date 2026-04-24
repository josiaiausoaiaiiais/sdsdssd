import React from "react";
import { Plus, Copy, Code2, Eye, Play, ExternalLink, Sparkles } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";

const CHANNELS = [
  { name: "Cozy Creator School", slug: "cozy-creator", videos: 14, views: "48k", color: "from-[hsl(8_85%_67%)] to-[hsl(45_95%_65%)]", tagline: "A warm series on turning craft into income." },
  { name: "Friday Payday Club", slug: "friday-payday", videos: 9, views: "22k", color: "from-[hsl(200_55%_55%)] to-[hsl(152_45%_70%)]", tagline: "Weekly money wins from tiny creators." },
  { name: "Studio Doodles", slug: "studio-doodles", videos: 21, views: "61k", color: "from-[hsl(45_95%_65%)] to-[hsl(8_85%_67%)]", tagline: "Behind-the-scenes sketches & timelapses." },
  { name: "Brewly Book Club", slug: "book-club", videos: 6, views: "14k", color: "from-[hsl(330_70%_65%)] to-[hsl(280_50%_60%)]", tagline: "Monthly reads for curious creators." },
];

export default function ChannelsPage() {
  return (
    <DashboardLayout searchPlaceholder="Search channels, videos…">
      <PageHeader
        eyebrow="Channels"
        title={<>Pour playlists into <span className="italic text-primary">branded</span> shelves.</>}
        subtitle="Group your videos into cozy, embeddable collections — each with its own brand, vibe, and share link."
        action={<button className="doodle-btn btn-primary h-11 px-5 text-sm"><Plus className="h-4 w-4" /> New channel</button>}
      />

      {/* Featured channel with embed preview */}
      <div className="doodle-card-lg p-6 md:p-8 grid lg:grid-cols-[1.1fr_1fr] gap-8 items-center" data-testid="featured-channel">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-primary">Featured channel</div>
          <h2 className="mt-1 font-display text-3xl md:text-4xl font-extrabold">Cozy Creator School</h2>
          <p className="mt-2 text-muted-foreground">A warm 14-video series on turning your craft into rent money. Embedded on 34 creator sites already.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <div className="doodle-pill bg-surface px-4 py-2 text-sm font-extrabold">14 videos</div>
            <div className="doodle-pill bg-surface px-4 py-2 text-sm font-extrabold">48k views</div>
            <div className="doodle-pill bg-accent px-4 py-2 text-sm font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>Brewly.to/cozy-creator</div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="doodle-btn btn-primary h-12 px-6 text-sm"><Code2 className="h-4 w-4" /> Copy embed</button>
            <button className="doodle-btn bg-surface h-12 px-6 text-sm"><ExternalLink className="h-4 w-4" /> Open page</button>
          </div>
        </div>
        <div className="relative">
          {/* Browser mock with channel grid */}
          <div className="doodle-card p-4" style={{ background: "hsl(var(--background))" }}>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
              <span className="h-2.5 w-2.5 rounded-full bg-accent" />
              <span className="h-2.5 w-2.5 rounded-full bg-[hsl(152_45%_55%)]" />
              <div className="ml-2 doodle-pill bg-surface px-2 py-0.5 text-[10px] font-bold truncate">brewly.to/cozy-creator</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-video rounded-md border-2 border-secondary relative overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(${(i*40)%360} 70% 65%), hsl(${(i*40+60)%360} 80% 70%))` }}>
                  <Play className="h-4 w-4 absolute inset-0 m-auto text-surface" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channels grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-2xl font-extrabold">All channels</h2>
          <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">{CHANNELS.length} collections</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" data-testid="channels-grid">
          {CHANNELS.map((c, i) => (
            <div key={c.slug} className="doodle-card p-5 flex gap-4" data-testid={`channel-${c.slug}`}>
              <div className={`w-28 shrink-0 aspect-square rounded-[calc(var(--radius)-4px)] border-2 border-secondary bg-gradient-to-br ${c.color} relative shadow-doodle-sm`}>
                <Sparkles className="h-4 w-4 absolute top-2 right-2 text-surface" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <h3 className="font-display text-xl font-extrabold leading-tight">{c.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.tagline}</p>
                <div className="mt-auto pt-3 flex items-center justify-between">
                  <div className="flex gap-2 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    <span>{c.videos} videos</span><span>•</span><span>{c.views} views</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="doodle-pill bg-surface h-9 w-9 inline-flex items-center justify-center" aria-label="Preview"><Eye className="h-4 w-4" /></button>
                    <button className="doodle-pill bg-surface h-9 w-9 inline-flex items-center justify-center" aria-label="Copy embed"><Copy className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
