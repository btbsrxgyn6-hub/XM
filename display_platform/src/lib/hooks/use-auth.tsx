"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { getAccessToken, loginUser, logoutUser, registerUser, getMe } from "@/lib/api";
import type { User } from "@/lib/types";
import { isValidEmail } from "@/lib/validation";

type AuthContextValue = {
  currentUser: User | null;
  isLoading: boolean;
  signIn: (params: { email: string; password: string }) => Promise<{
    ok: boolean;
    message?: string;
  }>;
  signUp: (params: { name: string; email: string; password: string }) => Promise<{
    ok: boolean;
    message?: string;
  }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    async function load() {
      setIsLoading(true);
      if (!getAccessToken()) {
        if (active) {
          setCurrentUser(null);
          setIsLoading(false);
        }
        return;
      }
      try {
        const user = await getMe();
        if (active) setCurrentUser(user);
      } catch {
        if (active) setCurrentUser(null);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    load();

    function onStorage(event: StorageEvent) {
      if (event.key && event.key.includes("attrax:accessToken")) {
        load();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => {
      active = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    return {
      currentUser,
      isLoading,
      async signUp({ name, email, password }) {
        const trimmedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!trimmedName) return { ok: false, message: "Please enter your name." };
        if (!isValidEmail(normalizedEmail)) {
          return { ok: false, message: "Please enter a valid email address." };
        }
        if (trimmedPassword.length < 6) {
          return { ok: false, message: "Password must be at least 6 characters." };
        }

        try {
          const result = await registerUser({
            name: trimmedName,
            email: normalizedEmail,
            password: trimmedPassword
          });
          setCurrentUser(result.user);
          return { ok: true };
        } catch (error) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : "Unable to create account.";
          return { ok: false, message };
        }
      },
      async signIn({ email, password }) {
        const normalizedEmail = email.trim().toLowerCase();
        const trimmedPassword = password.trim();

        if (!isValidEmail(normalizedEmail)) {
          return { ok: false, message: "Please enter a valid email address." };
        }
        if (!trimmedPassword) {
          return { ok: false, message: "Please enter your password." };
        }

        try {
          const result = await loginUser({
            email: normalizedEmail,
            password: trimmedPassword
          });
          setCurrentUser(result.user);
          return { ok: true };
        } catch (error) {
          const message =
            error instanceof Error && error.message
              ? error.message
              : "Unable to sign in.";
          return { ok: false, message };
        }
      },
      async signOut() {
        await logoutUser();
        setCurrentUser(null);
      }
    };
  }, [currentUser, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
