import type { SVGProps } from "react";

/**
 * Icônes Material Design (SVG 24×24).
 * Affichage fiable sans webfont / ligatures.
 */
const paths: Record<string, string> = {
  menu: "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z",
  close: "M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
  check: "M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  play_arrow: "M8 5v14l11-7z",
  pause: "M6 19h4V5H6v14zm8-14v14h4V5h-4z",
  chevron_left: "M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z",
  chevron_right: "M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",
  arrow_outward: "M6 6v2h8.59L5 17.59 6.41 19 16 9.41V18h2V6z",
  star: "M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z",
  workspace_premium:
    "M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3 1 9l11 6 9-4.91V17h2V9L12 3z",
  history:
    "M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6a7 7 0 1 1 7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.95 8.95 0 0 0 13 21a9 9 0 0 0 0-18m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z",
  verified_user:
    "M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm-2 16-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9z",
  monitor_heart:
    "M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3V13zM12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z",
  vaccines:
    "M10.5 15H8v-3h2.5v-2.5h3V12H16v3h-2.5v2.5h-3V15zM19 8h-2V4c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v4H9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-4h2c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2z",
  pets: "M4.5 9.5C4.5 10.88 5.62 12 7 12s2.5-1.12 2.5-2.5S8.38 7 7 7 4.5 8.12 4.5 9.5zm9 0C13.5 10.88 14.62 12 16 12s2.5-1.12 2.5-2.5S17.38 7 16 7s-2.5 1.12-2.5 2.5zM12 14c-2.33 0-7 1.17-7 3.5V19h14v-1.5c0-2.33-4.67-3.5-7-3.5zM8.5 6C8.5 7.38 7.38 8.5 6 8.5S3.5 7.38 3.5 6 4.62 3.5 6 3.5 8.5 4.62 8.5 6zm11 0c0 1.38-1.12 2.5-2.5 2.5S14.5 7.38 14.5 6s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5z",
};

export function Icon({
  name,
  className = "",
  size = 24,
}: {
  name: string;
  className?: string;
  size?: number;
  /** Conservé pour compatibilité — les SVG sont déjà pleins. */
  filled?: boolean;
}) {
  const d = paths[name];
  if (!d) return null;

  const svgProps: SVGProps<SVGSVGElement> = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    className: `inline-block shrink-0 ${className}`,
    "aria-hidden": true,
    focusable: false,
  };

  return (
    <svg {...svgProps}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}
