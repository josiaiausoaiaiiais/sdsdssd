import React, { useState } from "react";
import { Calendar, Users, Radio, Clock, Plus, Play, Bot, ChevronRight, Link2, Copy, Mic } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";
import { FilterPill } from "../components/brewly/MediaPrimitives";

const UPCOMING = [
  { title: "Monetizing a tiny niche — live workshop", date: "Tue, Feb 11", time: "6:00 PM", dur: "90 min", guests: 8, seats: 143, mode: "Live", accent: "from-[hsl(8_85%_67%)] to-[hsl(45_95%_65%)]" },
  { title: "Office hours — pricing clinic", date: "Fri, Feb 14", time: "2:00 PM", dur: "60 min", guests: 0, seats: 58, mode: "Automated", accent: "from-[hsl(200_55%_55%)] to-[hsl(152_45%_70%)]" },
  { title: "Cozy creator Q&A with Ada & Leo", date: "Sat, Feb 22", time: "11:00 AM", dur: "75 min", guests: 2, seats: 221, mode: "Live", accent: "from-[hsl(330_70%_65%)] to-[hsl(8_85%_67%)]" },
];

const PAST = [
  { title: "Launch day replay — Brewly Gold", date: "Jan 28", attended: 412, rating: "4.9" },
  { title: "Tuesday pep talk masterclass", date: "Jan 14", attended: 186, rating: "4.8" },
  { title: "First $1k breakdown — honest Q&A", date: "Dec 20", attended: 523, rating: "5.0" },
];

export default function WebinarsPage() {
  const [tab, setTab] = useState("Upcoming");

  return (
    <DashboardLayout searchPlaceholder="Search webinars, attendees…">
      <PageHeader
        eyebrow="Webinars"
        title={<>Host it <span className="italic text-primary">live.</span> Or let the robots do it.</>}
        subtitle="Schedule live sessions or run automated evergreen webinars — all cozy, all on-brand."
        action={
          <div className="flex gap-2">
            <button className="doodle-btn bg-surface h-11 px-4 text-sm"><Bot className="h-4 w-4" /> Automate</button>
            <button className="doodle-btn btn-primary h-11 px-5 text-sm"><Plus className="h-4 w-4" /> New webinar</button>
          </div>
        }
      />

      {/* Hero card — next session */}
      <div className="relative doodle-card-lg p-7 md:p-8 overflow-hidden" data-testid="next-session">
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -left-12 -bottom-12 h-56 w-56 rounded-full bg-accent/35 blur-3xl" />
        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-6 items-center">
          <div>
            <div className="doodle-pill bg-accent inline-flex items-center gap-1.5 px-3 py-1 text-xs font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse" /> Next up
            </div>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-extrabold leading-tight">Monetizing a tiny niche — live workshop</h2>
            <div className="mt-3 flex flex-wrap gap-4 text-sm font-bold text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Tue, Feb 11 · 6:00 PM</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" /> 90 min</span>
              <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4" /> 143 registered</span>
            </div>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button className="doodle-btn btn-primary h-12 px-6"><Radio className="h-4 w-4" /> Open green room</button>
              <button className="doodle-btn bg-surface h-12 px-6"><Link2 className="h-4 w-4" /> Copy invite</button>
            </div>
          </div>
          <div
            className="aspect-[16/10] rounded-[var(--radius)] border-2 border-secondary overflow-hidden shadow-doodle relative"
            style={{ background: "linear-gradient(135deg, hsl(8 85% 67%), hsl(45 95% 65%))" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-surface border-2 border-secondary flex items-center justify-center shadow-doodle">
                <Mic className="h-6 w-6" />
              </div>
            </div>
            <div className="absolute top-3 left-3 doodle-pill bg-surface px-2.5 py-1 text-[10px] font-extrabold">Brewly Studio</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {["Upcoming", "Past", "Automated"].map((t) => (
          <FilterPill key={t} active={tab === t} onClick={() => setTab(t)} testId={`webinar-tab-${t.toLowerCase()}`}>{t}</FilterPill>
        ))}
      </div>

      {tab === "Upcoming" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5" data-testid="upcoming-grid">
          {UPCOMING.map((w, i) => (
            <div key={i} className="doodle-card p-5 flex flex-col" data-testid={`upcoming-${i}`}>
              <div className={`aspect-[16/9] rounded-[calc(var(--radius)-4px)] border-2 border-secondary mb-4 bg-gradient-to-br ${w.accent} relative overflow-hidden`}>
                <span className="absolute top-2 left-2 doodle-pill bg-surface px-2.5 py-1 text-[10px] font-extrabold">{w.mode}</span>
              </div>
              <h3 className="font-display text-lg font-extrabold leading-tight">{w.title}</h3>
              <div className="mt-2 text-xs font-bold text-muted-foreground space-y-1">
                <div className="inline-flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {w.date} · {w.time}</div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {w.dur}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {w.seats} seats</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="doodle-btn btn-primary h-10 px-4 text-sm flex-1"><Play className="h-3.5 w-3.5" /> Open</button>
                <button className="doodle-pill bg-surface h-10 w-10 inline-flex items-center justify-center"><Copy className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Past" && (
        <div className="doodle-card p-3 divide-y-2 divide-secondary/10" data-testid="past-list">
          {PAST.map((p, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <div className="h-12 w-12 rounded-full bg-accent border-2 border-secondary flex items-center justify-center"><Radio className="h-5 w-5" /></div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-lg font-extrabold truncate">{p.title}</div>
                <div className="text-xs font-bold text-muted-foreground mt-0.5">{p.date} · {p.attended} attended · ⭐ {p.rating}</div>
              </div>
              <button className="doodle-pill bg-surface text-sm font-extrabold px-4 py-2">Replay <ChevronRight className="inline h-3.5 w-3.5" /></button>
            </div>
          ))}
        </div>
      )}

      {tab === "Automated" && (
        <div className="doodle-card p-8 text-center" data-testid="automated-state">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground border-2 border-secondary flex items-center justify-center shadow-doodle-sm"><Bot className="h-7 w-7" /></div>
          <h3 className="mt-4 font-display text-2xl font-extrabold">Set it once. Sip forever.</h3>
          <p className="mt-2 text-muted-foreground max-w-md mx-auto">Turn any recording into an evergreen webinar. We'll handle the rooms, reminders, and replays.</p>
          <button className="mt-5 doodle-btn btn-primary h-11 px-5 text-sm"><Plus className="h-4 w-4" /> Create automation</button>
        </div>
      )}
    </DashboardLayout>
  );
}
