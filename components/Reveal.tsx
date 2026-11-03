"use client";

import {
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealVariant = "up" | "fade" | "media";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Délai en ms après le déclenchement. */
  delay?: number;
  /** Apparition au mount (hero) plutôt qu’au scroll. */
  instant?: boolean;
  variant?: RevealVariant;
  as?: ElementType;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "className" | "style">;

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Attend la fin du splash, puis double rAF pour que opacity:0 soit peint avant l’animation. */
function afterSplashPaint(run: () => void) {
  let cancelled = false;
  let raf1 = 0;
  let raf2 = 0;

  const paintThenRun = () => {
    if (cancelled) return;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) run();
      });
    });
  };

  const root = document.documentElement;
  if (!root.classList.contains("splash-pending")) {
    paintThenRun();
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }

  const observer = new MutationObserver(() => {
    if (!root.classList.contains("splash-pending")) {
      observer.disconnect();
      paintThenRun();
    }
  });
  observer.observe(root, { attributes: true, attributeFilter: ["class"] });

  return () => {
    cancelled = true;
    observer.disconnect();
    cancelAnimationFrame(raf1);
    cancelAnimationFrame(raf2);
  };
}

/** Apparition premium au scroll / au chargement. */
export function Reveal({
  children,
  className = "",
  delay = 0,
  instant = false,
  variant = "up",
  as: Tag = "div",
  style,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(true);
      return;
    }

    if (instant) {
      return afterSplashPaint(() => setShown(true));
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [instant]);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? "is-revealed" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
