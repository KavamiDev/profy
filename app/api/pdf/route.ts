import { ProfilePdf } from "@/components/pdf/ProfilePdf";
import { getOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";

export const dynamic = "force-dynamic";

/**
 * Export PDF A4 print-ready du CV (feature Pro).
 * Refuse proprement si l'utilisateur n'est pas Pro (→ /pricing).
 */
export async function GET() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return new Response(null, { status: 302, headers: { Location: "/login?next=/dashboard" } });
  }

  const profile = await getOwnProfile();
  if (!profile) {
    return new Response("No profile", { status: 404 });
  }
  if (profile.plan !== "pro") {
    return new Response(null, { status: 302, headers: { Location: "/pricing" } });
  }

  // Photo : on n'embarque que JPG/PNG (formats fiables pour react-pdf).
  let photo: string | undefined;
  const photoUrl = profile.content.hero?.photoUrl;
  if (photoUrl) {
    try {
      const res = await fetch(photoUrl);
      const type = res.headers.get("content-type") ?? "";
      if (type.includes("jpeg") || type.includes("jpg") || type.includes("png")) {
        const buf = Buffer.from(await res.arrayBuffer());
        photo = `data:${type};base64,${buf.toString("base64")}`;
      }
    } catch {
      /* photo optionnelle — on génère le PDF sans si l'image échoue */
    }
  }

  const element = createElement(ProfilePdf, {
    content: profile.content,
    photo
  }) as unknown as ReactElement<DocumentProps>;
  const pdf = await renderToBuffer(element);

  const filename = `CV-${profile.username}.pdf`;
  return new Response(pdf as unknown as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
