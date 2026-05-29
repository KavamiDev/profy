import type { ProfileContent } from "@/types/profile";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

// Palette alignée sur la marque Profyl (coral + encre).
const ACCENT = "#FF5A3C";
const INK = "#1A1A1A";
const MUTED = "#6B6B6B";
const LINE = "#E5E2DD";

const s = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 9.5, color: INK, lineHeight: 1.4 },
  band: { backgroundColor: INK, color: "#fff", padding: 24, flexDirection: "row", gap: 16 },
  photo: { width: 72, height: 72, borderRadius: 36, objectFit: "cover" },
  name: { fontFamily: "Helvetica-Bold", fontSize: 22, color: "#fff" },
  title: { fontSize: 11, color: "#fff", marginTop: 3, opacity: 0.85 },
  location: { fontSize: 9, color: "#fff", marginTop: 6, opacity: 0.7 },
  body: { flexDirection: "row", padding: 24, gap: 22 },
  left: { width: "34%", gap: 16 },
  right: { width: "66%", gap: 16 },
  h2: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: ACCENT,
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 6
  },
  summary: { fontSize: 10, color: "#333" },
  itemTitle: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  itemSub: { fontSize: 9, color: MUTED, marginTop: 1 },
  itemDesc: { fontSize: 9, color: "#333", marginTop: 3 },
  item: { marginBottom: 9 },
  chip: {
    fontSize: 8.5,
    color: "#333",
    backgroundColor: "#F4F1EC",
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 4
  },
  chips: { flexDirection: "row", flexWrap: "wrap" },
  contactLine: { fontSize: 9, color: "#333", marginBottom: 3 },
  langRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  langName: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
  langLevel: { fontSize: 9, color: MUTED },
  bullet: { fontSize: 9, color: "#333", marginBottom: 2 },
  divider: { borderBottomWidth: 1, borderBottomColor: LINE, marginVertical: 2 }
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={s.h2}>{title}</Text>
      {children}
    </View>
  );
}

/** Document PDF A4 print-ready généré depuis le contenu du profil. */
export function ProfilePdf({ content, photo }: { content: ProfileContent; photo?: string }) {
  const { hero, contact, skills, experience, education, projects, certifications, languages, extras } =
    content;

  return (
    <Document author={hero.fullName || "Profyl"} title={`CV — ${hero.fullName || "Profyl"}`}>
      <Page size="A4" style={s.page}>
        <View style={s.band}>
          {/* react-pdf <Image/> n'est pas un <img> DOM — pas de prop alt. */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          {photo ? <Image src={photo} style={s.photo} /> : null}
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={s.name}>{hero.fullName}</Text>
            {hero.title ? <Text style={s.title}>{hero.title}</Text> : null}
            {hero.location ? <Text style={s.location}>{hero.location}</Text> : null}
          </View>
        </View>

        <View style={s.body}>
          <View style={s.left}>
            {(contact.email || contact.phone || contact.website || contact.linkedin) && (
              <Section title="Contact">
                {contact.email ? <Text style={s.contactLine}>{contact.email}</Text> : null}
                {contact.phone ? <Text style={s.contactLine}>{contact.phone}</Text> : null}
                {contact.website ? <Text style={s.contactLine}>{contact.website}</Text> : null}
                {contact.linkedin ? <Text style={s.contactLine}>{contact.linkedin}</Text> : null}
              </Section>
            )}

            {(skills.core.length > 0 || skills.tools.length > 0) && (
              <Section title="Compétences">
                <View style={s.chips}>
                  {[...skills.core, ...skills.tools].map((sk, i) => (
                    <Text key={i} style={s.chip}>
                      {sk}
                    </Text>
                  ))}
                </View>
              </Section>
            )}

            {languages.length > 0 && (
              <Section title="Langues">
                {languages.map((l, i) => (
                  <View key={i} style={s.langRow}>
                    <Text style={s.langName}>{l.name}</Text>
                    <Text style={s.langLevel}>{l.level}</Text>
                  </View>
                ))}
              </Section>
            )}

            {certifications.length > 0 && (
              <Section title="Certifications">
                {certifications.map((c, i) => (
                  <Text key={i} style={s.bullet}>
                    • {c}
                  </Text>
                ))}
              </Section>
            )}

            {extras.interests.length > 0 && (
              <Section title="Centres d'intérêt">
                <View style={s.chips}>
                  {extras.interests.map((it, i) => (
                    <Text key={i} style={s.chip}>
                      {it}
                    </Text>
                  ))}
                </View>
              </Section>
            )}
          </View>

          <View style={s.right}>
            {hero.summary ? (
              <Section title="À propos">
                <Text style={s.summary}>{hero.summary}</Text>
              </Section>
            ) : null}

            {experience.length > 0 && (
              <Section title="Expériences">
                {experience.map((e, i) => (
                  <View key={i} style={s.item}>
                    <Text style={s.itemTitle}>{e.role}</Text>
                    <Text style={s.itemSub}>
                      {e.company}
                      {e.start || e.end ? ` · ${e.start} – ${e.end}` : ""}
                    </Text>
                    {e.description ? <Text style={s.itemDesc}>{e.description}</Text> : null}
                  </View>
                ))}
              </Section>
            )}

            {education.length > 0 && (
              <Section title="Formation">
                {education.map((ed, i) => (
                  <View key={i} style={s.item}>
                    <Text style={s.itemTitle}>{ed.degree}</Text>
                    <Text style={s.itemSub}>
                      {ed.school}
                      {ed.start || ed.end ? ` · ${ed.start} – ${ed.end}` : ""}
                    </Text>
                  </View>
                ))}
              </Section>
            )}

            {projects.length > 0 && (
              <Section title="Projets">
                {projects.map((p, i) => (
                  <View key={i} style={s.item}>
                    <Text style={s.itemTitle}>{p.name}</Text>
                    {p.link ? <Text style={s.itemSub}>{p.link}</Text> : null}
                    {p.description ? <Text style={s.itemDesc}>{p.description}</Text> : null}
                  </View>
                ))}
              </Section>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
}
