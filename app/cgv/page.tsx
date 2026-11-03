import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: `Conditions applicables aux prestations ${site.name} (pension, garde, croquettes).`,
  robots: { index: false },
  alternates: { canonical: "/cgv" },
};

// TODO : faire valider / compléter par Sylvain (annulation, paiement, responsabilités).
export default function Cgv() {
  return (
    <section className="container-page flex max-w-[760px] flex-col gap-6 py-16">
      <h1 className="text-3xl md:text-5xl">Conditions générales de vente</h1>
      <p className="text-ink-soft">
        Les présentes conditions s’appliquent aux prestations proposées par {site.name} ({site.owner}) : pension
        féline, garde à domicile et livraison de croquettes.
      </p>

      <h2 className="text-2xl">Devis et réservation</h2>
      <p className="text-ink-soft">
        Une demande en ligne n’engage pas automatiquement une réservation. Sylvain confirme la disponibilité et le prix
        sous {site.responseDelay}. Le contrat est formé à cette confirmation.
      </p>

      <h2 className="text-2xl">Tarifs</h2>
      <p className="text-ink-soft">
        Les tarifs de la pension sont ceux indiqués sur le site (simulateur et grilles). Les montants affichés peuvent
        être ajustés selon la saison, la durée et les options (taxi animalier, consultation vétérinaire…).
      </p>

      <h2 className="text-2xl">Annulation</h2>
      <p className="text-ink-soft">[Conditions d’annulation et éventuels acomptes à préciser avec Sylvain.]</p>

      <h2 className="text-2xl">Responsabilité</h2>
      <p className="text-ink-soft">
        {site.name} est assuré en responsabilité civile professionnelle. Les conditions d’accueil (vaccins, stérilisation,
        identification…) figurent sur la page pension.
      </p>

      <h2 className="text-2xl">Contact</h2>
      <p className="text-ink-soft">
        {site.address.street}, {site.address.postalCode} {site.address.city} —{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> — {site.phone}.
      </p>
    </section>
  );
}
