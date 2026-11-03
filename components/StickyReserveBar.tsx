"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/** Barre CTA mobile : visible seulement quand le CTA du hero quitte l’écran. */
export function StickyReserveBar({ observeId }: { observeId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById(observeId);
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [observeId]);

  return (
    <>
      <div
        className={`lg:hidden ${visible ? "h-[calc(4.75rem+env(safe-area-inset-bottom))]" : "h-0"}`}
        aria-hidden="true"
      />
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line/60 bg-canvas/80 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 lg:hidden ${
          visible ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
        aria-hidden={!visible}
      >
        <Link
          href="/reservation"
          className="btn btn-primary w-full"
          tabIndex={visible ? undefined : -1}
        >
          Réserver un séjour
        </Link>
      </div>
    </>
  );
}
