"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/Icon";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="relative sticky top-0 z-50 border-b border-line/60 bg-canvas/70 backdrop-blur-xl">
        <div className="container-page relative flex min-h-16 items-center gap-4 py-3 lg:min-h-20">
          <Link href="/" className="relative z-10 flex items-center no-underline" aria-label={`${site.name}, accueil`}>
            <Image
              src="/logo.png"
              alt=""
              width={355}
              height={179}
              priority
              className="h-9 w-auto lg:h-11"
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-nav border border-line/50 bg-surface/80 px-3 py-1.5 shadow-none backdrop-blur-md lg:flex"
          >
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-nav px-4 py-2 text-[15px] font-medium no-underline transition-colors ${active ? "bg-mist text-ink" : "text-ink-soft hover:bg-mist hover:text-ink"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 ml-auto flex items-center gap-2">
            <Link
              href="/reservation"
              className={`btn btn-primary min-h-11 rounded-nav px-5 lg:px-6 ${isHome ? "hidden lg:inline-flex" : ""}`}
            >
              <span className="lg:hidden">Réserver</span>
              <span className="hidden lg:inline">Réserver un séjour</span>
            </Link>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-control border-[1.5px] border-line-strong lg:hidden"
              aria-expanded={open}
              aria-controls="menu-principal"
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? "close" : "menu"} size={24} />
            </button>
          </div>
        </div>

        <nav
          id="menu-principal"
          aria-label="Navigation principale"
          hidden={!open}
          className={`absolute inset-x-0 top-full border-b border-line/60 bg-canvas/95 py-4 backdrop-blur-xl lg:hidden ${open ? "" : "hidden"}`}
        >
          <div className="container-page flex flex-col gap-1">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-control px-3 py-3 text-base no-underline ${active ? "bg-mint font-medium" : "text-ink-soft"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-ink/30 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}
