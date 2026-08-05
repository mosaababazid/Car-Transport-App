import { notFound } from "next/navigation";
import {
  HomePage,
  GalleryPage,
  ContactPage,
  PrivacyPage,
  TermsPage,
  ImprintPage,
} from "../app";
import { buildPageMetadata } from "../../lib/seo/metadata";

const ROUTES = {
  gallery: GalleryPage,
  contact: ContactPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  imprint: ImprintPage,
};

export async function generateMetadata({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
  const segment = Array.isArray(slug) ? slug[0] : slug;
  return buildPageMetadata({ segment });
}

export default async function RouterPage({ params }) {
  const resolved = await params;
  const slug = resolved?.slug;
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
