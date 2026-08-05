import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { buildRootMetadata } from "../lib/seo/metadata";
import { getStructuredDataGraph } from "../lib/seo/structured-data";
import { LANGUAGE, THEME_COLOR } from "../lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
