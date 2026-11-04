import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { CtaBand, Eyebrow, FaqItem, MediaCard, PageHero, Photo } from "@/components/ui";
import { FullPriceGrid, PriceSimulator } from "@/components/PriceSimulator";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Pension féline à Casson (44) : tarifs et réservation",
  description: "Deux offres dès 10 € par jour, alimentation incluse. Calculez le prix de votre séjour et réservez en ligne.",
  alternates: { canonical: "/pension-chat-nantes" },
};

const espaces: { nom: string; src: string; alt: string; text?: string }[] = [
  {
    nom: "La Forêt des Capucins",
    src: "/photos/foret-capucins.jpg",
    alt: "La Forêt des Capucins : branches naturelles, plantes et parcours en hauteur",
  },
  {
    nom: "La vie de chat’ô",
    src: "/photos/vie-chato-allee.jpg",
    alt: "La vie de chat’ô : allée boisée avec bancs, plantes et guirlandes",
  },
  {
    nom: "Les bassins du Colibri",
    src: "/photos/bassin-colibri.jpg",
    alt: "Les bassins du Colibri : bassins, arbres en fleurs et pergola",
  },
  {
    nom: "Le Catio",
    src: "/photos/catio.jpg",
    alt: "Le Catio : parcours en bois naturel sur 160 m² en plein air",
    text: "160 m² d’herbe, de soleil et de parcours en bois naturel.",
  },
];

const inclus = [
  "Alimentation en libre-service élaborée par un vétérinaire nutritionniste",
  "Litières faites chaque jour, en granulés de bois naturel",
  "Traitements vétérinaires administrés (médicaments, injections d’insuline…)",
  "Alimentation de votre foyer sur demande",
  "Photos et vidéos de votre chat pendant le séjour",
];

// Une seule source pour l'affichage ET les données structurées FAQPage
const faq: { q: string; a: string }[] = [
  { q: "Combien coûte la pension pour un chat ?", a: "10 € par jour avec la vie de chat’ô. Dans les espaces XXL, de 10 € le premier jour à 13 € par jour pour les longs séjours en basse saison. Le simulateur calcule votre prix exact." },
  { q: "Quelle différence entre les deux offres ?", a: "La vie de chat’ô est un espace partagé de 40 m² à prix fixe, ouvert hors été. Les espaces XXL, ce sont 3 espaces de 60 à 100 m² et un catio de 160 m² — Forêt des Capucins, vie de chat’ô, bassins du Colibri et Catio — en liberté ou en espace privatisé sur demande. Soins et alimentation sont identiques." },
  { q: "Mon chat va-t-il bien cohabiter avec les autres ?", a: "Sur un espace neutre et vaste, les chats partagent leur territoire sans animosité. S’il préfère être seul, l’espace privatisé est possible sur demande, au même tarif." },
  { q: "Que mange-t-il pendant le séjour ?", a: "Une alimentation élaborée par un vétérinaire nutritionniste, incluse dans le prix. L’alimentation de votre foyer peut être appliquée sur demande." },
  { q: "Mon chat suit un traitement, c’est possible ?", a: "Oui. J’administre les traitements vétérinaires (médicaments, injections d’insuline…), sans supplément." },
  { q: "Vais-je avoir des nouvelles ?", a: "Oui, photos et vidéos de votre chat pendant le séjour, gratuitement." },
  { q: "Accueillez-vous d’autres animaux ?", a: "Oui, les NAC : lapins, furets, rongeurs. [Conditions et tarifs à préciser]" },
  { q: "Je ne peux pas l’amener, comment faire ?", a: "Le taxi animalier vient le chercher chez vous et le ramène à la fin du séjour, sur devis." },
];

