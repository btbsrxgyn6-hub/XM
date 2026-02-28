import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: "rgb(var(--brand) / <alpha-value>)",
        primary: "rgb(var(--text) / <alpha-value>)",
        dark: "rgb(var(--text) / <alpha-value>)",
        gray: "rgb(var(--text-muted) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        bg: "rgb(var(--bg) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"]
      },
      backgroundImage: {
        "brand-wash":
          "radial-gradient(900px 600px at 18% 12%, rgb(var(--brand) / 0.16), transparent 60%), radial-gradient(900px 600px at 82% 18%, rgb(var(--text) / 0.06), transparent 60%)",
        "brand-gradient":
          "linear-gradient(135deg, rgb(var(--text) / 0.32) 0%, rgb(var(--text) / 0.25) 100%), linear-gradient(135deg, rgb(var(--brand) / 1) 0%, rgb(var(--brand) / 1) 100%)"
      },
      boxShadow: {
        soft: "0 20px 50px rgba(0, 0, 0, 0.10)",
        card: "0 12px 30px rgba(0, 0, 0, 0.10)",
        glow: "0 0 0 1px rgba(255, 101, 81, 0.25), 0 18px 45px rgba(255, 101, 81, 0.18)"
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem"
      }
    }
  },
  plugins: []
} satisfies Config;
