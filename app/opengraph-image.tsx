import { ImageResponse } from "next/og";

export const alt = "Profyl, votre CV en ligne gratuit et partageable";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Carte Open Graph de marque (partages réseaux sociaux / messageries).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #fff7f3 0%, #ffffff 55%, #f5f3ff 100%)",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 40,
            fontWeight: 700,
            color: "#ff5a3c"
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#ff5a3c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 36
            }}
          >
            P
          </div>
          Profyl
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            color: "#1a1a1a",
            maxWidth: 900
          }}
        >
          Votre CV en ligne, toujours à jour.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 34,
            color: "#555555",
            maxWidth: 880
          }}
        >
          Une vraie page web professionnelle à votre nom, partageable par lien ou QR code.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 30,
            fontWeight: 600,
            color: "#7a6ce0"
          }}
        >
          profyl.io/votre-nom
        </div>
      </div>
    ),
    { ...size }
  );
}
