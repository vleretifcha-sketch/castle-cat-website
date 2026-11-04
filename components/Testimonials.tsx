"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/Icon";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { googleRating, reviews } from "@/lib/reviews";

const videos = [
  {
    id: "video-1",
    label: "Témoignage vidéo 1",
    poster: "/photos/temoignages/temoignage-1.jpg",
    src: "/videos/temoignage-1.mp4",
  },
  {
    id: "video-2",
    label: "Témoignage vidéo 2",
    poster: "/photos/temoignages/temoignage-2.jpg",
    src: "/videos/temoignage-2.mp4",
  },
  {
    id: "video-3",
    label: "Témoignage vidéo 3",
    poster: "/photos/temoignages/temoignage-3.jpg",
    src: "/videos/temoignage-3.mp4",
  },
] as const;

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

function ReviewCard({
  profile,
  name,
  source,
  body,
  stars,
}: {
  profile: string;
  name: string;
  source: string;
  body: string;
  stars: number;
}) {
  return (
    <Card className="relative h-full w-72 overflow-hidden p-4">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-center gap-2">
          <Image
            src={profile}
            alt=""
            width={32}
            height={32}
            className="size-8 rounded-pill object-cover"
          />
          <div className="flex min-w-0 flex-col">
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-ink-soft">{source}</p>
          </div>
          <p role="img" aria-label={`${stars} étoiles sur 5`} className="ml-auto flex gap-0.5">
            {Array.from({ length: stars }).map((_, s) => (
              <Icon key={s} name="star" size={14} filled className="text-sable" />
            ))}
          </p>
        </div>
        <p className="line-clamp-4 text-sm leading-relaxed text-ink-soft">{body}</p>
      </CardContent>
    </Card>
  );
}

function VideoCard({
  label,
  poster,
  src,
}: {
  label: string;
  poster: string;
  src: string;
}) {
  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-card bg-ink">
      {src ? (
        <video className="size-full object-cover" poster={poster} controls playsInline preload="metadata">
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <div className="relative size-full">
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover opacity-80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink/35 p-6 text-center text-on-ink">
            <span className="flex size-14 items-center justify-center rounded-pill bg-surface/90 text-ink">
              <Icon name="play_arrow" size={32} filled />
            </span>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-on-ink-muted">Vidéo à ajouter</p>
          </div>
        </div>
      )}
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  function go(delta: number) {
    setActive((i) => (i + delta + videos.length) % videos.length);
  }

  return (
    <section className="flex flex-col gap-10 py-4 pb-20">
      <div className="container-page flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-4xl md:text-5xl">Ils nous ont confié leur chat</h2>
        <a
          href={googleRating.href}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <Icon name="star" size={18} filled className="text-sable" />
          <span>
            <strong className="font-medium text-ink">{googleRating.score}/5</strong> · {googleRating.count}{" "}
            {googleRating.label}
          </span>
          <span className="sr-only"> (ouvre la fiche Google dans un nouvel onglet)</span>
        </a>
      </div>

      <div className="container-page">
        <div className="hidden gap-4 md:grid md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>

        <div className="flex flex-col gap-3 md:hidden">
          <VideoCard {...videos[active]} />
          <div className="flex items-center justify-between gap-3">
            <div className="flex gap-2" role="tablist" aria-label="Choisir une vidéo">
              {videos.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`${item.label} (${i + 1} sur ${videos.length})`}
                  className={`size-2.5 rounded-pill transition-colors ${i === active ? "bg-ink" : "bg-ink/30"}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="flex size-11 items-center justify-center text-ink"
                aria-label="Vidéo précédente"
                onClick={() => go(-1)}
              >
                <Icon name="chevron_left" size={28} />
              </button>
              <button
                type="button"
                className="flex size-11 items-center justify-center text-ink"
                aria-label="Vidéo suivante"
                onClick={() => go(1)}
              >
                <Icon name="chevron_right" size={28} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:45s]">
          {firstRow.map((review) => (
            <ReviewCard key={`${review.name}-a`} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:45s]">
          {secondRow.map((review) => (
            <ReviewCard key={`${review.name}-b`} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-canvas" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-canvas" />
      </div>
    </section>
  );
}
