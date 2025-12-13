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
    a: "No. We focus on bringing customers back, growing your reviews and making your days feel calmer — marketing is just one piece."
  },
  {
    q: "What if our customer list is a mess?",
    a: "That’s normal. We clean up your list as part of the setup so everything starts from a fresh base."
  }
];

function getInitialTheme() {
  const stored = localStorage.getItem("lbe_theme");
  if (stored === "light" || stored === "dark") return stored;
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
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
          <a
            href="#hero"
            onClick={e => {
              e.preventDefault();
              scrollTo("hero");
            }}
          >
            <img className="logo-long" src={activeLogo.long} alt="The LBE logo" />
            <img className="logo-short" src={activeLogo.short} alt="The LBE logo" />
          </a>

          <div className="nav-links">
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
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
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="mobile-overlay-links">
          {NAV_ITEMS.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={e => {
                e.preventDefault();
                scrollTo(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              scrollTo("contact");
            }}
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
            <h1 className="hero-title">Turn first-time visitors into regulars.</h1>
            <p className="hero-sub">
              We plug into the tools you already use and set up simple follow-ups that bring
              people back — usually in about 2 weeks.
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
              We work in-person in Calgary, using the tools you already have. You don&apos;t need
              to learn new software.
            </div>
          </div>

          <div>
            <div className="os-panel">
              <div className="os-header">
                <div className="os-title">Today&apos;s sales screen</div>
                <span className="os-pill">
                  <span className="os-dot" />
                  Follow-ups running
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
                  <div className="os-kpi-sub">Customers back from messages</div>
                  <div className="os-progress">
                    <span className="os-progress-fill" />
                  </div>
                </div>
              </div>

              <div className="os-bars">
                <div className="os-bars-head">
                  <span>Last 7 days</span>
                  <span>Sales from regulars</span>
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
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
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
              Cafés, salons, clinics, retail and local services in Calgary
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
            <div className="section-sub">No tech talk. Just simple, visible wins.</div>
          </div>

          <div className="wins-rail" style={{ marginTop: 28 }}>
            <div className="win-block">
              <h3 className="win-title">More customers coming back</h3>
              <p className="win-mini">
                We clean up your customer list and send thank-you and “we miss you” messages for
                you.
              </p>
              <div className="micro-bars">
                <span className="micro-bar" style={{ height: 32 }} />
                <span className="micro-bar" style={{ height: 46 }} />
                <span className="micro-bar" style={{ height: 60 }} />
                <span className="micro-bar" style={{ height: 70 }} />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">You look better on Google</h3>
              <p className="win-mini">
                We set up simple review and referral messages so happy customers bring more people.
              </p>
              <div className="orbit">
                <span className="orbit-ring" />
                <span className="orbit-ring r2" />
                <span className="orbit-node n1" />
                <span className="orbit-node n2" />
                <span className="orbit-node n3" />
              </div>
            </div>

            <div className="win-block">
              <h3 className="win-title">You know what&apos;s working</h3>
              <p className="win-mini">
                Simple numbers show who came back, new reviews, and which offers got a response.
              </p>
              <div className="plan-grid">
                <div className="plan-cell">
                  <span className="plan-chip">Came back</span>
                  <span className="plan-line">
                    <span className="plan-line-fill" />
                  </span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">New reviews</span>
                  <span className="plan-line">
                    <span className="plan-line-fill" />
                  </span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">Offers sent</span>
                  <span className="plan-line">
                    <span className="plan-line-fill" />
                  </span>
                </div>
                <div className="plan-cell">
                  <span className="plan-chip">People to reach</span>
                  <span className="plan-line">
                    <span className="plan-line-fill" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM / HOW IT WORKS */}
      <section id="system" className="section">
        <div className="container system-map">
          <div>
            <div className="eyebrow">What we set up for you</div>
            <h2 className="section-title">A simple sales machine, not another app</h2>
            <div className="section-sub">
              In about 2 weeks, we set up three simple pieces that work together in the background.
            </div>

            <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="core-pill">Clean customer list in one place</span>
              <span className="core-pill">Automatic thank-you and “we miss you” messages</span>
              <span className="core-pill">Review and referral requests</span>
              <span className="core-pill">Simple daily sales snapshot</span>
              <span className="core-pill">Optional monthly insights and support</span>
            </div>

            <div className="hero-cta">
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => scrollTo("results")}
              >
                See how it feels after
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
                <strong>POS</strong>
                <br />
                <span>Sales and visits</span>
              </div>
              <div className="map-node">
                <strong>Customer list</strong>
                <br />
                <span>Names, phone, email</span>
              </div>
              <div className="map-node">
                <strong>Email / SMS</strong>
                <br />
                <span>Thank-you and offers</span>
              </div>
              <div className="map-node">
                <strong>Google Business</strong>
                <br />
                <span>Reviews and search</span>
              </div>
            </div>

            <div className="map-core">
              <div className="map-core-title">LBE Sales Booster</div>
              <div className="map-core-bars">
                <span className="core-pill">Daily snapshot</span>
                <span className="core-pill">Review requests</span>
                <span className="core-pill">Come-back campaigns</span>
                <span className="core-pill">Referral nudges</span>
                <span className="core-pill">Short weekly owner check-in</span>
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
                <div className="win-mini" style={{ marginBottom: 8 }}>
                  Today at a glance
                </div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Everything important on one simple screen
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>
                  Who comes back
                </div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  You can see which customers are returning
                </strong>
              </div>
              <div className="win-block" style={{ padding: 16 }}>
                <div className="win-mini" style={{ marginBottom: 8 }}>
                  Team routines
                </div>
                <strong style={{ fontSize: 20, fontFamily: "var(--font-heading)" }}>
                  Staff know the plan, so you don&apos;t carry it all
                </strong>
              </div>
            </div>
          </div>

          <div className="result-visual">
            <div className="eyebrow">Before vs after</div>
            <h3 style={{ marginTop: 8, marginBottom: 10 }}>Sales getting more steady</h3>

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
              <span className="core-pill">Follow-ups running in the background</span>
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
                    <div
                      style={{
                        padding: "0 6px 16px 6px",
                        color: "var(--muted)",
                        fontSize: 14.5,
                        lineHeight: 1.6
                      }}
                    >
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
                  One short call or a quick email. You get a clear plan to bring customers back
                  more often, grow reviews and lift sales.
                </div>

                <div style={{ marginTop: 18, display: "grid", gap: 10 }}>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Start with your biggest headache</strong>
                    <div className="win-mini">
                      You tell us what hurts each week — we design around that.
                    </div>
                  </div>
                  <div className="win-block" style={{ padding: 16 }}>
                    <strong>Use what you already have</strong>
                    <div className="win-mini">
                      We plug into your POS, customer lists, email tools and Google Business
                      profile.
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="contact-methods">
                  <div className="win-block contact-method">
                    <div className="contact-method-header">
                      <span className="contact-method-icon">📞</span>
                      <div>
                        <div className="contact-method-label">Call or text</div>
                        <div className="contact-method-meta">
                          Best for quick questions and next steps
                        </div>
                      </div>
                    </div>

                    <a href="tel:+15877185627" className="contact-method-value">
                      +1 (587) 718-5627
                    </a>

                    <div className="contact-method-meta">
                      If we don&apos;t pick up, leave a short message and we&apos;ll call you back.
                    </div>
                  </div>

                  <div className="win-block contact-method">
                    <div className="contact-method-header">
                      <span className="contact-method-icon">✉️</span>
                      <div>
                        <div className="contact-method-label">Email us</div>
                        <div className="contact-method-meta">
                          Best for sharing a bit more context
                        </div>
                      </div>
                    </div>

                    <a href="mailto:me@elnarm.ca" className="contact-method-value">
                      me@elnarm.ca
                    </a>

                    <div className="contact-method-meta">
                      Tell us your business type and your main headache. We usually reply within
                      one business day.
                    </div>
                  </div>
                </div>
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
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
              }}
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
              }}
            >
              Terms
            </a>
            <a href="mailto:me@elnarm.ca">me@elnarm.ca</a>
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
