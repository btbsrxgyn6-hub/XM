import type { SVGProps } from "react";

import { cx } from "@/lib/cx";

export type IconName =
  | "sparkles"
  | "target"
  | "grid"
  | "zap"
  | "layers"
  | "users"
  | "message"
  | "chart"
  | "settings";

function IconPaths({ name }: { name: IconName }) {
  switch (name) {
    case "sparkles":
      return (
        <>
          <path d="M12 2l1.2 3.6L17 7l-3.8 1.4L12 12l-1.2-3.6L7 7l3.8-1.4L12 2z" />
          <path d="M5 14l.8 2.4L8 17l-2.2.6L5 20l-.8-2.4L2 17l2.2-.6L5 14z" />
          <path d="M19 13l.7 2.1L22 16l-2.3.9L19 19l-.7-2.1L16 16l2.3-.9L19 13z" />
        </>
      );
    case "target":
      return (
        <>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 5V3" />
          <path d="M19 12h2" />
          <path d="M12 21v-2" />
          <path d="M3 12h2" />
        </>
      );
    case "grid":
      return (
        <>
          <path d="M4 4h7v7H4V4z" />
          <path d="M13 4h7v7h-7V4z" />
          <path d="M4 13h7v7H4v-7z" />
          <path d="M13 13h7v7h-7v-7z" />
        </>
      );
    case "zap":
      return <path d="M13 2L3 14h7l-1 8 12-14h-7l-1-6z" />;
    case "layers":
      return (
        <>
          <path d="M12 3l9 5-9 5-9-5 9-5z" />
          <path d="M21 12l-9 5-9-5" />
          <path d="M21 16l-9 5-9-5" />
        </>
      );
    case "users":
      return (
        <>
          <path d="M16 11a3 3 0 1 0-6 0" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M7.5 8.5a3 3 0 1 0-3 0" />
          <path d="M2 20a5 5 0 0 1 7.5-4.2" />
        </>
      );
    case "message":
      return (
        <>
          <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.2A8 8 0 1 1 21 12z" />
          <path d="M8 12h8" />
          <path d="M8 8h6" />
        </>
      );
    case "chart":
      return (
        <>
          <path d="M4 19V5" />
          <path d="M4 19h16" />
          <path d="M7 14l4-4 3 3 5-6" />
          <path d="M19 7v4h-4" />
        </>
      );
    case "settings":
      return (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.2-2-3.4-2.3.7a7.4 7.4 0 0 0-1.7-1l-.3-2.4H9l-.3 2.4a7.4 7.4 0 0 0-1.7 1l-2.3-.7-2 3.4 2 1.2a7.9 7.9 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.7a7.4 7.4 0 0 0 1.7 1l.3 2.4h4.2l.3-2.4a7.4 7.4 0 0 0 1.7-1l2.3.7 2-3.4-2-1.2z" />
        </>
      );
  }
}

export function Icon({
  name,
  className,
  ...props
}: { name: IconName; className?: string } & Omit<
  SVGProps<SVGSVGElement>,
  "children"
>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cx("size-5", className)}
      aria-hidden="true"
      {...props}
    >
      <IconPaths name={name} />
    </svg>
  );
}

