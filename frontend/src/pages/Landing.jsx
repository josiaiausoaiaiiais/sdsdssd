import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight, Check, Sparkles, Mail, Twitter, Instagram, Youtube } from "lucide-react";
import { BrewlyLogo, HeroIllustration, FiveStars } from "../components/brewly/Illustrations";

const NAV_LINKS = [
  { label: "How it works", href: "#how" },
  { label: "Features", href: "#features" },
  { label: "Creators", href: "#creators" },
  { label: "Pricing", href: "#pricing" },
];

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      data-testid="landing-nav"
    >
      <div className="container">
        <div
          className={`doodle-pill bg-surface/90 backdrop-blur-md px-3 py-2 flex items-center justify-between transition-shadow ${scrolled ? "shadow-doodle-sm" : ""}`}
        >
          <Link to="/" className="flex items-center gap-2 pl-2 pr-3 py-1 group" data-testid="nav-logo">
            <BrewlyLogo size={36} className="transition-transform group-hover:-rotate-6" />
            <span className="font-display text-2xl font-extrabold tracking-tight">Brewly</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-4 py-2 rounded-full font-bold text-sm text-foreground/80 hover:text-foreground hover:bg-muted/60 transition-colors"
                data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 rounded-full font-bold text-sm hover:bg-muted/60 transition-colors"
              data-testid="nav-login"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className="doodle-btn btn-primary text-sm px-5 py-2.5"
              data-testid="nav-signup"
            >
              Sign up free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className="md:hidden doodle-pill h-10 w-10 inline-flex items-center justify-center bg-surface"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              data-testid="nav-menu-toggle"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 doodle-card p-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 rounded-full font-bold hover:bg-muted/60"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-10 md:pt-14 pb-20 md:pb-28 grain" data-testid="hero">
      {/* Decorative halos */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-1/3 -right-20 h-96 w-96 rounded-full bg-accent/35 blur-3xl" />
      </div>

      <div className="container relative grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left column */}
        <div className="animate-fade-up">
          <div
            className="doodle-pill inline-flex items-center gap-2 bg-surface px-4 py-1.5 text-sm font-extrabold"
            data-testid="hero-badge"
          >
            <span className="h-2 w-2 rounded-full bg-primary inline-block" />
            No fees. Ever. Pinky promise.
          </div>

          <h1
            className="mt-6 font-display font-extrabold tracking-tight text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02]"
            data-testid="hero-headline"
          >
            Earn from{" "}
            <span className="italic text-primary font-[700]">the&nbsp;people</span>
            <br className="hidden sm:block" /> who love what you do.
          </h1>

          <p
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-[34rem] leading-relaxed"
            data-testid="hero-subhead"
          >
            Brewly is the cozy home for creators to collect tips, run memberships,
            and sell little things — all on one joyful page. Three sips and you're live.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              to="/signup"
              className="doodle-btn btn-primary text-base md:text-lg h-14 px-7"
              data-testid="hero-cta-primary"
            >
              Start your page — free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#how"
              className="doodle-btn btn-ghost text-base md:text-lg h-14 px-6 border-transparent hover:bg-surface"
              data-testid="hero-cta-secondary"
            >
              See how it works →
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4" data-testid="hero-proof">
            <FiveStars />
            <p className="text-sm md:text-base font-bold text-muted-foreground">
              <span className="text-foreground">400,000+ creators</span> already brewing.
            </p>
          </div>

          {/* Inline trust strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl" data-testid="hero-trust">
            {[
              { v: "$48M+", l: "tipped" },
              { v: "0%", l: "fees" },
              { v: "60s", l: "setup" },
              { v: "4.9/5", l: "rating" },
            ].map((s, i) => (
              <div
                key={s.v}
                className="doodle-pill bg-surface px-4 py-3 text-center"
                style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))", animationDelay: `${i * 80}ms` }}
              >
                <div className="font-display text-xl md:text-2xl font-extrabold leading-none">{s.v}</div>
                <div className="mt-1 text-[11px] font-extrabold uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      n: 1, color: "hsl(8 85% 67%)", title: "Brew your page",
      body: "Pick a name, add a bio, drop your face. Three sips and your cozy creator page is live.",
      illo: (
        <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
          <ellipse cx="60" cy="100" rx="40" ry="6" fill="hsl(var(--secondary))" opacity="0.15" />
          <rect x="22" y="40" width="58" height="56" rx="10" fill="hsl(var(--surface))" stroke="hsl(var(--secondary))" strokeWidth="3" />
          <path d="M80 54c14 0 18 8 18 14s-4 14-18 14" stroke="hsl(var(--secondary))" strokeWidth="3" fill="none" strokeLinecap="round" />
          <rect x="26" y="44" width="50" height="8" rx="3" fill="hsl(8 85% 67%)" />
          <path d="M38 28c4-6 0-10 4-16 M58 28c4-6 0-10 4-16" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinecap="round" fill="none" />
          <circle cx="40" cy="68" r="2.5" fill="hsl(var(--secondary))" /><circle cx="62" cy="68" r="2.5" fill="hsl(var(--secondary))" />
          <path d="M40 78c5 5 17 5 22 0" stroke="hsl(var(--secondary))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      n: 2, color: "hsl(45 95% 65%)", title: "Share with your people",
      body: "Drop your link in bio, on socials, or in a newsletter. Every fan finds you with one tap.",
      illo: (
        <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
          <ellipse cx="60" cy="100" rx="40" ry="6" fill="hsl(var(--secondary))" opacity="0.15" />
          <path d="M30 60c10-20 50-20 60 0s-10 35-30 35S20 80 30 60z" fill="hsl(45 95% 65%)" stroke="hsl(var(--secondary))" strokeWidth="3" />
          <path d="M36 56c-4-3 0-9 4-7 M44 50c-2-3 1-7 5-5" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <circle cx="46" cy="68" r="3" fill="hsl(var(--secondary))" /><circle cx="74" cy="68" r="3" fill="hsl(var(--secondary))" />
          <path d="M50 80c4 5 12 5 18 0" stroke="hsl(var(--secondary))" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M22 32 l4 6 M98 28 l-4 6" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="20" cy="46" r="3" fill="hsl(8 85% 67%)" stroke="hsl(var(--secondary))" strokeWidth="2" />
        </svg>
      ),
    },
    {
      n: 3, color: "hsl(170 40% 35%)", title: "Get paid Friday",
      body: "Tips, memberships, shop sales — paid out every week. No fees, no fuss, ever.",
      illo: (
        <svg viewBox="0 0 120 120" className="h-28 w-28" aria-hidden="true">
          <ellipse cx="60" cy="100" rx="40" ry="6" fill="hsl(var(--secondary))" opacity="0.15" />
          <path d="M40 50c-8-12 8-22 20-12 12-10 28 0 20 12 4 12 -10 22 -20 30 -10-8 -24-18 -20-30z"
                fill="hsl(8 85% 67%)" stroke="hsl(var(--secondary))" strokeWidth="3" strokeLinejoin="round" />
          <text x="60" y="78" textAnchor="middle" fontFamily="Fraunces" fontWeight="800" fontSize="24" fill="hsl(var(--surface))">$</text>
          <path d="M22 32 l3 5 M28 24 l5 3" stroke="hsl(45 95% 65%)" strokeWidth="3" strokeLinecap="round" />
          <path d="M92 30 l4 4 M98 22 l4 4" stroke="hsl(45 95% 65%)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how" className="py-20 md:py-28 grain" data-testid="how-it-works">
      <div className="pointer-events-none absolute inset-x-0 -translate-y-10 overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 h-72 w-[40rem] rounded-full bg-accent/20 blur-3xl" />
      </div>
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary inline-flex items-center gap-1.5 doodle-pill bg-surface px-3 py-1">
            <Sparkles className="h-3 w-3" /> How it works
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
            Three sips and you're <span className="italic text-primary">live.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">From empty mug to Friday-payday in about the time it takes to brew a real one.</p>
        </div>

        <div className="relative mt-14 grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Wavy connector */}
          <svg className="hidden md:block absolute top-12 left-[16%] right-[16%] h-12 w-[68%] z-0" viewBox="0 0 800 40" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 20 Q100 0 200 20 T400 20 T600 20 T800 20" stroke="hsl(var(--secondary))" strokeWidth="2.5" strokeDasharray="3 8" fill="none" strokeLinecap="round" opacity="0.4" />
          </svg>
          {steps.map((s) => (
            <div key={s.n} className="relative doodle-card p-7 pt-9 z-10" data-testid={`step-${s.n}`}>
              <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full border-2 border-secondary flex items-center justify-center font-display text-xl font-extrabold shadow-doodle-sm"
                   style={{ background: s.color, color: "hsl(var(--surface))" }}>
                {s.n}
              </div>
              <div className="flex justify-center">{s.illo}</div>
              <h3 className="mt-4 font-display text-2xl font-extrabold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const [yearly, setYearly] = useState(false);
  const tiers = [
    {
      name: "Free", tagline: "For curious creators", priceMonthly: 0, priceYearly: 0,
      cta: "Start your page", emphasized: false,
      features: ["Cozy public page", "Tips with 0% fees", "Up to 3 videos", "Brewly subdomain", "Friendly email support"],
    },
    {
      name: "Brewly Gold", tagline: "For creators making it count", priceMonthly: 9, priceYearly: 7,
      cta: "Brew Gold — free 14d trial", emphasized: true,
      features: ["Everything in Free", "Memberships + paid drops", "Unlimited videos & remixes", "Custom domain + branding", "Embeddable channels", "Analytics & heatmaps", "Priority support"],
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 relative" data-testid="pricing">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 right-1/4 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      </div>
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary inline-flex items-center gap-1.5 doodle-pill bg-surface px-3 py-1">
            <Sparkles className="h-3 w-3" /> Pricing
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold leading-[1.05]">
            Honest pricing. <span className="italic text-primary">No fine print.</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg">Always 0% fees on tips. Upgrade only if you want the deluxe shelves.</p>

          {/* Toggle */}
          <div className="mt-7 inline-flex doodle-pill bg-surface p-1" data-testid="pricing-toggle">
            <button onClick={() => setYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-extrabold transition-colors ${!yearly ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_hsl(var(--secondary))]" : ""}`}
              data-testid="toggle-monthly">Monthly</button>
            <button onClick={() => setYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-extrabold transition-colors flex items-center gap-1.5 ${yearly ? "bg-primary text-primary-foreground shadow-[2px_2px_0_0_hsl(var(--secondary))]" : ""}`}
              data-testid="toggle-yearly">
              Yearly <span className={`text-[10px] doodle-pill px-2 py-0.5 ${yearly ? "bg-accent text-accent-foreground" : "bg-accent text-accent-foreground"}`}>Save 22%</span>
            </button>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {tiers.map((t) => {
            const price = yearly ? t.priceYearly : t.priceMonthly;
            return (
              <div key={t.name}
                className={`relative ${t.emphasized ? "doodle-card-lg bg-secondary text-secondary-foreground" : "doodle-card"} p-7 md:p-8 flex flex-col`}
                data-testid={`tier-${t.name.toLowerCase().replace(/\s+/g, "-")}`}>
                {t.emphasized && (
                  <div className="absolute -top-3 right-7 doodle-pill bg-accent text-accent-foreground px-3 py-1 text-xs font-extrabold animate-wiggle"
                       style={{ boxShadow: "2px 2px 0 0 hsl(var(--secondary))" }}>
                    ⭐ Most loved
                  </div>
                )}
                <div className={`text-xs font-extrabold uppercase tracking-wider ${t.emphasized ? "text-accent" : "text-primary"}`}>{t.tagline}</div>
                <h3 className="mt-2 font-display text-3xl font-extrabold">{t.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold">${price}</span>
                  <span className={`text-sm font-bold ${t.emphasized ? "text-secondary-foreground/60" : "text-muted-foreground"}`}>/{yearly ? "mo, billed yearly" : "month"}</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm font-bold">
                      <span className={`h-5 w-5 shrink-0 rounded-full inline-flex items-center justify-center mt-0.5 ${t.emphasized ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"}`}>
                        <Check className="h-3 w-3" strokeWidth={3.5} />
                      </span>
                      <span className={t.emphasized ? "text-secondary-foreground/85" : "text-foreground/85"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/signup"
                  className={`doodle-btn mt-7 h-12 px-6 text-base ${t.emphasized ? "bg-primary text-primary-foreground" : "btn-primary"}`}
                  style={t.emphasized ? { boxShadow: "4px 4px 0 0 hsl(var(--accent))" } : undefined}
                  data-testid={`tier-cta-${t.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  {t.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="pb-10" data-testid="footer">
    <div className="container">
      <div className="doodle-card-lg p-8 md:p-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5">
              <BrewlyLogo size={36} />
              <span className="font-display text-2xl font-extrabold">Brewly</span>
            </div>
            <p className="mt-3 text-muted-foreground text-sm max-w-xs">The cozy home for creators to earn from the people who love what they do. 0% fees, ever.</p>
            <div className="mt-5 flex items-center gap-2">
              {[Twitter, Instagram, Youtube, Mail].map((Ic, i) => (
                <a key={i} href="#" className="doodle-pill h-10 w-10 inline-flex items-center justify-center bg-surface hover:-translate-y-0.5 transition-transform"
                   aria-label="social" data-testid={`footer-social-${i}`}>
                  <Ic className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          {[
            { title: "Product", links: ["How it works", "Pricing", "Library", "Channels", "Remix"] },
            { title: "Creators", links: ["Help center", "Brand kit", "Changelog", "Roadmap"] },
            { title: "Company", links: ["About", "Careers", "Privacy", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs font-extrabold uppercase tracking-wider text-primary">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l}><a href="#" className="text-sm font-bold text-muted-foreground hover:text-foreground">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t-2 border-secondary/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-bold text-muted-foreground">© {new Date().getFullYear()} Brewly. Friday-payday energy.</p>
          <p className="text-xs font-bold text-muted-foreground">Made with warm mugs &amp; ink.</p>
        </div>
      </div>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <Nav />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Footer />
    </div>
  );
}
