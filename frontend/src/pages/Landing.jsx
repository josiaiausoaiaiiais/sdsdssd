import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
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
              to="/dashboard"
              className="hidden sm:inline-flex px-4 py-2 rounded-full font-bold text-sm hover:bg-muted/60 transition-colors"
              data-testid="nav-login"
            >
              Log in
            </Link>
            <Link
              to="/dashboard"
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
              to="/dashboard"
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

const SimpleFooter = () => (
  <footer className="pb-10" data-testid="footer">
    <div className="container">
      <div className="doodle-card px-6 md:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BrewlyLogo size={32} />
          <span className="font-display text-xl font-extrabold">Brewly</span>
          <span className="hidden sm:inline text-sm text-muted-foreground ml-3">
            Made with warm mugs & ink.
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm font-bold text-muted-foreground">
          <a href="#" className="hover:text-foreground">About</a>
          <a href="#" className="hover:text-foreground">Help</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
      </div>
      <p className="text-center text-xs font-bold text-muted-foreground mt-5">
        © {new Date().getFullYear()} Brewly — Friday-payday energy.
      </p>
    </div>
  </footer>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-background" data-testid="landing-page">
      <Nav />
      <Hero />
      <SimpleFooter />
    </div>
  );
}
