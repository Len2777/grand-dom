import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import GoogleTagManager from "@/components/GoogleTagManager";
import { isValidLocale, getMessages, type SupportedLocale } from "@/lib/translations";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
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
      className={`${cormorant.variable} ${dmSans.variable}`}
    >
      <body>
        <GoogleTagManager />
        {children}
        <CookieConsent messages={cookieMsgs} />
      </body>
    </html>
  );
}
