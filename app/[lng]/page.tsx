import { notFound } from "next/navigation";
import GrandDomVisitCard from "../../components/pages/GrandDomVisitCard.client";
import {
  SUPPORTED_LOCALES,
  isValidLocale,
  getMessages,
  type SupportedLocale,
} from "@/lib/translations";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((lng) => ({ lng }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    return {};
  }

  return generatePageMetadata(lng);
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "GRAND DOM",
  url: "https://granddom.com",
  logo: "https://granddom.com/logo.png",
  image: "https://granddom.com/photo_2025-10-09_22-28-44.jpg",
  description:
    "Real estate agency in Warsaw specializing in apartment sales, purchases and rentals in Warsaw and Masovia. Investments in Thailand and Northern Cyprus.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Warsaw",
    addressCountry: "PL",
  },
  telephone: "+48886193598",
  email: "granddom7@op.pl",
  areaServed: [
    { "@type": "City", name: "Warsaw" },
    { "@type": "State", name: "Masovian Voivodeship" },
    { "@type": "Country", name: "Thailand" },
    { "@type": "Country", name: "Northern Cyprus" },
  ],
  sameAs: ["https://www.instagram.com/mieszkam.wa_wa"],
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
    ],
    opens: "09:00",
    closes: "18:00",
  },
};

export default async function LocalePage({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    notFound();
  }

  const msgs = await getMessages(lng);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <GrandDomVisitCard messages={msgs} />
    </>
  );
}
