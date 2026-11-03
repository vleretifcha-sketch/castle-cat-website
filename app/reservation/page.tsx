import type { Metadata } from "next";
import { Suspense } from "react";
import { ReservationForm } from "@/components/ReservationForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Réserver une pension pour chat ou une garde",
  description: "Pension, garde à domicile ou croquettes : estimation immédiate du prix et réponse de Sylvain rapide.",
  alternates: { canonical: "/reservation" },
};

export default function Reservation() {
  return (
    <section className="container-page flex flex-wrap items-start gap-12 pt-8 pb-20 md:pt-10">
      <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-7">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl md:text-5xl lg:text-6xl">Votre demande</h1>
          <p className="text-[17px] leading-relaxed text-ink-soft">Quelques infos et Sylvain vous confirme la disponibilité sous {site.responseDelay}.</p>
        </div>
        {/* Suspense requis par useSearchParams (pré-remplissage depuis le simulateur) */}
        <Suspense>
          <ReservationForm />
        </Suspense>
      </div>

      <aside className="flex min-w-0 flex-[1_1_320px] flex-col gap-5">
        <div className="flex flex-col gap-4 rounded-card bg-ink p-6 text-on-ink md:p-8">
          <h2 className="text-xl text-on-ink">Plutôt par téléphone ?</h2>
          <p className="text-2xl font-medium tracking-tight text-on-ink">{site.phone}</p>
          <div className="flex flex-col gap-2">
            <a href={site.phoneHref} className="btn btn-inverse w-full no-underline">
              Appeler
            </a>
            <a
              href={site.whatsappHref}
              className="btn w-full border-[1.5px] border-on-ink/30 text-on-ink no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-3 rounded-card bg-surface p-6 text-base leading-relaxed md:p-8">
          <h2 className="text-2xl">Horaires · 7j/7</h2>
          <ul>
            {site.hours.map((h) => <li key={h.label}>{h.label} : {h.value}</li>)}
          </ul>
          <p className="text-[13px] text-muted">{site.hoursNote}</p>
        </div>
        <div className="overflow-hidden rounded-card bg-surface">
          <div className="relative h-[200px] w-full bg-mist">
            <iframe
              title={`Carte : ${site.address.street}, ${site.address.city}`}
              src={site.mapsEmbedUrl}
              className="absolute inset-0 size-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <address className="px-7 py-5 text-[15px] not-italic leading-relaxed">
            <p className="font-semibold">{site.address.street}</p>
            <p>
              {site.address.postalCode} {site.address.city}
            </p>
            <p className="mt-2">
              <a
                href={site.mapsLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium"
              >
                Ouvrir dans Google Maps
              </a>
            </p>
          </address>
        </div>
      </aside>
    </section>
  );
}
