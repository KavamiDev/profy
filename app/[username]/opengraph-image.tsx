import { getProfileByUsername } from "@/lib/server/profiles-store";
import { ImageResponse } from "next/og";

export const alt = "CV en ligne sur Profyl";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Carte Open Graph par profil : nom + métier + localisation, propre et lisible
// quand un candidat partage profyl.io/son-nom (LinkedIn, messageries, mail).
export default async function ProfileOpengraphImage({
  params
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);
  const hero = profile?.content.hero;

  const fullName = hero?.fullName || username;
  const title = hero?.title || "CV en ligne";
  const location = hero?.location || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "linear-gradient(135deg, #fff7f3 0%, #ffffff 55%, #f5f3ff 100%)",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 34,
            fontWeight: 700,
            color: "#ff5a3c"
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: "#ff5a3c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 30
            }}
          >
            P
          </div>
          Profyl
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#1a1a1a",
              maxWidth: 1040
            }}
          >
            {fullName}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 40,
              color: "#555555",
              maxWidth: 1040
            }}
          >
            {title}
            {location ? `  ·  ${location}` : ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 600,
            color: "#7a6ce0"
          }}
        >
          profyl.io/{username}
        </div>
      </div>
    ),
    { ...size }
  );
}
