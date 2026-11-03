import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Reveal } from "@/components/Reveal";
import { StickyReserveBar } from "@/components/StickyReserveBar";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand, Eyebrow, MediaCard, Photo } from "@/components/ui";
import { reassurance } from "@/lib/site";

const catAvatars = [
  { src: "/photos/avatars/cat-1.jpg", alt: "Portrait d’un chat" },
  { src: "/photos/avatars/cat-2.jpg", alt: "Portrait d’un chat" },
  { src: "/photos/avatars/cat-3.jpg", alt: "Portrait d’un chat" },
] as const;

export default function Accueil() {
  return (
    <>
      <section className="container-page grid items-center gap-10 pt-16 pb-16 md:pt-20 lg:grid-cols-2 lg:pt-24 lg:pb-20">
        <div className="flex max-w-3xl flex-col items-start gap-6">
          <Reveal instant className="flex flex-wrap items-center gap-3">
            <Eyebrow>Pension féline</Eyebrow>
            <div className="flex items-center gap-2.5">
              <div className="flex items-center pl-1" aria-hidden="true">
                {catAvatars.map((cat, i) => (
                  <span
                    key={cat.src}
                    className="relative size-8 overflow-hidden rounded-pill border-2 border-canvas bg-mist"
                    style={{ marginLeft: i === 0 ? 0 : -10, zIndex: catAvatars.length - i }}
                  >
                    <Image src={cat.src} alt="" width={32} height={32} className="size-full object-cover" />
                  </span>
                ))}
              </div>
              <p className="text-sm font-medium text-ink-soft">+ de 200 chats satisfaits</p>
            </div>
          </Reveal>
          <Reveal instant delay={90} as="h1" className="font-hero text-5xl font-normal uppercase md:text-7xl lg:text-8xl">
            Votre chat, comme{" "}
            <span className="whitespace-nowrap">un roi&nbsp;!</span>
          </Reveal>
          <Reveal instant delay={180} as="p" className="max-w-xl text-lg leading-snug text-ink-soft">
            500 m², 4 zones et un catio de 160 m² à Casson. Votre chat est chouchouté, vous partez serein.
          </Reveal>
          <Reveal instant delay={260} className="w-full">
            <div id="hero-cta" className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
              <Link href="/reservation" className="btn btn-primary w-full sm:w-auto">Réserver un séjour</Link>
              <Link href="/pension-chat-nantes#simulateur" className="btn btn-secondary w-full sm:w-auto">Simuler un séjour</Link>
            </div>
          </Reveal>
          <Reveal instant delay={340} as="p" className="font-mono text-xs tracking-tight text-ink-soft uppercase">
            Ouvert 7j/7 · Dès 10 € par jour
          </Reveal>
        </div>
        <Reveal instant delay={160} variant="media">
          <Photo
            src="/photos/hero-jardin.jpg"
            alt="Chat tigré dans le jardin spa rustique de la pension, avec bassin et plantes"
            className="h-[360px] md:h-[520px]"
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority
          />
        </Reveal>
      </section>

      <section aria-label="Chiffres clés">
        <dl className="container-page grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-4 md:gap-8 md:py-10">
          {[
            ["500 m²", "d’espaces pour les chats"],
            ["4", "zones pour tous les caractères"],
            ["160 m²", "de catio en plein air"],
            ["Depuis 2016", "aux côtés de vos animaux"],
          ].map(([chiffre, label], i) => (
            <Reveal key={label} delay={i * 70} className="flex flex-col gap-1">
              <dd className="text-2xl font-medium tracking-tight md:text-3xl">{chiffre}</dd>
              <dt className="text-sm text-ink-soft">{label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="container-page flex flex-col gap-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal className="flex max-w-2xl flex-col gap-4">
            <h2 className="text-4xl md:text-5xl">Une pension pensée pour les chats</h2>
            <p className="text-lg leading-snug text-ink-soft">Parcours aériens, nids douillets et un catio pour fouler l’herbe.</p>
          </Reveal>
          <Reveal delay={100}>
            <Link href="/pension-chat-nantes" className="btn-tertiary">
              <span>Visiter la pension</span>
              <Icon name="arrow_outward" size={18} />
            </Link>
          </Reveal>
        </div>
        <div className="flex flex-wrap gap-4">
          <Reveal variant="media" className="h-[420px] min-w-0 flex-[2_1_420px]">
            <Photo
              src="/photos/section-foret.jpg"
              alt="La Forêt des Capucins : branches naturelles, plantes et luminaires"
              className="h-full"
              sizes="(min-width: 768px) 60vw, 100vw"
            />
          </Reveal>
          <div className="flex flex-[1_1_260px] flex-col gap-4">
            <Reveal delay={90} variant="media" className="min-h-[200px] flex-1">
              <Photo
                src="/photos/section-vie-chato.jpg"
                alt="La vie de chat’ô : allée boisée avec bancs et guirlandes"
                className="h-full min-h-[200px]"
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </Reveal>
            <Reveal delay={160} variant="media" className="min-h-[200px] flex-1">
              <Photo
                src="/photos/section-bassin.jpg"
                alt="Le bassin du colibri et l’arbre en fleurs sous la pergola"
                className="h-full min-h-[200px]"
                sizes="(min-width: 768px) 30vw, 100vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page flex flex-col gap-8 pb-20">
          <Reveal as="h2" className="text-4xl md:text-5xl">
            Pension et extras
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal variant="media">
              <MediaCard
                href="/pension-chat-nantes"
                src="/photos/box-prive.jpg"
                alt="Chat dans un box privé sur deux niveaux"
                eyebrow="Service principal"
                title="Pension féline"
                text="Deux offres : la vie de chat’ô à prix doux, ou les 500 m² avec box privé, liberté ou espace privatisé. Alimentation et soins inclus."
                meta="Dès 10 € par jour · alimentation incluse"
                className="min-h-[420px]"
              />
            </Reveal>
            <Reveal delay={100} variant="media">
              <MediaCard
                href="/extras"
                src="/photos/balade-canine.jpg"
                alt="Chien en balade sur un chemin de campagne"
                eyebrow="Autres prestations"
                title="Extras"
                text="Visites à domicile, balades canines et livraison de croquettes autour de Casson."
                meta="Dès 15 € la visite · croquettes sur devis"
                className="min-h-[420px]"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="container-page flex flex-col gap-10 py-4 pb-20">
        <Reveal as="h2" className="max-w-3xl text-4xl md:text-5xl">
          Pourquoi confier votre chat à Castle Cat
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reassurance.map((item, i) => (
            <Reveal key={item.title} as="li" delay={i * 80} className="flex items-start gap-4 rounded-card bg-surface p-6">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-mint text-ink">
                <Icon name={item.icon} size={22} />
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg">{item.title}</h3>
                <p className="text-base leading-normal text-ink-soft normal-case">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <Reveal>
        <Testimonials />
      </Reveal>

      <section className="container-page flex flex-wrap items-center gap-12 py-8 pb-20">
        <Reveal variant="media">
          <Photo
            src="/photos/sylvain-portrait-v2.jpg"
            alt="Sylvain tenant un chat noir dans les bras"
            className="h-[360px] w-full shrink-0 sm:size-[360px]"
            sizes="360px"
          />
        </Reveal>
        <Reveal delay={120} className="flex min-w-0 flex-[1_1_420px] flex-col items-start gap-4">
          <Eyebrow>Qui s’occupe de votre chat</Eyebrow>
          <h2 className="text-4xl md:text-5xl">Sylvain, mordu des boules de poils</h2>
          <p className="text-lg leading-snug text-ink-soft normal-case">
            J’ai grandi entouré d’animaux au cœur d’une forêt cévenole. D’abord les croquettes, puis la garde à domicile dès 2016, et la pension féline en 2020.
          </p>
          <Link href="/a-propos" className="btn-tertiary">
            <span>Découvrir mon parcours</span>
            <Icon name="arrow_outward" size={18} />
          </Link>
        </Reveal>
      </section>

      <Reveal>
        <CtaBand
          title="Prêt à partir serein ?"
          text="Indiquez vos dates et le nombre de chats, Sylvain vous confirme la disponibilité."
          href="/reservation"
          cta="Réserver un séjour"
        />
      </Reveal>

      <StickyReserveBar observeId="hero-cta" />
    </>
  );
}
