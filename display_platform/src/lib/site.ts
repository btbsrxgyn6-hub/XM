const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_VERCEL_URL ??
  process.env.VERCEL_URL ??
  "https://attrax.ai";

const normalized = RAW_SITE_URL.startsWith("http")
  ? RAW_SITE_URL
  : `https://${RAW_SITE_URL}`;

export const SITE_URL = normalized.replace(/\/$/, "");

export const SITE_NAME = "Attrax AI";
export const SITE_TAGLINE = "Launch, validate & scale AI";
export const SITE_DESCRIPTION =
  "A modern launchpad to showcase AI products, distribute through a newsletter audience, and track engagement.";

export const SITE_LOGO = "/brand/brand-mark.png";
export const SITE_OG_IMAGE = "/brand/brand-lockup.png";
