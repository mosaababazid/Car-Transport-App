import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const labelStyle = {
  display: "flex",
  fontSize: 18,
  fontWeight: 800,
  color: "#c6a062",
  letterSpacing: "-0.04em",
  fontFamily: "system-ui, sans-serif",
} as const;

const rootStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(145deg, #0a0a0a 0%, #141c2e 100%)",
  borderRadius: 6,
} as const;

export default function Icon() {
  return new ImageResponse(
    (
      <div style={rootStyle}>
        <span style={labelStyle}>LD</span>
      </div>
    ),
    { ...size }
  );
}
