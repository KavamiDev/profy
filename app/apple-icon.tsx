import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Icône Apple touch (écran d'accueil iOS) générée à partir du wordmark.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff5a3c",
          color: "#ffffff",
          fontSize: 120,
          fontWeight: 800,
          fontFamily: "sans-serif"
        }}
      >
        P
      </div>
    ),
    { ...size }
  );
}
