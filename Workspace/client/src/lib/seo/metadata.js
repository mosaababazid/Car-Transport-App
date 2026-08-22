import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_SHORT,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_TWITTER_DESCRIPTION,
  DEFAULT_KEYWORDS,
  OG_IMAGE,
  OG_IMAGE_PATH,
  LOCALE,
  LOGO_PATH,
  PAGE_META,
  absoluteUrl,
} from "./site";

function verificationMeta() {
  const other = {};
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (google) other["google-site-verification"] = google;
  if (bing) other["msvalidate.01"] = bing;
  return Object.keys(other).length ? { other } : {};
}

function sharedOpenGraph({ title, description, path = "" }) {
  const url = absoluteUrl(path);
  return {
    url,
    siteName: SITE_NAME,
    title,
    description,
    locale: LOCALE,
    type: "website",
    images: [OG_IMAGE],
  };
}

function sharedTwitter({ title, description }) {
  return {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
  };
}

/** Root layout metadata */
export function buildRootMetadata() {
  const title = SITE_NAME;

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME_SHORT,
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    authors: [{ name: SITE_NAME_SHORT, url: SITE_URL }],
    creator: SITE_NAME_SHORT,
    publisher: SITE_NAME_SHORT,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: sharedOpenGraph({
      title,
      description: DEFAULT_OG_DESCRIPTION,
      path: "",
    }),
    twitter: sharedTwitter({
      title,
      description: DEFAULT_TWITTER_DESCRIPTION,
    }),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
      languages: {
        [LOCALE.replace("_", "-")]: SITE_URL,
      },
    },
    icons: {
      icon: [
        { url: "/icon", sizes: "32x32", type: "image/png" },
        { url: "/icon", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/icon",
      apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
    },
    manifest: "/manifest.webmanifest",
    ...verificationMeta(),
  };
}

/**
 * Per-route metadata (catch-all pages & dedicated routes).
 * @param {{ segment?: string }} options
 */
export function buildPageMetadata({ segment } = {}) {
  if (!segment) {
    return {
      alternates: { canonical: SITE_URL },
    };
  }

  const pageMeta = PAGE_META[segment];
  if (!pageMeta) return {};

  const path = `/${segment}`;
  const pageTitle = `${pageMeta.title} | ${SITE_NAME}`;

  return {
    title: pageMeta.title,
    description: pageMeta.description,
    keywords: pageMeta.keywords,
    openGraph: sharedOpenGraph({
      title: pageTitle,
      description: pageMeta.description,
      path,
    }),
    twitter: sharedTwitter({
      title: pageTitle,
      description: pageMeta.description,
    }),
    alternates: {
      canonical: absoluteUrl(path),
    },
  };
}

export { PAGE_META, LOGO_PATH, absoluteUrl };
