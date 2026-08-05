import { ImageResponse } from "next/og";
import { SITE_NAME_SHORT, SITE_TAGLINE } from "../lib/seo/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #050505 0%, #0c1220 55%, #080c14 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 800,
            color: "#c6a062",
            letterSpacing: "-0.03em",
          }}
        >
          {SITE_NAME_SHORT.split(" ")[0]}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 14,
            color: "#94a3b8",
            marginTop: 8,
            textAlign: "center",
            padding: "0 12px",
          }}
        >
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
