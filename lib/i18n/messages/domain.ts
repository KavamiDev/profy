import type { NamespaceMessages } from "./types";

export const domain: NamespaceMessages = {
  fr: {
    "domain.nav": "Domaine",
    "domain.back": "← Retour à l'éditeur",
    "domain.title": "Ton domaine perso",
    "domain.subtitle":
      "Branche ton propre nom de domaine (jean-dupont.fr) sur ta page Profyl. Le HTTPS est automatique.",
    "domain.input_label": "Ton domaine",
    "domain.input_placeholder": "jean-dupont.fr",
    "domain.connect": "Connecter",
    "domain.help_buy":
      "Pas encore de domaine ? Achète-le chez OVH, Gandi ou Namecheap (~10 €/an), puis reviens ici.",
    "domain.dns_title": "Configure ton DNS",
    "domain.dns_intro": "Ajoute cet enregistrement chez ton registrar (OVH, Gandi…) :",
    "domain.dns_type": "Type",
    "domain.dns_name": "Nom",
    "domain.dns_value": "Valeur",
    "domain.dns_propagation": "La propagation DNS prend de 1 minute à 24 h.",
    "domain.verify": "Vérifier la configuration",
    "domain.disconnect": "Déconnecter",
    "domain.status_verified": "✓ Domaine actif",
    "domain.status_pending": "En attente de vérification DNS",
    "domain.live_on": "Ta page est en ligne sur",
    "domain.locked.title": "Le domaine perso est une fonctionnalité Pro",
    "domain.locked.text":
      "Donne à ton CV une adresse à ton nom (jean-dupont.fr) plutôt que profyl.io/jean-dupont. Passe en Pro pour débloquer.",
    "domain.locked.cta": "Débloquer avec Pro",
    "domain.msg.added": "Domaine ajouté. Configure maintenant ton DNS ci-dessous.",
    "domain.msg.verified": "🎉 Ton domaine est vérifié et actif !",
    "domain.msg.pending": "DNS pas encore détecté. Vérifie l'enregistrement et réessaie dans quelques minutes.",
    "domain.msg.invalid": "Domaine invalide. Utilise un format comme jean-dupont.fr.",
    "domain.msg.taken": "Ce domaine est déjà utilisé par un autre profil Profyl.",
    "domain.msg.disconnected": "Domaine déconnecté.",
    "domain.msg.not_configured": "L'intégration domaine n'est pas encore activée côté serveur.",
    "domain.msg.error": "Une erreur est survenue. Réessaie."
  },
  en: {
    "domain.nav": "Domain",
    "domain.back": "← Back to editor",
    "domain.title": "Your custom domain",
    "domain.subtitle":
      "Connect your own domain name (jane-smith.com) to your Profyl page. HTTPS is automatic.",
    "domain.input_label": "Your domain",
    "domain.input_placeholder": "jane-smith.com",
    "domain.connect": "Connect",
    "domain.help_buy":
      "No domain yet? Buy one at Namecheap, Porkbun or Gandi (~$10/year), then come back here.",
    "domain.dns_title": "Configure your DNS",
    "domain.dns_intro": "Add this record at your registrar (Namecheap, Gandi…):",
    "domain.dns_type": "Type",
    "domain.dns_name": "Name",
    "domain.dns_value": "Value",
    "domain.dns_propagation": "DNS propagation takes 1 minute to 24h.",
    "domain.verify": "Verify configuration",
    "domain.disconnect": "Disconnect",
    "domain.status_verified": "✓ Domain active",
    "domain.status_pending": "Awaiting DNS verification",
    "domain.live_on": "Your page is live on",
    "domain.locked.title": "Custom domain is a Pro feature",
    "domain.locked.text":
      "Give your resume an address with your name (jane-smith.com) instead of profyl.io/jane-smith. Go Pro to unlock.",
    "domain.locked.cta": "Unlock with Pro",
    "domain.msg.added": "Domain added. Now configure your DNS below.",
    "domain.msg.verified": "🎉 Your domain is verified and live!",
    "domain.msg.pending": "DNS not detected yet. Check the record and retry in a few minutes.",
    "domain.msg.invalid": "Invalid domain. Use a format like jane-smith.com.",
    "domain.msg.taken": "This domain is already used by another Profyl profile.",
    "domain.msg.disconnected": "Domain disconnected.",
    "domain.msg.not_configured": "Domain integration isn't enabled on the server yet.",
    "domain.msg.error": "Something went wrong. Please retry."
  }
};
