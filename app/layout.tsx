import type { Metadata } from "next";
import { Cormorant_Garamond, Instrument_Serif, Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import GoogleTagManager from "@/components/GoogleTagManager";
import { isValidLocale, getMessages, type SupportedLocale } from "@/lib/translations";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
  // the metric-matched local fallback has Cyrillic glyphs and would shadow Cormorant
  adjustFontFallback: false,
});

// Instrument Serif has no Cyrillic — used for Ukrainian headings only
const cormorantCyr = Cormorant_Garamond({
  subsets: ["cyrillic"],
  weight: "600",
  style: ["normal", "italic"],
  variable: "--font-display-cyr",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://granddom.com"),
  title: {
    template: "%s | GRAND DOM",
    default: "GRAND DOM — Real Estate Agency Warsaw",
  },
  description:
    "GRAND DOM — real estate agency in Warsaw. We specialize in apartment sales, purchases and long-term rentals in Warsaw and Masovia. Investments in Thailand and Northern Cyprus.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo.png",
  },
};

const HTML_LANG: Record<SupportedLocale, string> = {
  pl: "pl",
  ua: "uk",
  en: "en",
};

function detectLocale(pathname: string): SupportedLocale {
  const seg = pathname.split("/")[1];
  if (isValidLocale(seg)) return seg;
  return "pl";
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "/";
  const locale = detectLocale(pathname);
  const htmlLang = HTML_LANG[locale];

  const commonMsgs = await getMessages(locale, "common");
  const cookieMsgs = commonMsgs?.cookieConsent ?? null;

  return (
    <html
      lang={htmlLang}
      className={`${instrumentSerif.variable} ${cormorantCyr.variable} ${manrope.variable}`}
    >
      <body>
        <GoogleTagManager />
        {children}
        <CookieConsent messages={cookieMsgs} />
      </body>
    </html>
  );
}
