import React from "react";
import { TrendingUp, Eye, Heart, DollarSign, Users, Download, Calendar } from "lucide-react";
import DashboardLayout, { PageHeader } from "../components/DashboardLayout";

const HEATMAP = Array.from({ length: 24 }, (_, i) => {
  // pseudo engagement curve: rises to 70% then drops
  const x = i / 23;
  const curve = Math.sin(x * Math.PI) * 0.85 + 0.1 + (i === 8 ? 0.2 : 0) - (i > 18 ? 0.3 : 0);
  return Math.max(0.08, Math.min(1, curve));
});

const SPARK = [30, 42, 38, 55, 60, 72, 68, 80, 85, 78, 92, 88];

const TOP = [
  { title: "How I priced my first membership tier", views: "5.2k", ret: "72%", rev: "$412", color: "bg-primary" },
  { title: "Behind the scenes — studio setup", views: "3.4k", ret: "68%", rev: "$221", color: "bg-accent" },
  { title: "Cozy morning ritual for focus", views: "2.8k", ret: "81%", rev: "$180", color: "bg-[hsl(330_70%_65%)]" },
  { title: "Q&A: taxes, fans, & Friday-payday", views: "5.1k", ret: "58%", rev: "$98", color: "bg-[hsl(200_55%_55%)]" },
];

const KPI = ({ icon: Icon, label, value, delta, accent }) => (
  <div className="doodle-card p-5">
    <div className="flex items-center justify-between">
      <span className={`h-10 w-10 rounded-full border-2 border-secondary inline-flex items-center justify-center ${accent}`}>
        <Icon className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary">{delta}</span>
    </div>
    <div className="mt-4 font-display text-3xl font-extrabold leading-none">{value}</div>
    <div className="mt-2 text-sm font-bold text-muted-foreground">{label}</div>
  </div>
);

export default function AnalyticsPage() {
  return (
    <DashboardLayout searchPlaceholder="Search metrics, videos, fans…">
      <PageHeader
        eyebrow="Analytics"
        title={<>The cozy <span className="italic text-primary">numbers</span> behind the brew.</>}
        subtitle="Engagement heatmaps, view curves, and fan moments — lovingly visualized."
        action={
          <div className="flex gap-2">
            <button className="doodle-btn bg-surface h-11 px-4 text-sm"><Calendar className="h-4 w-4" /> Last 30 days</button>
            <button className="doodle-btn btn-primary h-11 px-5 text-sm"><Download className="h-4 w-4" /> Export</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5" data-testid="kpi-grid">
        <KPI icon={Eye} label="Total views" value="184k" delta="+12%" accent="bg-primary text-primary-foreground" />
        <KPI icon={TrendingUp} label="Avg. watch time" value="4m 12s" delta="+8%" accent="bg-accent text-accent-foreground" />
        <KPI icon={Heart} label="New fans" value="1,204" delta="+21%" accent="bg-surface" />
        <KPI icon={DollarSign} label="Earnings" value="$8,412" delta="+14%" accent="bg-secondary text-secondary-foreground" />
      </div>

      {/* Views chart + heatmap */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.3fr_1fr] gap-5">
        {/* Views line chart */}
        <div className="doodle-card p-6" data-testid="views-chart">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Views over time</div>
              <h2 className="font-display text-2xl font-extrabold">Last 12 weeks</h2>
            </div>
            <div className="doodle-pill bg-accent px-3 py-1 text-xs font-extrabold" style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>+38% vs prev</div>
          </div>
          <svg viewBox="0 0 400 160" className="w-full h-48">
            <defs>
              <linearGradient id="fill-warm" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(8 85% 67%)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="hsl(8 85% 67%)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* grid */}
            {[0,1,2,3].map((i) => (
              <line key={i} x1="0" x2="400" y1={40*i+10} y2={40*i+10} stroke="hsl(var(--secondary))" strokeOpacity="0.1" strokeDasharray="4 4" />
            ))}
            {/* area */}
            <path
              d={`M 0 ${150 - SPARK[0]} ${SPARK.map((v, i) => `L ${(i / (SPARK.length - 1)) * 400} ${150 - v}`).join(" ")} L 400 160 L 0 160 Z`}
              fill="url(#fill-warm)"
            />
            {/* line */}
            <path
              d={`M 0 ${150 - SPARK[0]} ${SPARK.map((v, i) => `L ${(i / (SPARK.length - 1)) * 400} ${150 - v}`).join(" ")}`}
              stroke="hsl(var(--secondary))"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {SPARK.map((v, i) => (
              <circle key={i} cx={(i / (SPARK.length - 1)) * 400} cy={150 - v} r="4" fill="hsl(var(--primary))" stroke="hsl(var(--secondary))" strokeWidth="2" />
            ))}
          </svg>
          <div className="mt-2 flex justify-between text-[11px] font-bold text-muted-foreground">
            <span>W1</span><span>W4</span><span>W8</span><span>W12</span>
          </div>
        </div>

        {/* Heatmap */}
        <div className="doodle-card p-6" data-testid="heatmap">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Engagement</div>
              <h2 className="font-display text-2xl font-extrabold">Watch heatmap</h2>
            </div>
            <div className="doodle-pill bg-surface px-3 py-1 text-xs font-extrabold">Top video</div>
          </div>
          <div className="rounded-[calc(var(--radius)-4px)] border-2 border-secondary overflow-hidden">
            <div
              className="aspect-video relative"
              style={{ background: "linear-gradient(135deg, hsl(170 40% 20%), hsl(170 40% 35%))" }}
            >
              {/* heat bars */}
              <div className="absolute inset-x-2 bottom-2 top-2 flex items-end gap-[2px]">
                {HEATMAP.map((v, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${v * 100}%`, background: `hsl(${8 + v * 30} 85% ${50 + v * 20}%)` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-between text-[11px] font-bold text-muted-foreground">
            <span>0:00</span><span>0:30</span><span>1:00</span><span>1:30</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Viewers peak around <span className="font-extrabold text-foreground">0:28</span> and drop after <span className="font-extrabold text-foreground">1:12</span>.
          </p>
        </div>
      </div>

      {/* Top videos */}
      <div className="doodle-card p-6" data-testid="top-videos">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-primary">Top performers</div>
            <h2 className="font-display text-2xl font-extrabold">Best this month</h2>
          </div>
          <div className="doodle-pill bg-surface px-3 py-1 text-xs font-extrabold inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> 12,438 viewers</div>
        </div>
        <div className="divide-y-2 divide-secondary/10">
          {TOP.map((v, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-3 py-3">
              <div className="col-span-1 font-display text-2xl font-extrabold text-muted-foreground">#{i+1}</div>
              <div className="col-span-11 md:col-span-5 min-w-0">
                <div className="font-display text-base md:text-lg font-extrabold truncate">{v.title}</div>
              </div>
              <div className="col-span-4 md:col-span-4 hidden md:block">
                <div className="h-2.5 rounded-full bg-muted overflow-hidden border border-secondary/20">
                  <div className={`h-full ${v.color}`} style={{ width: v.ret }} />
                </div>
              </div>
              <div className="col-span-6 md:col-span-1 text-sm font-extrabold">{v.views}</div>
              <div className="col-span-6 md:col-span-1 text-sm font-extrabold text-primary text-right">{v.rev}</div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
