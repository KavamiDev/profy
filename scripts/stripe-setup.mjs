/**
 * Crée (idempotent) les 3 produits + prix one-time des packs Pro dans Stripe,
 * puis affiche les lignes STRIPE_PRICE_* à coller dans .env.local / Vercel.
 *
 * Usage :
 *   STRIPE_SECRET_KEY=sk_live_... node scripts/stripe-setup.mjs
 *   (ou remplis STRIPE_SECRET_KEY dans .env.local puis : node --env-file=.env.local scripts/stripe-setup.mjs)
 *
 * Idempotent : repérage par metadata.profyl_pack — relancer ne crée pas de doublon.
 */
import Stripe from "stripe";

// Source de vérité partagée avec l'app (lib/pro.ts).
const PRO_PACKS = {
  m1: { months: 1, priceEur: 7, label: "Profyl Pro — 1 mois" },
  m3: { months: 3, priceEur: 15, label: "Profyl Pro — 3 mois" },
  m12: { months: 12, priceEur: 45, label: "Profyl Pro — 12 mois" }
};

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("✗ STRIPE_SECRET_KEY manquant. Renseigne-le puis relance.");
  process.exit(1);
}
const stripe = new Stripe(key);
const envName = { m1: "STRIPE_PRICE_M1", m3: "STRIPE_PRICE_M3", m12: "STRIPE_PRICE_M12" };

const out = [];
for (const [pack, def] of Object.entries(PRO_PACKS)) {
  // Réutilise le produit existant si déjà créé (recherche par metadata).
  const existing = await stripe.products.search({
    query: `metadata['profyl_pack']:'${pack}'`
  });
  let product = existing.data[0];
  if (!product) {
    product = await stripe.products.create({
      name: def.label,
      metadata: { profyl_pack: pack }
    });
    console.log(`+ produit créé : ${product.id} (${pack})`);
  } else {
    console.log(`= produit existant : ${product.id} (${pack})`);
  }

  // Cherche un prix one-time actif au bon montant, sinon le crée.
  const prices = await stripe.prices.list({ product: product.id, active: true, limit: 100 });
  const amount = def.priceEur * 100;
  let price = prices.data.find(
    (p) => p.unit_amount === amount && p.currency === "eur" && p.type === "one_time"
  );
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      currency: "eur",
      unit_amount: amount,
      metadata: { profyl_pack: pack }
    });
    console.log(`  + prix créé : ${price.id} (${def.priceEur} €)`);
  } else {
    console.log(`  = prix existant : ${price.id} (${def.priceEur} €)`);
  }
  out.push(`${envName[pack]}=${price.id}`);
}

console.log("\n— À coller dans .env.local ET les env Vercel —\n");
console.log(out.join("\n"));
