import { notFound } from "next/navigation";
import {
  HomePage,
  ContactPage,
  PrivacyPage,
  ImprintPage,
} from "../app";
import { buildPageMetadata } from "../../lib/seo/metadata";

const ROUTES = {
  contact: ContactPage,
  privacy: PrivacyPage,
  imprint: ImprintPage,
};

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  if (Array.isArray(slug) && slug.length > 1) return {};
  const segment = Array.isArray(slug) ? slug[0] : slug;
  return buildPageMetadata({ segment });
}

export default async function RouterPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  if (Array.isArray(slug) && slug.length > 1) {
    notFound();
  }
  const segment = Array.isArray(slug) ? slug?.[0] : slug ?? null;

  if (!segment) {
    return <HomePage />;
  }

  const Page = ROUTES[segment];
  if (!Page) {
    notFound();
  }

  return <Page />;
}
