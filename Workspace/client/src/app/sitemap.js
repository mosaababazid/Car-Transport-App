import { SITE_URL } from "../lib/seo/site";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/gallery", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
  { path: "/imprint", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
