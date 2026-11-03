import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-on-ink">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <Link href="/" className="w-fit no-underline" aria-label={`${site.name}, accueil`}>
            <Image
              src="/logo-footer.png"
              alt=""
              width={1024}
              height={174}
              className="h-9 w-auto sm:h-10"
            />
          </Link>
          <p className="text-base leading-relaxed text-on-ink-muted">
            Pension féline et services pour animaux, aux portes de Nantes.
          </p>
        </div>

        <address className="flex flex-col gap-2 text-base not-italic leading-relaxed">
          <p className="font-mono text-xs tracking-tight uppercase text-on-ink-muted">Adresse</p>
          <p>
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </p>
        </address>

        <div className="flex flex-col gap-2 text-base leading-relaxed">
          <p className="font-mono text-xs tracking-tight uppercase text-on-ink-muted">Contact</p>
          <a href={`mailto:${site.email}`} className="w-fit bg-voltage px-1 text-ink no-underline">
            {site.email}
          </a>
          <a href={site.phoneHref} className="text-on-ink">
            {site.phone}
          </a>
        </div>

        <div className="flex flex-col gap-2 text-base leading-relaxed">
          <p className="font-mono text-xs tracking-tight uppercase text-on-ink-muted">Horaires · 7j/7</p>
          <ul className="text-on-ink-muted">
            {site.hours.map((h) => (
              <li key={h.label}>
                <span className="text-on-ink">{h.label}</span> : {h.value}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2 text-base leading-relaxed">
          <p className="font-mono text-xs tracking-tight uppercase text-on-ink-muted">Suivre</p>
          {site.social.map((s) => (
            <a key={s.label} href={s.href} rel="noopener" target="_blank" className="text-on-ink">
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <div className="container-page flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-on-ink/15 py-5 font-mono text-xs tracking-tight text-on-ink-muted uppercase">
        {site.legal.map((item) => (
          <Link key={item.href} href={item.href} className="text-on-ink no-underline hover:underline">
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
