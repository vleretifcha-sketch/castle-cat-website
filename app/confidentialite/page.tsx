import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Comment ${site.name} collecte et utilise vos données personnelles.`,
  robots: { index: false },
  alternates: { canonical: "/confidentialite" },
};

// TODO : compléter avec le détail RGPD (finalités, bases légales, durées, sous-traitants).
export default function Confidentialite() {
  return (
    <section className="container-page flex max-w-[760px] flex-col gap-6 py-16">
      <h1 className="text-3xl md:text-5xl">Politique de confidentialité</h1>
      <p className="text-ink-soft">
        Responsable du traitement : {site.owner} — {site.name}, {site.address.street}, {site.address.postalCode}{" "}
        {site.address.city}. Contact : <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2 className="text-2xl">Données collectées</h2>
      <p className="text-ink-soft">
        Via le formulaire de contact ou de réservation : nom, téléphone, e-mail, informations sur votre animal et votre
        demande. Aucune donnée n’est vendue à des tiers.
      </p>

      <h2 className="text-2xl">Finalité</h2>
      <p className="text-ink-soft">
        Traiter votre demande (pension, garde à domicile, croquettes ou autre), vous répondre et assurer le suivi du
        service.
      </p>

      <h2 className="text-2xl">Durée de conservation</h2>
      <p className="text-ink-soft">
        [Durée à confirmer — ex. le temps du traitement de la demande, puis archivage limité si obligation légale.]
      </p>

      <h2 className="text-2xl">Vos droits</h2>
      <p className="text-ink-soft">
        Vous disposez d’un droit d’accès, de rectification, d’effacement et d’opposition. Pour l’exercer :{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> ou {site.phone}. Vous pouvez aussi saisir la CNIL.
      </p>
    </section>
  );
}
