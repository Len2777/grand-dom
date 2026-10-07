"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SUPPORTED = ["pl", "ua", "en"] as const;

export default function FooterSection({
  get,
  brandName,
  basePath = "",
}: {
  get: (path: string[], fallback?: any) => any;
  brandName: string;
  basePath?: string;
}) {
  const pathname = usePathname() || "/pl";
  const seg = pathname.split("/")[1];
  const locale = (SUPPORTED as readonly string[]).includes(seg) ? seg : "pl";

  const navLinks = [
    { label: get(["nav", "services"], "Usługi"), href: `${basePath}#services` },
    { label: get(["nav", "process"], "Jak pracujemy"), href: `${basePath}#process` },
    { label: get(["nav", "abroad"], "Zagranica"), href: `${basePath}#abroad` },
    { label: get(["nav", "contact"], "Kontakt"), href: `${basePath}#contact` },
  ];

  return (
    <footer className="gd-footer">
      <div className="gd-wrap gd-footer-inner">
        <span className="gd-footer-brand">{brandName}</span>

        <p className="gd-footer-tagline">
          {get(
            ["footer", "tagline"],
            "Prowadzimy Cię od pierwszej rozmowy aż do odebrania kluczy. Bez pośpiechu i bez ukrytych prowizji."
          )}
        </p>

        <nav className="gd-footer-nav" aria-label={get(["footer", "brand"], brandName)}>
          {navLinks.map(({ label, href }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
          <Link href={`/${locale}/privacy`}>
            {get(["footer", "privacyLink"], "Polityka prywatności")}
          </Link>
        </nav>

        <div className="gd-footer-bottom">
          {get(
            ["footer", "copyright"],
            `© ${new Date().getFullYear()} GRAND DOM. Wszelkie prawa zastrzeżone.`
          )}
          {" · "}
          {get(["contact", "location", "value"], "Warszawa, Polska")}
        </div>
      </div>
    </footer>
  );
}
