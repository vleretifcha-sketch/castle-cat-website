import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { CtaBand, Eyebrow, Photo } from "@/components/ui";
import { reassurance } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sylvain Pierredon, pension féline et garde d’animaux",
  description: "Formé ACACED et TAV, Sylvain garde vos animaux depuis 2016 et a ouvert sa pension féline à Casson en 2020.",
  alternates: { canonical: "/a-propos" },
};

const parcours = [
  { quand: "Les débuts", titre: "La vente de croquettes", texte: "Mon premier pas dans le métier, avant d’ajouter petit à petit des cordes à mon arc." },
  { quand: "2016", titre: "La garde à domicile", texte: "Je m’occupe de vos animaux chez vous pendant vos congés : les nourrir, les sortir, les papouiller." },
  { quand: "2020", titre: "La pension féline", texte: "La folle aventure d’un lieu unique, que je fais évoluer depuis pour le confort des chats." },
];

export default function APropos() {
  return (
    <>
      <section className="container-page grid items-center gap-10 pt-16 pb-12 md:pt-20 md:pb-20 lg:pt-24 lg:grid-cols-2">
        <Reveal instant variant="media">
          <Photo
            src="/photos/sylvain-portrait-v2.jpg"
            alt="Sylvain Pierredon tenant un chat noir dans les bras"
            className="h-[420px] md:h-[520px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </Reveal>
        <div className="flex min-w-0 flex-col items-start gap-6">
          <Reveal instant>
            <Eyebrow>Qui suis-je ?</Eyebrow>
          </Reveal>
          <Reveal instant delay={90} as="h1" className="font-hero text-5xl font-normal uppercase md:text-7xl lg:text-8xl">
            Sylvain Pierredon, mordu des boules de poils
          </Reveal>
          <Reveal instant delay={180} as="p" className="text-lg leading-relaxed text-ink-soft">
            J’ai grandi entouré d’animaux, dans une petite commune au cœur d’une forêt cévenole de 1 200 hectares. J’ai décidé de faire de ma passion mon métier.
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-page flex flex-col gap-9 py-4 pb-20">
          <h2 className="text-4xl md:text-5xl">Mon parcours</h2>
          <ol className="grid gap-5 md:grid-cols-3">
            {parcours.map((etape) => (
              <li key={etape.titre} className="flex flex-col gap-3 rounded-card bg-surface p-6 md:p-8">
                <p className="font-mono text-xs tracking-tight text-ink-soft uppercase">{etape.quand}</p>
                <h3 className="text-2xl">{etape.titre}</h3>
                <p className="text-[15px] leading-relaxed text-ink-soft">{etape.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page flex flex-col gap-9 py-20">
        <h2 className="max-w-3xl text-4xl md:text-5xl">Pourquoi faire appel à un professionnel ?</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reassurance.map((item) => (
            <li key={item.title} className="flex flex-col gap-3 rounded-card bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-pill bg-mint text-ink">
                <Icon name={item.icon} size={22} />
              </span>
              <h3 className="text-lg">{item.title}</h3>
              <p className="text-[15px] leading-normal text-ink-soft">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Venez découvrir la pension"
        text="Une question avant de réserver ? Je vous réponds avec plaisir."
        href="/reservation?service=autre"
        cta="Me contacter"
        secondary={{ href: "/pension-chat-nantes", label: "Voir la pension" }}
      />
    </>
  );
}
