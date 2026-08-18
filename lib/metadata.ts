import {
  getMessages,
  SupportedLocale,
  generateLanguageAlternates,
  SUPPORTED_LOCALES,
} from "./translations";

const BASE_URL = "https://granddom.com";

const LOCALE_MAP: Record<SupportedLocale, string> = {
  pl: "pl_PL",
  ua: "uk_UA",
  en: "en_US",
};

export async function generatePageMetadata(
  lng: SupportedLocale,
  path: string = "",
  customTitle?: string
) {
  const commonMsgs = await getMessages(lng, "common");

  const baseTitle = commonMsgs.seo?.title || "GRAND DOM";
  const title = customTitle ? `${customTitle} | ${baseTitle}` : baseTitle;
  const description =
    commonMsgs.seo?.description || "Excellence in Every Domain";
  const keywords = commonMsgs.seo?.keywords as string | undefined;
  const fullPath = path ? `/${lng}${path}` : `/${lng}`;
  const canonicalUrl = `${BASE_URL}${fullPath}`;
  const languageAlternates = generateLanguageAlternates(path);
  const ogImage = `${BASE_URL}/photo_2025-10-09_22-28-44.jpg`;

  return {
    metadataBase: new URL(BASE_URL),
    title: { absolute: title },
    description,
    ...(keywords && { keywords }),
    applicationName: "GRAND DOM",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languageAlternates,
        "x-default": `${BASE_URL}/pl`,
      },
    },
    openGraph: {
      title,
      description,
      locale: LOCALE_MAP[lng],
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== lng).map(
        (l) => LOCALE_MAP[l]
      ),
      type: "website" as const,
      url: canonicalUrl,
      siteName: "GRAND DOM",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [ogImage],
    },
  };
}