export default function Pension() {
  return (
    <>
      <PageHero
        eyebrow="Pension féline · Casson (44)"
        title="Pension pour chats à Casson, près de Nantes"
        text="Vous partez ? Votre chat reste au calme, dans un lieu pensé pour lui, quelle que soit la durée."
        actions={
          <>
            <a href="#tarifs" className="btn btn-primary">Calculer le prix de mon séjour</a>
            <Link href="/reservation" className="btn btn-secondary">Réserver un séjour</Link>
          </>
        }
        note="Dès 10 € par jour · alimentation incluse"
      />

      <section className="container-page flex flex-col gap-8 pb-20">
        <div className="flex flex-wrap gap-12">
          <h2 className="flex-[1_1_320px] text-4xl md:text-5xl">3 espaces XXL et un catio</h2>
          <p className="flex-[2_1_440px] text-lg leading-snug text-ink-soft">
            Forêt, alcôves, bassins poissonneux et catio en plein air. À chaque caractère son havre de paix.
          </p>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {espaces.map((espace) => (
            <li key={espace.nom}>
              <MediaCard
                src={espace.src}
                alt={espace.alt}
                title={espace.nom}
                text={espace.text}
                className="min-h-[280px] md:min-h-[340px]"
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page flex flex-wrap gap-12 pb-20">
        <div className="flex flex-[1_1_440px] flex-col gap-5">
          <h2 className="text-4xl">Inclus dans chaque séjour</h2>
          <ul className="flex flex-col gap-3.5 leading-normal">
            {inclus.map((item) => (
              <li key={item} className="flex gap-3">
                <Icon name="check" size={20} className="mt-0.5 shrink-0 text-ink" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-[1_1_400px] flex-col gap-3 rounded-card bg-surface p-6 md:p-8">
          <h3 className="tag-canvas w-fit">En option</h3>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-3">
                <p className="font-medium">Taxi animalier</p>
                <p className="shrink-0 font-medium">Sur devis</p>
              </div>
              <p className="text-[15px] leading-normal text-ink-soft">
                Vous ne pouvez pas vous déplacer ? Transport accrédité jusqu’à la pension, depuis Casson.
              </p>
            </div>
            <div className="border-t border-line" aria-hidden="true" />
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between gap-3">
                <p className="font-medium">Consultation vétérinaire</p>
                <p className="shrink-0 font-medium">40&nbsp;€</p>
              </div>
              <p className="text-[15px] leading-normal text-ink-soft">
                En cas de souci de santé, je prends RDV avec votre accord et j’accompagne votre chat. Déplacement inclus.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="tarifs" className="scroll-mt-40">
        <div className="container-page flex flex-col gap-8 py-20">
          <div className="flex max-w-3xl flex-col items-start gap-4">
            <Eyebrow>Tarifs 2026–2027</Eyebrow>
            <h2 className="text-4xl md:text-5xl">Deux façons de séjourner</h2>
            <p className="text-[17px] leading-relaxed text-ink-soft">Alimentation incluse dans les deux offres. Découvrez-les, puis calculez le prix de votre séjour juste en dessous.</p>
          </div>

          <div className="flex flex-wrap items-stretch gap-6">
            <article className="flex min-w-0 flex-[1_1_420px] flex-col rounded-card bg-surface p-4 md:p-5">
              <Photo src="/photos/vie-chato-allee.jpg" alt="La vie de chat’ô : allée boisée avec bancs, plantes et guirlandes" className="h-52 rounded-media" sizes="(min-width: 768px) 45vw, 100vw" />
              <div className="flex flex-1 flex-col gap-4 px-2 pt-6 pb-2 md:px-3">
                <div className="flex flex-wrap gap-2">
                  <span className="tag">Prix doux</span>
                  <span className="tag-quiet">1er sept. → 30 juin</span>
                </div>
                <h3 className="text-3xl">La vie de chat’ô</h3>
                <p className="leading-relaxed text-ink-soft">
                  Un espace partagé de 40&nbsp;m². Soins et alimentation inclus.
                </p>
                <div className="mt-auto flex flex-col gap-1 border-t border-line pt-5">
                  <p className="text-3xl font-medium tracking-tight">10&nbsp;€</p>
                  <p className="text-sm text-ink-soft">par jour et par chat, dès le 1er jour</p>
                  <p className="text-sm text-muted">Basse saison · prix fixe</p>
                </div>
              </div>
            </article>
            <article className="flex min-w-0 flex-[1_1_420px] flex-col rounded-card bg-ink p-4 text-on-ink md:p-5">
              <Photo src="/photos/foret-capucins.jpg" alt="La Forêt des Capucins et ses parcours en bois" className="h-52 rounded-media" sizes="(min-width: 768px) 45vw, 100vw" />
              <div className="flex flex-1 flex-col gap-4 px-2 pt-6 pb-2 md:px-3">
                <div className="flex flex-wrap gap-2">
                  <span className="tag-inverse">Toute l’année</span>
                  <span className="tag-inverse">Dégressif</span>
                </div>
                <h3 className="text-3xl text-on-ink">Les espaces XXL</h3>
                <p className="leading-relaxed text-on-ink-muted">
                  3 espaces de 60 à 100&nbsp;m² et un catio de 160&nbsp;m².
                </p>
                <details className="rounded-control border border-on-ink/20 open:bg-on-ink/5">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 text-sm font-medium text-on-ink [&::-webkit-details-marker]:hidden">
                    Deux formules au même prix
                    <Icon name="chevron_right" size={18} className="shrink-0 rotate-90 opacity-70" />
                  </summary>
                  <ul className="flex flex-col gap-2 border-t border-on-ink/15 px-3 py-3 text-[15px] leading-snug text-on-ink-muted">
                    <li>En liberté avec les copains</li>
                    <li>Espace privatisé sur demande</li>
                  </ul>
                </details>
                <div className="mt-auto flex flex-col gap-1 border-t border-on-ink/20 pt-5">
                  <p className="text-3xl font-medium tracking-tight">
                    13&nbsp;€
                    <a
                      href="#prix-espaces-note"
                      className="align-super text-base font-medium text-on-ink no-underline"
                      aria-describedby="prix-espaces-note"
                    >
                      *
                    </a>
                  </p>
                  <p id="prix-espaces-note" className="text-sm text-on-ink-muted">
                    * Basse saison · À partir du 29e jour · Par jour et par chat
                  </p>
                </div>
              </div>
            </article>
          </div>

          <PriceSimulator />
          <FullPriceGrid />
        </div>
      </section>

      <section className="container-page flex flex-wrap gap-12 py-20">
        <div className="flex flex-[1_1_380px] flex-col gap-5">
          <h2 className="text-4xl">Conditions d’admission</h2>
          <p className="leading-relaxed text-ink-soft">À l’arrivée : le carnet de santé et une photo de votre chat. Il doit être :</p>
          <ul className="flex flex-wrap gap-2.5">
            {["Stérilisé", "Vacciné", "Identifié", "Déparasité"].map((c) => (
              <li key={c} className="tag">{c}</li>
            ))}
          </ul>
          <p className="text-sm text-muted">Vaccin : leucose incluse, antirabique facultatif.</p>
        </div>
        <div className="flex flex-[1_1_480px] flex-col gap-3">
          <h2 className="text-4xl">Questions fréquentes</h2>
          {faq.map((item) => (
            <FaqItem key={item.q} question={item.q}>{item.a}</FaqItem>
          ))}
        </div>
      </section>

      <CtaBand
        title="Réservez le séjour de votre chat"
        text="Les places partent vite en été : indiquez vos dates dès maintenant."
        href="/reservation"
        cta="Réserver un séjour"
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
    </>
  );
}
