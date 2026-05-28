import { Globe, Link2, Mail, Phone } from "lucide-react";
import { useT } from "@/components/locale-provider";
import { ContactLink } from "./ContactLink";
import type { ProfileContent } from "@/types/profile";

export function hasAnyContact(contact: ProfileContent["contact"]): boolean {
  return Boolean(contact.email || contact.phone || contact.website || contact.linkedin);
}

export function ContactLinks({
  contact,
  variant = "full"
}: {
  contact: ProfileContent["contact"];
  variant?: "compact" | "full";
}) {
  const t = useT();
  return (
    <>
      {contact.email ? (
        <ContactLink icon={Mail} href={`mailto:${contact.email}`} label={contact.email} variant={variant} />
      ) : null}
      {contact.phone ? (
        <ContactLink icon={Phone} href={`tel:${contact.phone}`} label={contact.phone} variant={variant} />
      ) : null}
      {contact.website ? (
        <ContactLink
          icon={Globe}
          href={contact.website}
          label={t("profile.label.website")}
          external
          variant={variant}
        />
      ) : null}
      {contact.linkedin ? (
        <ContactLink icon={Link2} href={contact.linkedin} label="LinkedIn" external variant={variant} />
      ) : null}
    </>
  );
}
