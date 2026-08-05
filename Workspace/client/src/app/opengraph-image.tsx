import { ImageResponse } from "next/og";
import { SITE_NAME_SHORT, SITE_TAGLINE, OG_IMAGE } from "../lib/seo/site";

export const alt = OG_IMAGE.alt;
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #050505 0%, #0c1220 50%, #080c14 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#c6a062",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          {SITE_NAME_SHORT}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#94a3b8",
            maxWidth: 800,
            textAlign: "center",
          }}
        >
          {SITE_TAGLINE} in Deutschland und Europa
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#64748b",
            marginTop: 24,
          }}
        >
          PKW · LKW · Transporter · Bus · Vollkaskoversichert
        </div>
      </div>
    ),
    { ...size }
  );
}
