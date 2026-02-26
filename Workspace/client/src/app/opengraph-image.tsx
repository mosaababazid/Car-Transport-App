import { ImageResponse } from "next/og";

export const alt = "AutoMove Logistik - Autotransport in Deutschland und Europa";
export const size = { width: 1200, height: 630 };
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
            color: "#00e0ff",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          AutoMove Logistik
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
          Autotransport & Fahrzeuglogistik in Deutschland und Europa
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
