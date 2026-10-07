"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Messages = {
  text?: string;
  privacyLinkLabel?: string;
  accept?: string;
  decline?: string;
} | null;

const STORAGE_KEY = "gd_cookie_consent_v1";
const SUPPORTED = ["pl", "ua", "en"] as const;

export default function CookieConsent({ messages }: { messages: Messages }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname() || "/pl";
  const seg = pathname.split("/")[1];
  const locale = (SUPPORTED as readonly string[]).includes(seg) ? seg : "pl";

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const setChoice = (value: "accepted" | "declined") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    try {
      window.dispatchEvent(
        new CustomEvent("gd_cookie_consent_change", { detail: value })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  const text =
    messages?.text ??
    "Używamy plików cookies, aby poprawić działanie strony i analizować ruch. Klikając Akceptuję, wyrażasz zgodę na wszystkie pliki cookies.";
  const privacyLabel = messages?.privacyLinkLabel ?? "Polityka prywatności";
  const accept = messages?.accept ?? "Akceptuję";
  const decline = messages?.decline ?? "Tylko niezbędne";

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      style={{
        position: "fixed",
        bottom: 16,
        left: 16,
        right: 16,
        zIndex: 1000,
        maxWidth: 540,
        marginLeft: "auto",
        marginRight: "auto",
        background: "#ffffff",
        border: "1px solid var(--gd-line)",
        borderRadius: 10,
        padding: "20px 22px",
        boxShadow: "0 24px 60px -20px rgba(20,40,30,0.28)",
        fontFamily: "var(--gd-sans)",
      }}
    >
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.6,
          color: "var(--gd-ink)",
          marginBottom: 12,
        }}
      >
        {text}
      </p>
      <Link
        href={`/${locale}/privacy`}
        style={{
          display: "inline-block",
          fontSize: 13,
          color: "var(--gd-ink)",
          textDecoration: "underline",
          marginBottom: 16,
        }}
      >
        {privacyLabel}
      </Link>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => setChoice("accepted")}
          className="gd-btn gd-btn--sm gd-btn--ink"
          style={{ flex: "1 1 auto" }}
        >
          {accept}
        </button>
        <button
          onClick={() => setChoice("declined")}
          className="gd-btn gd-btn--sm gd-btn--outline"
          style={{ flex: "1 1 auto" }}
        >
          {decline}
        </button>
      </div>
    </div>
  );
}
