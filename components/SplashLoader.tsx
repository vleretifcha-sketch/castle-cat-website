"use client";

import { useEffect, useState } from "react";
import { LottieLight as Lottie } from "lottie-react";
import catPlaying from "@/assets/cat-playing.json";

const DURATION_MS = 2500;
const FADE_MS = 350;
const STORAGE_KEY = "castle-cat-splash-seen";

export function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(false);
      document.documentElement.classList.remove("splash-pending");
      return;
    }

    document.documentElement.classList.add("splash-pending");

    const fadeTimer = window.setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setFading(true);
    }, DURATION_MS);

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
      document.documentElement.classList.remove("splash-pending");
    }, DURATION_MS + FADE_MS);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      document.body.style.overflow = "";
      document.documentElement.classList.remove("splash-pending");
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy={!fading}
      aria-label="Chargement du site"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-10 bg-canvas px-8 transition-opacity ease-out ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="aspect-[1070/456] w-full max-w-md">
        <Lottie src={catPlaying} loop autoplay className="size-full" />
      </div>

      <div className="flex w-full max-w-xs flex-col gap-3">
        <div
          className="h-1.5 w-full overflow-hidden rounded-pill bg-line"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Progression"
        >
          <div
            className="splash-progress h-full rounded-pill bg-sable"
            style={{ animationDuration: `${DURATION_MS}ms` }}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-wordmark.svg"
          alt="Castle Cat"
          width={1024}
          height={174}
          className="mx-auto h-7 w-auto sm:h-8"
        />
      </div>
    </div>
  );
}
