import { absoluteUrl } from "../lib/seo/site";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/autotransport-saarland", priority: 0.9, changeFrequency: "monthly" },
  { path: "/gallery", priority: 0.9, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.9, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
  { path: "/imprint", priority: 0.5, changeFrequency: "yearly" },
];

export default function sitemap() {
  const now = new Date();
  return staticRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
