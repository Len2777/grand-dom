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
  telephone: "+48886193598",
  email: "granddom7@op.pl",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Aleje Jerozolimskie 109",
    addressLocality: "Warszawa",
    addressCountry: "PL",
  },
  areaServed: [
    { "@type": "City", name: "Warszawa" },
    { "@type": "AdministrativeArea", name: "Mazowieckie" },
  ],
  knowsLanguage: ["pl", "uk", "en"],
  description:
    "Biuro nieruchomości w Warszawie dedykowane właścicielom mieszkań i domów. Zapewniamy szybką sprzedaż nieruchomości dzięki dostępowi do szerokiej bazy sprawdzonych klientów gotówkowych i międzynarodowych.",
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Skuteczna sprzedaż mieszkań i domów w Warszawie dla właścicieli",
        description:
          "Profesjonalna sesja zdjęciowa, audyt prawny księgi wieczystej, promocja oferty oraz dostęp do zagranicznych i gotówkowych kupujących.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Bezpłatna wycena nieruchomości i analiza rynku",
        description:
          "Precyzyjne określenie maksymalnej ceny rynkowej nieruchomości w Warszawie przed rozpoczęciem sprzedaży.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Kompleksowa obsługa prawno-notarialna sprzedaży",
        description:
          "Przygotowanie kompletu dokumentów, bezpieczna umowa przedwstępna oraz nadzór nad płatnością u notariusza.",
      },
    },
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
