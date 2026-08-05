import GalleryPage from "./gallery";
import { buildPageMetadata } from "../../lib/seo/metadata";

export const metadata = buildPageMetadata({ segment: "gallery" });

export default function GalleryRoute() {
  return <GalleryPage />;
}
