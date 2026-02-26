import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getStructuredData } from "./structuredData";

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://automove-logistik.de";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Autotransport & Fahrzeuglogistik Deutschland | Auto transportieren | KFZ-Transport",
    template: "%s | AutoMove Logistik",
  },
  description:
    "Autotransport und Fahrzeuglogistik in Deutschland und Europa: Auto transportieren lassen – PKW, LKW, Transporter, Bus. Vollkaskoversichert, 100+ Transporte monatlich. Unverbindliches Angebot in Sekunden für B2B und Privat.",
  keywords: [
    "Autotransport",
    "Auto transportieren",
    "Fahrzeuglogistik",
    "Fahrzeugtransport Deutschland",
    "KFZ-Transport",
    "Europaweiter Autotransport",
    "Auto transportieren lassen",
    "PKW Transport",
    "LKW Transport",
    "Vollkaskoversichert",
    "B2B Fahrzeuglogistik",
  ],
  openGraph: {
    url: SITE_URL,
    siteName: "AutoMove Logistik",
    title: "Autotransport & Fahrzeuglogistik Deutschland | Auto transportieren",
    description:
      "Autotransport in Deutschland und Europa: Auto transportieren lassen – PKW, LKW, Transporter. Vollkaskoversichert. Unverbindliches Angebot in Sekunden.",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AutoMove Logistik - Autotransport in Deutschland und Europa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autotransport & Fahrzeuglogistik Deutschland",
    description: "Auto transportieren lassen – professionell, vollkaskoversichert, europaweit.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({ children }) {
  const structuredData = getStructuredData();

  return (
    <html lang="de">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              Array.isArray(structuredData) ? structuredData : [structuredData]
            ),
          }}
        />
        {children}
      </body>
    </html>
  );
}