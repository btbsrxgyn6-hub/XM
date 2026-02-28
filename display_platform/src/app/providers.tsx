"use client";

import { ThemeProvider } from "@/components/organisms/ThemeProvider";
import { AuthProvider } from "@/lib/hooks/use-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
