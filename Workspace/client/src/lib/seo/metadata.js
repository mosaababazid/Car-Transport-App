import {
  SITE_URL,
  HOME_URL,
  SITE_NAME,
  HOME_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_DESCRIPTION,
  DEFAULT_TWITTER_DESCRIPTION,
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
    images: [OG_IMAGE_PATH],
  };
}

/** Root layout metadata */
export function buildRootMetadata() {
  const title = HOME_TITLE;

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    authors: [{ name: SITE_NAME, url: HOME_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
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
      canonical: HOME_URL,
      languages: {
        [LOCALE.replace("_", "-")]: HOME_URL,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/favicon-48.png",
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
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
      alternates: { canonical: HOME_URL },
    };
  }

  const pageMeta = PAGE_META[segment];
  if (!pageMeta) return {};

  const path = `/${segment}`;
  const pageTitle = `${pageMeta.title} | ${SITE_NAME}`;

  return {
    title: pageMeta.title,
    description: pageMeta.description,
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
