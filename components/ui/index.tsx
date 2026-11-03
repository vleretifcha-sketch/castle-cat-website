import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/Icon";

/** Photo du site — remplace les anciens placeholders du wireframe. */
export function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 560px, 100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const radius = className.includes("rounded-") ? "" : "rounded-card";
  return (
    <div className={`relative overflow-hidden bg-mist ${radius} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}

/** Conservé pour les emplacements sans photo (carte, etc.). */
export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  const radius = className.includes("rounded-") ? "" : "rounded-card";
  const surface = className.includes("bg-") ? "" : "bg-mist";
  const ink = className.includes("text-") ? "" : "text-ink-soft";
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center p-6 text-center font-mono text-xs tracking-tight ${radius} ${surface} ${ink} ${className}`}
    >
      [{label}]
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

/** Card photo : overlay bas, flèche si lien. */
export function MediaCard({
  href,
  src,
  alt,
  eyebrow,
  title,
  text,
  meta,
  className = "",
}: {
  href?: string;
  src: string;
  alt: string;
  eyebrow?: string;
  title: string;
  text?: string;
  meta?: string;
  className?: string;
}) {
  const classes = `group relative block min-h-[280px] overflow-hidden rounded-card no-underline ${className}`;
  const body = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink/75 from-0% via-ink/20 via-30% to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
        <div className="flex min-w-0 flex-1 flex-col gap-2 text-on-ink">
          {eyebrow && <p className="eyebrow bg-sable text-ink">{eyebrow}</p>}
          <h3 className={`text-on-ink ${text ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"}`}>{title}</h3>
          {text && (
            <p className="max-w-xl text-[15px] leading-snug text-on-ink md:text-base md:leading-relaxed md:text-on-ink/90">
              {text}
            </p>
          )}
          {meta && <p className="text-sm font-medium text-on-ink">{meta}</p>}
        </div>
        {href && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-pill border border-on-ink/25 bg-on-ink/15 text-on-ink backdrop-blur-md transition-colors group-hover:bg-on-ink/25 md:size-12">
            <Icon name="arrow_outward" size={22} />
            <span className="sr-only">Voir {title}</span>
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {body}
      </Link>
    );
  }

  return <article className={classes}>{body}</article>;
}

/** Bandeau d'appel à l'action sombre en bas de page. */
export function CtaBand({ title, text, href, cta, secondary }: {
  title: string;
  text: string;
  href: string;
  cta: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-ink text-on-ink">
      <div className="container-page flex flex-wrap items-end justify-between gap-10 py-20">
        <div className="flex max-w-3xl flex-col gap-4">
          <h2 className="font-display text-5xl leading-[0.9] font-bold tracking-tight md:text-7xl">{title}</h2>
          <p className="max-w-xl text-base leading-relaxed text-on-ink-muted">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          {secondary && (
            <Link href={secondary.href} className="btn border-[1.5px] border-on-ink text-on-ink">
              {secondary.label}
            </Link>
          )}
          <Link href={href} className="btn btn-inverse">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Ouverture des pages de service.
 * Hiérarchie : Satoshi sentence-case + photo en bandeau — le display Gasoek reste réservé à l’accueil.
 */
export function PageHero({ eyebrow, title, text, actions, image, note }: {
  eyebrow: string;
  title: string;
  text: string;
  actions: ReactNode;
  image?: { src: string; alt: string };
  note?: string;
}) {
  return (
    <section className="pb-12 md:pb-16">
      <div className="container-page flex flex-col gap-8 pt-12 md:gap-10 md:pt-16 lg:pt-20">
        <div className="flex max-w-3xl flex-col items-start gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-4xl md:text-5xl lg:text-6xl">{title}</h1>
          <p className="max-w-xl text-lg leading-snug text-ink-soft">{text}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap [&_.btn]:w-full sm:[&_.btn]:w-auto">
            {actions}
          </div>
          {note && (
            <p className="font-mono text-xs tracking-tight text-ink-soft uppercase">{note}</p>
          )}
        </div>
        {image && (
          <Photo
            src={image.src}
            alt={image.alt}
            className="h-[240px] w-full md:h-[380px]"
            sizes="(min-width: 1200px) 1200px, 100vw"
            priority
          />
        )}
      </div>
    </section>
  );
}

export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  return (
    <details className="border-b border-line py-4">
      <summary className="text-base font-medium normal-case tracking-normal">{question}</summary>
      <div className="pt-3 text-base leading-relaxed text-ink-soft normal-case">{children}</div>
    </details>
  );
}
