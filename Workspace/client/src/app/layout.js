import "./globals.css";
import { buildRootMetadata } from "../lib/seo/metadata";
import { getStructuredDataGraph } from "../lib/seo/structured-data";
import { LANGUAGE, THEME_COLOR } from "../lib/seo/site";

export const metadata = buildRootMetadata();

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  const structuredData = getStructuredDataGraph();

  return (
    <html lang={LANGUAGE}>
      <body className="antialiased">
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        {children}
      </body>
    </html>
  );
}
