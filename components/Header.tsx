"use client";
import { useState, useEffect, useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

// basePath is "" on the home page (plain #anchors) and "/<lng>" on subpages.
export default function Header({
  brandName,
  languages,
  currentLanguage,
  switchLanguage,
  get,
  basePath = "",
}: any) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [menuOpen]);

  const navItems = [
    { label: get(["nav", "services"], "Usługi"), href: `${basePath}#services` },
    { label: get(["nav", "process"], "Jak pracujemy"), href: `${basePath}#process` },
    { label: get(["nav", "abroad"], "Zagranica"), href: `${basePath}#abroad` },
  ];
  const contactHref = `${basePath}#contact`;
  const ctaLabel = get(["nav", "ctaLabel"], get(["contact", "getInTouch"], "Napisz do nas"));

  const phone = get(["contact", "phone", "value"], "+48 886 193 598");
  const email = get(["contact", "email", "value"], "granddom7@op.pl");

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="gd-topbar">
        <div className="gd-wrap gd-topbar-inner">
          <span className="gd-topbar-tag">
            {get(["topbar", "tagline"], "Sprzedaż · Kupno · Wynajem · Tajlandia · Cypr Północny")}
          </span>
          <span>
            <a href={`tel:${phone.replace(/[\s()]/g, "")}`}>{phone}</a>
            {" · "}
            <a href={`mailto:${email}`}>{email}</a>
          </span>
        </div>
      </div>

      <header ref={headerRef} className="gd-header">
        <div className="gd-wrap gd-header-inner">
          <nav className="gd-nav" aria-label="Menu">
            {navItems.map(({ label, href }) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>

          <a href={basePath || "#top"} onClick={closeMenu} className="gd-brand">
            <span className="gd-brand-name">{brandName}</span>
            <span className="gd-brand-sub">
              {get(["brand", "subtitle"], "Biuro nieruchomości · Warszawa")}
            </span>
          </a>

          <div className="gd-header-actions">
            <LanguageSwitcher
              languages={languages}
              currentLanguage={currentLanguage}
              switchLanguage={switchLanguage}
            />
            <a href={contactHref} className="gd-btn gd-btn--sm gd-btn--accent">
              {ctaLabel}
            </a>
            <button
              className="gd-burger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 3l16 16M19 3L3 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="gd-wrap gd-menu">
            {navItems.map(({ label, href }) => (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ))}
            <a href={contactHref} onClick={closeMenu} className="gd-btn gd-btn--accent">
              {ctaLabel}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
