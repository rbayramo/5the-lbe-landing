import { useEffect, useMemo, useRef, useState } from "react";

const NAV_ITEMS = [
  { id: "wins", label: "Wins" },
  { id: "system", label: "System" },
  { id: "results", label: "Results" },
  { id: "contact", label: "Assessment" },
  { id: "faq", label: "FAQ" }
];

const FAQ_ITEMS = [
  {
    q: "Do we need to change our POS or software?",
    a: "Usually no. The goal is to boost revenue using what you already have. If a small tool change clearly helps, we explain the cost and the gain before anything is touched."
  },
  {
    q: "How much time do owners need to give?",
    a: "A short assessment session, then two lightweight check-ins. We build the system in a way that does not interrupt your daily service."
  },
  {
    q: "Is this only about marketing?",
    a: "No. The LBE focuses on repeat customers, online presence, resource planning and one clear daily view. Marketing is only one part of the system."
  },
  {
    q: "What if our data is messy?",
    a: "That is normal. We start with cleanup and a simple structure so your dashboards and follow-ups are reliable."
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
            <div className="hero-eyebrow">Revenue Booster System for Calgary</div>
            <h1 className="hero-title">
              More repeat customers. Clear daily control.
            </h1>
            <p className="hero-sub">
              The LBE builds a lightweight business system around your existing tools.
              Owners feel the win fast, without learning another complicated platform.
            </p>

            <div className="hero-cta">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => scrollTo("contact")}
              >
                Book Assessment
              </button>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("wins")}
              >
                See owner wins
              </button>
            </div>

            <div className="hero-trust">
              In-person or remote within Calgary. Built on what you already use.
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
                  <div className="os-kpi-sub">Healthy momentum</div>
                  <div className="os-progress">
                    <span className="os-progress-fill" />
                  </div>
                </div>
                <div className="os-kpi">
                  <div className="os-kpi-label">returning</div>
                  <div className="os-kpi-value">43%</div>
                  <div className="os-kpi-sub">Journeys activated</div>
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
                Next action queued: review requests and win-back touchpoints.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BAND */}
      <div className="band">
        <div className="container" style={{ paddingTop: 18, paddingBottom: 18 }}>
          <div className="center">
            <div className="eyebrow">Built for owner-operators</div>
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
            <div className="eyebrow">Immediate owner wins</div>
            <h2 className="section-title">Three benefits you feel fast</h2>
            <div className="section-sub">Minimal explanation. Visual proof. Owner-level clarity.</div>
          </div>

          <div className="wins-rail" style={{ marginTop: 28 }}>
            <div className="win-block">
              <h3 className="win-title">More customers coming back</h3>
              <p className="win-mini">Living customer list and automated follow-ups</p>
              <div className="micro-bars">
                <span className="micro-bar" style={{ height: 32 }} />
                <span className="micro-bar" style={{ height: 46 }} />
                <span className="micro-bar" style={{ height: 60 }} />
                <span className="micro-bar" style={{ height: 70 }} />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">Stronger online presence</h3>
              <p className="win-mini">Google profile, reviews, simple offer pages</p>
              <div className="orbit">
                <span className="orbit-ring" />
                <span className="orbit-ring r2" />
                <span className="orbit-node n1" />
                <span className="orbit-node n2" />
                <span className="orbit-node n3" />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">Smarter planning</h3>
              <p className="win-mini">Inventory, reservations and resource rhythm</p>
              <div className="plan-grid">
                <div className="plan-cell">
                  <span className="plan-chip">Stock health</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Bookings flow</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Staff load</span>
                  <span className="plan-line"><span className="plan-line-fill" /></span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Supplier timing</span>
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
            <div className="eyebrow">What we build</div>
            <h2 className="section-title">A revenue system, not more software</h2>
            <div className="section-sub">
              Five outcomes, one connected setup. Designed to be calm, measurable and easy to run.
            </div>

            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="core-pill">Repeat customer engine</span>
              <span className="core-pill">Online trust and review flow</span>
              <span className="core-pill">Inventory and schedule clarity</span>
              <span className="core-pill">One daily control view</span>
              <span className="core-pill">Team routines that stick</span>
            </div>

            <div className="hero-cta">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("results")}
              >
                See patterns
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => scrollTo("contact")}
              >
                Map my system
              </button>
            </div>
          </div>

          <div className="map-visual">
            <div className="map-nodes">
              <div className="map-node">
                <strong>POS</strong><br />
                <span>Sales, visits, items</span>
              </div>
              <div className="map-node">
                <strong>Bookings</strong><br />
                <span>Time, capacity, demand</span>
              </div>
              <div className="map-node">
                <strong>Sheets</strong><br />
                <span>Inventory, suppliers</span>
              </div>
              <div className="map-node">
                <strong>Email and Reviews</strong><br />
                <span>Trust and retention</span>
              </div>
            </div>

            <div className="map-core">
              <div className="map-core-title">LBE Revenue Control Layer</div>
              <div className="map-core-bars">
                <span className="core-pill">Daily dashboard</span>
                <span className="core-pill">Review journey</span>
                <span className="core-pill">Win-back flow</span>
                <span className="core-pill">Stock alerts</span>
                <span className="core-pill">Weekly owner rhythm</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section id="results" className="section">
        <div className="container results-row">
          <div>
            <div className="eyebrow">Owner confidence</div>
            <h2 className="section-title">A calmer business runs better</h2>
            <div className="section-sub">
              The real win is not only growth. It is control. Owners stop guessing and start steering.
            </div>

            <div style={{ marginTop: 18, display: "grid", gap: 10, maxWidth: 420 }}>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Daily view</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  One screen, one story
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Retention pattern</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Repeat visits stop being random
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>Team rhythm</div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Clear routines reduce owner load
                </strong>
              </div>
            </div>
          </div>

          <div className="result-visual">
            <div className="eyebrow">Visual pattern</div>
            <h3 style={{ marginTop: 8, marginBottom: 10 }}>
              Revenue stability curve
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
                Visual only. Patterns vary by business. We track improvements with you.
              </div>
            </div>

            <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="core-pill">Repeat customer lift</span>
              <span className="core-pill">Review volume growth</span>
              <span className="core-pill">Fewer stock surprises</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="center">
            <div className="eyebrow">Questions</div>
            <h2 className="section-title">Short answers, no noise</h2>
            <div className="section-sub">
              Designed for busy owners who want clarity fast.
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
                <div className="eyebrow">System assessment</div>
                <h2 className="section-title">We map your revenue system</h2>
                <div className="section-sub">
                  Short assessment. Clear scope. A simple plan focused on repeat customers,
                  online trust, planning clarity and one daily control view.
                </div>

                <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Owner-first outcome mapping</strong>
                    <div className="win-mini">We start from your weekly pain, not software features.</div>
                  </div>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Built around your tools</strong>
                    <div className="win-mini">POS, bookings, sheets, email, reviews.</div>
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
                    <textarea placeholder="Repeat customers, reviews, inventory, daily control..." />
                  </div>

                  <button className="btn btn-primary" type="submit" style={{ width: "100%", marginTop: 6 }}>
                    Book my assessment
                  </button>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginTop: 8, flexWrap: "wrap" }}>
                    <span className="section-sub" style={{ fontSize: 12.5, marginTop: 0 }}>
                      Prefer to call? +1 (587) 718-5627
                    </span>
                    <span className="section-sub" style={{ fontSize: 12.5, marginTop: 0 }}>
                      Typical response within 1 business day
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
