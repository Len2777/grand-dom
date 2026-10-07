import { notFound } from "next/navigation";
import ContactPage from "../../../components/pages/Contact.client";
import {
  isValidLocale,
  getMessages,
  type SupportedLocale,
} from "@/lib/translations";
import { generatePageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    return {};
  }

  const contactMsgs = await getMessages(lng, "contact");
  return generatePageMetadata(lng, "/contact", contactMsgs.title);
}

export default async function Contact({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;

  if (!isValidLocale(lng)) {
    notFound();
  }

  const [contactMsgs, commonMsgs] = await Promise.all([
    getMessages(lng, "contact"),
    getMessages(lng, "common"),
  ]);

  return <ContactPage messages={contactMsgs} commonMessages={commonMsgs} />;
}
