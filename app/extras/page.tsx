import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Photo } from "@/components/ui";

export const metadata: Metadata = {
  title: "Extras : garde à domicile, balades et croquettes",
  description:
    "Visites à domicile, balades canines et livraison de croquettes autour de Casson. Petites prestations en complément de la pension.",
  alternates: { canonical: "/extras" },
};

const zones = [
  ["Zone 1 · Casson", "15 €"],
  ["Zone 2 · jusqu’à 5 km", "17 €"],
  ["Zone 3 · de 6 à 12 km", "20 €"],
  ["Au-delà de 12 km", "Sur demande"],
];

const croquettes = [
  {
    groupe: "Chien · sac de 20 kg",
    produits: [
      "Entretien",
      "Energie",
      "Maintenance",
      "Vitalité",
      "Excellence",
      "Haute performance",
      "Digest +",
      "Starter (chiots)",
    ],
  },
  {
    groupe: "Chat",
    produits: ["Chat stérilisé · 3 kg", "JMS chat adulte · 10 kg"],
  },
];

export default function Extras() {
  return (
    <>
      <PageHero
        eyebrow="Autres prestations · autour de Casson"
        title="Garde à domicile, balades et croquettes"
        text="En complément de la pension : je passe chez vous, je sors votre chien, ou je vous livre des croquettes."
        actions={
          <>
            <Link href="/reservation?service=domicile" className="btn btn-primary">
              Demander une prestation
            </Link>
            <a href="#croquettes" className="btn btn-secondary">
              Voir les croquettes
            </a>
          </>
        }
        image={{ src: "/photos/hero-extras.jpg", alt: "Chat tigré aux yeux verts, portrait en intérieur" }}
      />

      <section id="domicile" className="scroll-mt-40">
        <div className="container-page flex flex-col gap-8 pb-20">
          <h2 className="text-4xl md:text-5xl">Chez vous</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col gap-4 rounded-card bg-surface p-6 md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-3xl">Visites à domicile</h3>
                <p className="font-mono text-xs tracking-tight text-ink-soft uppercase">20 à 30 min</p>
              </div>
              <p className="leading-relaxed text-ink-soft">
                Pour les chats, les chiens et les NAC. À chaque passage, votre animal ne manque de rien :
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-ink-soft">
                <li>Eau et nourriture</li>
                <li>Litière propre</li>
                <li>Et bien sûr des papouilles</li>
              </ul>
              <p className="rounded-control bg-canvas px-4 py-3.5 text-base leading-relaxed">
                En plus, si besoin : relève du courrier et arrosage des plantes.
              </p>
            </article>
            <article className="flex flex-col gap-4 rounded-card bg-ink p-6 text-on-ink md:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-3xl text-on-ink">Balades canines</h3>
                <p className="font-mono text-xs tracking-tight text-on-ink-muted uppercase">30 min</p>
              </div>
              <p className="leading-relaxed text-on-ink-muted">
                Une ou plusieurs sorties par jour, quand vous ne pouvez pas les assurer :
              </p>
              <ul className="flex list-disc flex-col gap-2 pl-5 text-on-ink-muted">
                <li>Absence ou manque de temps (congés, travail)</li>
                <li>Incapacité physique passagère ou durable</li>
                <li>Chien au comportement difficile</li>
              </ul>
              <p className="text-base leading-relaxed text-on-ink">
                Titulaire du [CCAD / ACACED, à confirmer], au service des animaux depuis 2016.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="tarifs-domicile" className="container-page flex scroll-mt-40 flex-wrap items-start gap-12 pb-20">
        <div className="flex flex-[1_1_420px] flex-col gap-5">
          <h2 className="text-4xl md:text-5xl">Tarifs et zone</h2>
          <p className="leading-relaxed text-ink-soft">
            Prix par visite ou par balade, selon la distance depuis Casson.
          </p>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-[1.5px] border-ink">
                <th scope="col" className="p-3 text-left font-semibold">
                  Zone
                </th>
                <th scope="col" className="p-3 text-right font-semibold">
                  Par visite
                </th>
              </tr>
            </thead>
            <tbody>
              {zones.map(([zone, prix]) => (
                <tr key={zone} className="border-b border-line">
                  <th scope="row" className="p-3 text-left font-normal">
                    {zone}
                  </th>
                  <td className="p-3 text-right">{prix}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="flex flex-col gap-2 text-[15px] leading-normal text-ink-soft">
            <li>Pré-visite (consignes, clés, contrat) : 10 €</li>
            <li>Retour des clés en main propre : 10 €</li>
            <li>Photos et vidéos : offertes</li>
            <li>Jour férié : + 5 €</li>
          </ul>
        </div>
        <div className="flex flex-[1_1_420px] flex-col gap-4">
          <Photo
            src="/photos/communes-desservies.jpg"
            alt="Chat tricolore allongé sur une poutre en bois"
            className="h-[320px]"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <p className="text-[15px] leading-relaxed text-ink-soft">
            <strong className="text-ink">Communes desservies :</strong> Casson, alentours, agglomération nantaise.
          </p>
        </div>
      </section>

      <section id="croquettes" className="scroll-mt-40 bg-surface">
        <div className="container-page flex flex-col gap-8 py-20">
          <div className="flex max-w-3xl flex-col gap-4">
            <h2 className="text-4xl md:text-5xl">Livraison de croquettes</h2>
            <p className="text-lg leading-snug text-ink-soft">
              Chien et chat, livrés dans un rayon de 12 km autour de Casson. Livraison offerte à Casson.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {croquettes.map(({ groupe, produits }) => (
              <div key={groupe} className="flex flex-col gap-4 rounded-card bg-canvas p-6 md:p-8">
                <h3 className="text-2xl">{groupe}</h3>
                <ul className="flex flex-col gap-2">
                  {produits.map((nom) => (
                    <li key={nom} className="border-b border-line pb-2 text-[15px] last:border-0 last:pb-0">
                      {nom}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link href="/reservation?service=croquettes" className="btn btn-primary self-start">
            Commander des croquettes
          </Link>
        </div>
      </section>

      <section className="container-page pb-20 pt-4">
        <div className="overflow-hidden rounded-card bg-ink text-on-ink lg:grid lg:grid-cols-2">
          <Photo
            src="/photos/croquettes.jpg"
            alt="Sacs de croquettes prêts à être livrés"
            className="h-[240px] rounded-none lg:h-full lg:min-h-[360px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="flex flex-col justify-center gap-6 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs tracking-tight text-on-ink-muted uppercase">Extras</p>
              <h2 className="text-3xl text-on-ink md:text-4xl">Une petite prestation à prévoir&nbsp;?</h2>
              <p className="max-w-md text-base leading-relaxed text-on-ink-muted">
                Garde, balade ou croquettes : décrivez votre besoin, je vous réponds sous 24h.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/reservation?service=domicile" className="btn btn-inverse w-full sm:w-auto">
                Faire une demande
              </Link>
              <Link
                href="/pension-chat-nantes"
                className="btn w-full border-[1.5px] border-on-ink/35 text-on-ink no-underline sm:w-auto"
              >
                Voir la pension
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
