import type { Metadata } from "next";

import { ConsoleRootLayoutClient } from "./layout.client";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true
  }
};

export default function ConsoleRootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <ConsoleRootLayoutClient>{children}</ConsoleRootLayoutClient>;
}
