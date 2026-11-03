import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

// TODO : compléter (obligatoire en France) — éditeur, SIRET, hébergeur (Vercel Inc.), données personnelles.
export default function MentionsLegales() {
  return (
    <section className="container-page flex max-w-[760px] flex-col gap-6 py-16">
      <h1 className="text-3xl md:text-5xl">Mentions légales</h1>
      <h2 className="text-2xl">Éditeur</h2>
      <p className="text-ink-soft">{site.owner} — {site.name}, {site.address.street}, {site.address.postalCode} {site.address.city}. SIRET : [à compléter].</p>
      <h2 className="text-2xl">Hébergement</h2>
      <p className="text-ink-soft">Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.</p>
      <h2 className="text-2xl">Données personnelles</h2>
      <p className="text-ink-soft">[Finalité du formulaire, durée de conservation, droits RGPD et contact.]</p>
    </section>
  );
}
