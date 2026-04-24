import React, { useState } from "react";
import { Wand2, Sparkles, Scissors, Upload, Play, Download, Share2, Clock, Check, Zap } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";
import { FilterPill } from "../components/brewly/MediaPrimitives";

const STYLES = ["Bold & Punchy", "Cozy Tutorial", "Story Arc", "Quote Reel", "Fan Moments"];
const RATIOS = ["9:16 · TikTok/Reels", "1:1 · Feed", "16:9 · YouTube"];

const CLIPS = [
  { title: "The $0 fees promise — hook", duration: "0:24", ratio: "9:16", score: 94, gradient: "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" },
  { title: "Why creators leave big platforms", duration: "0:48", ratio: "9:16", score: 91, gradient: "linear-gradient(135deg, hsl(330 70% 65%), hsl(8 85% 67%))" },
  { title: "First $100 breakdown (honest)", duration: "1:02", ratio: "1:1", score: 88, gradient: "linear-gradient(135deg, hsl(45 95% 65%), hsl(170 40% 35%))" },
  { title: "Morning routine in 30 seconds", duration: "0:31", ratio: "9:16", score: 85, gradient: "linear-gradient(135deg, hsl(200 55% 55%), hsl(152 45% 70%))" },
];

export default function RemixPage() {
  const [style, setStyle] = useState(STYLES[1]);
  const [ratio, setRatio] = useState(RATIOS[0]);

  return (
    <DashboardLayout searchPlaceholder="Search remixes…">
      <PageHeader
        eyebrow={<span className="inline-flex items-center gap-1.5"><Sparkles className="h-3 w-3" /> Remix · AI powered</span>}
        title={<>Slice long videos into <span className="italic text-primary">scroll-stopping</span> clips.</>}
        subtitle="Drop a long video, pick a vibe — Brewly's AI pulls the best 30-second moments, captioned and on-brand."
        action={<button className="doodle-btn btn-primary h-11 px-5 text-sm"><Zap className="h-4 w-4" /> New remix</button>}
      />

      {/* Banner */}
      <div className="relative doodle-card-lg p-7 md:p-9 overflow-hidden" data-testid="remix-banner">
        <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-accent/40 blur-3xl" />
        <div className="relative grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
          <div>
            <div className="doodle-pill bg-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
              <Sparkles className="h-3.5 w-3.5" /> Beta · free for Gold
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold leading-tight">
              Drop a video. <span className="italic text-primary">Get 8 clips.</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Our AI reads your storyline, finds the punchiest moments, and exports ready-to-post shorts with captions + your branded lower-third.</p>

            {/* Dropzone */}
            <label
              htmlFor="remix-upload"
              className="mt-5 block rounded-[var(--radius)] border-2 border-dashed border-secondary/60 bg-surface/60 hover:bg-surface p-6 text-center cursor-pointer transition-colors"
              data-testid="remix-dropzone"
            >
              <div className="mx-auto h-12 w-12 rounded-full bg-primary text-primary-foreground border-2 border-secondary flex items-center justify-center shadow-doodle-sm">
                <Upload className="h-5 w-5" />
              </div>
              <div className="mt-3 font-display text-lg font-extrabold">Drop a long video here</div>
              <div className="text-xs font-bold text-muted-foreground mt-1">MP4, MOV, WEBM · up to 2 hours</div>
              <input id="remix-upload" type="file" accept="video/*" className="hidden" />
            </label>

            {/* Options */}
            <div className="mt-5 space-y-3">
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Clip style</div>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((s) => (
                    <FilterPill key={s} active={style === s} onClick={() => setStyle(s)} testId={`remix-style-${s.split(" ")[0].toLowerCase()}`}>{s}</FilterPill>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground mb-2">Aspect</div>
                <div className="flex flex-wrap gap-2">
                  {RATIOS.map((r) => (
                    <FilterPill key={r} active={ratio === r} onClick={() => setRatio(r)} testId={`remix-ratio-${r.split(":")[0]}x${r.split(":")[1].split(" ")[0]}`}>{r}</FilterPill>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-6 doodle-btn btn-primary h-12 px-6"><Wand2 className="h-4 w-4" /> Remix with AI</button>
          </div>

          {/* Visual */}
          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-[calc(var(--radius)+4px)] border-2 border-secondary overflow-hidden relative shadow-doodle-lg"
                 style={{ background: "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" }}>
              <svg className="absolute inset-0" viewBox="0 0 400 400" fill="none" aria-hidden="true">
                <g stroke="hsl(var(--secondary))" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                  <path d="M40 90 l0 20 M30 100 l20 0" />
                  <path d="M340 300 l0 18 M331 309 l18 0" />
                </g>
                <path d="M40 240 Q110 200 180 240 T320 240 T400 240" stroke="hsl(var(--surface))" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.6" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center animate-float">
                <div className="h-24 w-24 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-doodle">
                  <Scissors className="h-10 w-10" />
                </div>
              </div>
            </div>
            {/* Floating clip chips */}
            <div className="absolute -top-3 -left-3 doodle-pill bg-surface px-3 py-1.5 text-xs font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
              ✂ Clip 1 · 0:24
            </div>
            <div className="absolute -bottom-3 -right-3 doodle-pill bg-accent px-3 py-1.5 text-xs font-extrabold animate-wiggle" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
              ✨ Score 94
            </div>
          </div>
        </div>
      </div>

      {/* Recent remixes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Recent remixes</div>
            <h2 className="font-display text-2xl font-extrabold">Freshly clipped</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="doodle-pill bg-surface px-3 py-1.5 text-xs font-extrabold inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 2m avg</div>
            <div className="doodle-pill bg-accent px-3 py-1.5 text-xs font-extrabold inline-flex items-center gap-1.5" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}><Check className="h-3.5 w-3.5" /> Captioned</div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5" data-testid="remix-clips">
          {CLIPS.map((c, i) => (
            <div key={i} className="doodle-card p-4" data-testid={`remix-clip-${i}`}>
              <div className="relative aspect-[9/16] rounded-[calc(var(--radius)-4px)] border-2 border-secondary overflow-hidden shadow-doodle-sm" style={{ background: c.gradient }}>
                <div className="absolute top-2.5 left-2.5 doodle-pill bg-surface px-2 py-0.5 text-[10px] font-extrabold">{c.ratio}</div>
                <span className="absolute bottom-2 right-2 text-[10px] font-extrabold bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-sm">{c.duration}</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-doodle-sm">
                    <Play className="h-5 w-5 ml-0.5 fill-foreground" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 doodle-pill bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
                  ✨ {c.score}
                </div>
              </div>
              <div className="mt-3 font-display text-sm font-extrabold leading-tight line-clamp-2">{c.title}</div>
              <div className="mt-3 flex gap-1.5">
                <button className="doodle-pill bg-surface flex-1 py-1.5 text-xs font-extrabold inline-flex items-center justify-center gap-1"><Download className="h-3.5 w-3.5" /> Save</button>
                <button className="doodle-pill bg-primary text-primary-foreground px-2 py-1.5 text-xs font-extrabold inline-flex items-center gap-1" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}><Share2 className="h-3.5 w-3.5" /> Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
