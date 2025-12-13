import { useEffect, useMemo, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "wins", label: "Wins" },
  { id: "system", label: "How it works" },
  { id: "results", label: "Results" },
  { id: "contact", label: "Assessment" },
  { id: "faq", label: "FAQ" }
];

const FAQ_ITEMS = [
  {
    q: "Do I need to change my POS or software?",
    a: "No. We start with what you already use and only suggest a change if it clearly helps you make more sales."
  },
  {
    q: "How much of my time does this take?",
    a: "We need one short call and a couple of quick check-ins — you keep running the shop while we build."
  },
  {
    q: "Is this just marketing?",
    a: "No. We mainly help with repeat customers and reviews — marketing is just one piece."
  },
  {
    q: "What if our customer list is a mess?",
    a: "That’s normal. We clean up your list as part of the setup so everything starts from a fresh base."
  }
];

function getInitialTheme() {
  const stored = localStorage.getItem("lbe_theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export default function App() {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const t = getInitialTheme();
    setTheme(t);
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute("data-theme", theme);
    localStorage.setItem("lbe_theme", theme);
  }, [theme]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const logos = useMemo(() => {
    return {
      light: {
        long: "/logo-light-long.jpg",
        short: "/logo-light-short.jpg"
      },
      dark: {
        long: "/logo-dark-long.jpg",
        short: "/logo-dark-short.jpg"
      }
    };
  }, []);

  const activeLogo = theme === "dark" ? logos.dark : logos.light;

  function toggleTheme() {
    setTheme(prev => (prev === "dark" ? "light" : "dark"));
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  const year = new Date().getFullYear();

  return (
    <div ref={rootRef}>
      {/* NAV */}
      <div className="nav">
        <div className="container nav-inner">
          <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
            <img className="logo-long" src={activeLogo.long} alt="The LBE logo" />
            <img className="logo-short" src={activeLogo.short} alt="The LBE logo" />
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="nav-right">
            <button
              className="btn-link hide-mobile"
              type="button"
              onClick={() => scrollTo("contact")}
              aria-label="Call or contact"
            >
              Call: +1 (587) 718-5627
            </button>

            <button
              className="theme-toggle"
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              <span className="theme-toggle-dot" />
            </button>

            <button
              className="btn btn-primary hide-mobile"
              type="button"
              onClick={() => scrollTo("contact")}
            >
              Book Assessment
            </button>

            <button
              className="mobile-menu-btn"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="6" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
                <rect x="3" y="16" width="18" height="2" rx="1" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE OVERLAY */}
      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-overlay-top">
          <img src={activeLogo.short} alt="The LBE logo" style={{ height: 28 }} />
          <button
            className="mobile-menu-btn"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mobile-overlay-links">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}
          >
            Call: +1 (587) 718-5627
          </a>
        </div>

        <div>
          <button
            className="btn btn-primary"
            type="button"
            style={{ width: "100%" }}
            onClick={() => scrollTo("contact")}
          >
            Book Assessment
          </button>
        </div>
      </div>

      {/* HERO */}
      <section id="hero" className="section hero">
        <span className="blob b1" />
        <span className="blob b2" />

        <div className="container hero-grid">
          <div>
            <div className="hero-eyebrow">More sales from the customers you already have</div>
            <h1 className="hero-title">
              Turn first-time visitors into regulars.
            </h1>
            <p className="hero-sub">
              We plug into the tools you already use and set up simple follow-ups that bring people back.
            </p>

            <div className="hero-cta">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => scrollTo("contact")}
              >
                Book a quick call
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("wins")}
              >
                See what you get
              </button>
            </div>

            <div className="hero-trust">
              We work in-person in Calgary, using the tools you already have.
            </div>
          </div>

          <div>
            <div className="os-panel">
              <div className="os-header">
                <div className="os-title">Today&apos;s control room</div>
                <span className="os-pill">
                  <span className="os-dot" />
                  Stable system
                </span>
              </div>

              <div className="os-kpis">
                <div className="os-kpi">
                  <div className="os-kpi-label">today</div>
                  <div className="os-kpi-value">CA$ 4,260</div>
                  <div className="os-kpi-sub">Strong sales day</div>
                  <div className="os-progress">
                    <span className="os-progress-fill" />
                  </div>
                </div>
                <div className="os-kpi">
                  <div className="os-kpi-label">returning</div>
                  <div className="os-kpi-value">43%</div>
                  <div className="os-kpi-sub">Customers from follow-ups</div>
                  <div className="os-progress">
                    <span className="os-progress-fill" />
                  </div>
                </div>
              </div>

              <div className="os-bars">
                <div className="os-bars-head">
                  <span>Last 7 days</span>
                  <span>Sales focus</span>
                </div>
                <div className="os-bars-track">
                  <span className="os-bar" style={{ height: 42 }} />
                  <span className="os-bar" style={{ height: 58 }} />
                  <span className="os-bar" style={{ height: 48 }} />
                  <span className="os-bar" style={{ height: 66 }} />
                  <span className="os-bar" style={{ height: 72 }} />
                  <span className="os-bar" style={{ height: 60 }} />
                  <span className="os-bar" style={{ height: 78 }} />
                </div>
                <div className="os-bars-labels">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>
              </div>

              <div className="hero-trust" style={{ marginTop: 14 }}>
                Next up: send review invites and “we miss you” messages automatically.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND */}
      <div className="band">
        <div className="container" style={{ paddingTop: 18, paddingBottom: 18 }}>
          <div className="center">
            <div className="eyebrow">Made for busy shop owners</div>
            <div className="section-sub" style={{ marginTop: 6 }}>
              Cafés, salons, clinics, retail and local services
            </div>
          </div>
        </div>
      </div>

      {/* WINS */}
      <section id="wins" className="section">
        <div className="container">
          <div className="center">
            <div className="eyebrow">Quick owner wins</div>
            <h2 className="section-title">Three benefits you feel fast</h2>
            <div className="section-sub">
              No tech talk. Just simple, visible wins.
            </div>
          </div>

          <div className="wins-rail" style={{ marginTop: 28 }}>
            <div className="win-block">
              <h3 className="win-title">More customers coming back</h3>
              <p className="win-mini">We tidy your customer list and keep in touch for you.</p>
              <div className="micro-bars">
                <span className="micro-bar" style={{ height: 32 }} />
                <span className="micro-bar" style={{ height: 46 }} />
                <span className="micro-bar" style={{ height: 60 }} />
                <span className="micro-bar" style={{ height: 70 }} />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">You look better online</h3>
              <p className="win-mini">We help your Google listing and reviews look clean and clear.</p>
              <div className="orbit">
                <span className="orbit-ring" />
                <span className="orbit-ring r2" />
                <span className="orbit-node n1" />
                <span className="orbit-node n2" />
                <span className="orbit-node n3" />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">Simple daily numbers</h3>
              <p className="win-mini">Quick view of sales and follow-ups in one place.</p>
              <div className="plan-grid">
                <div className="plan-cell">
                  <span className="plan-chip">New customers</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Came back again</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Review invites sent</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Offers sent</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM */}
      <section id="system" className="section">
        <div className="container system-map">
          <div>
            <div className="eyebrow">What we set up for you</div>
            <h2 className="section-title">A simple sales machine, not another app</h2>
            <div className="section-sub">
              We connect a few simple pieces so your business runs smoother and sells more.
            </div>

            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="core-pill">More regular customers</span>
              <span className="core-pill">More good Google reviews</span>
              <span className="core-pill">Know who to follow up with</span>
              <span className="core-pill">One simple daily screen</span>
              <span className="core-pill">Clear tasks for your team</span>
            </div>

            <div className="hero-cta">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("results")}
              >
                See how it works
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => scrollTo("contact")}
              >
                Book my free checkup
              </button>
            </div>
          </div>

          <div className="map-visual">
            <div className="map-nodes">
              <div className="map-node">
                <strong>POS</strong><br />
                <span>Sales and visits</span>
              </div>
              <div className="map-node">
                <strong>Customer list</strong><br />
                <span>Names and phone numbers</span>
              </div>
              <div className="map-node">
                <strong>Spreadsheets</strong><br />
                <span>Simple customer lists</span>
              </div>
              <div className="map-node">
                <strong>Email and Reviews</strong><br />
                <span>Reviews and offers</span>
              </div>
            </div>

            <div className="map-core">
              <div className="map-core-title">LBE Sales Booster</div>
              <div className="map-core-bars">
                <span className="core-pill">Daily snapshot</span>
                <span className="core-pill">Review requests</span>
                <span className="core-pill">Come-back campaigns</span>
                <span className="core-pill">Simple follow-up list</span>
                <span className="core-pill">Weekly owner check-in</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="section">
        <div className="container results-row">
          <div>
            <div className="eyebrow">How your days feel</div>
            <h2 className="section-title">Less stress, more steady sales</h2>
            <div className="section-sub">
              It&apos;s not just about more sales — it&apos;s about feeling in control each week.
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 10, maxWidth: 420 }}>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Today at a glance</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Everything important on one screen
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Who comes back</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  You can see which customers are returning
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Team routines</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Staff know the plan, so you don&apos;t carry it all
                </strong>
              </div>
            </div>
          </div>

          <div className="result-visual">
            <div className="eyebrow">Before vs after</div>
            <h3 style={{ marginTop: 8, marginBottom: 10 }}>
              Sales getting more steady
            </h3>

            <div
              style={{
                border: "1px solid var(--border)",
                borderRadius: 16,
                background: "var(--surface-2)",
                padding: 18
              }}
            >
              <div className="os-bars-track" style={{ height: 110 }}>
                <span className="os-bar" style={{ height: 28, width: 12 }} />
                <span className="os-bar" style={{ height: 44, width: 12 }} />
                <span className="os-bar" style={{ height: 36, width: 12 }} />
                <span className="os-bar" style={{ height: 58, width: 12 }} />
                <span className="os-bar" style={{ height: 52, width: 12 }} />
                <span className="os-bar" style={{ height: 70, width: 12 }} />
                <span className="os-bar" style={{ height: 76, width: 12 }} />
                <span className="os-bar" style={{ height: 82, width: 12 }} />
              </div>
              <div className="section-sub" style={{ marginTop: 10 }}>
                Example only — every business is different. We track your numbers with you.
              </div>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="core-pill">More customers coming back</span>
              <span className="core-pill">More 5-star reviews</span>
              <span className="core-pill">Follow-ups you don&apos;t have to remember</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="center">
            <div className="eyebrow">Quick answers</div>
            <h2 className="section-title">Straight answers, no jargon</h2>
            <div className="section-sub">
              Made for busy owners who don&apos;t have time for tech talk.
            </div>
          </div>

          <div style={{ marginTop: 26, borderTop: "1px solid var(--border)" }}>
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} style={{ borderBottom: "1px solid var(--border)" }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "16px 6px",
                      background: "transparent",
                      border: "none",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      cursor: "pointer",
                      fontSize: 15,
                      fontWeight: 600
                    }}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 160ms ease"
                      }}
                      aria-hidden="true"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 6px 16px 6px", color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact-shell">
            <div className="contact-grid">
              <div>
                <div className="eyebrow">Free sales checkup</div>
                <h2 className="section-title">Let&apos;s see what we can fix in 2 weeks</h2>
                <div className="section-sub">
                  One short form and a quick chat. You get a clear plan to bring customers back more often and lift sales.
                </div>

                <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Start with your biggest headache</strong>
                    <div className="win-mini">You tell us what hurts each week — we design around that.</div>
                  </div>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Use what you already have</strong>
                    <div className="win-mini">We plug into your POS, simple lists, email and Google reviews.</div>
                  </div>
                </div>
              </div>

              <div>
                <form className="form" onSubmit={onSubmit}>
                  <div>
                    <label>Your name</label>
                    <input type="text" placeholder="Your full name" />
                  </div>
                  <div>
                    <label>Business name</label>
                    <input type="text" placeholder="Business name" />
                  </div>
                  <div>
                    <label>Email</label>
                    <input type="email" placeholder="you@example.com" />
                  </div>
                  <div>
                    <label>Phone number</label>
                    <input type="text" placeholder="(403) 000 0000" />
                  </div>
                  <div>
                    <label>Business type</label>
                    <input type="text" placeholder="Café, salon, clinic, shop" />
                  </div>
                  <div>
                    <label>Biggest headache</label>
                    <textarea placeholder="Repeat customers, reviews, daily control..." />
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 6 }}>
                    Book my free checkup
                  </button>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                    <span className="section-sub" style={{ fontSize: 12.5, marginTop: 0 }}>
                      Prefer to call? +1 (587) 718-5627
                    </span>
                    <span className="section-sub" style={{ fontSize: 12.5, marginTop: 0 }}>
                      We usually reply within one business day
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <strong style={{ fontFamily: "var(--font-heading)", color: "var(--ink)" }}>
              The LBE
            </strong>
            <span> · Local Business Enablement · Calgary, Alberta</span>
          </div>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms</a>
            <a href="mailto:info@elnarm.ca">info@elnarm.ca</a>
          </div>
        </div>
        <div className="container" style={{ paddingBottom: 26 }}>
          <div className="center" style={{ fontSize: 11.5, color: "var(--muted)" }}>
            © {year} LBE Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
