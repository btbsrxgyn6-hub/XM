# Display Platform (Prototype)

A Next.js + Tailwind landing page based on the provided wireframe.

Wireframe reference: `wireframe.png`

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- Newsletter signup is a stub endpoint: `src/app/api/subscribe/route.ts`
- Auth + console flow is front end only and uses localStorage for session, products, and drafts.
- Demo marketplace data seeds on first load if there are no users or products yet (stored in localStorage).
- Marketplace listings use icon keys (lucide-react) with fallback icons or session logo previews.
- Homepage shows curated products with a link to the full marketplace.
- Branding assets live in `public/brand/*` (used by `src/components/atoms/wordmark.tsx`).
  - `public/brand/wordmark-en.png`
  - `public/brand/wordmark-zh.png`
  - `public/brand/brand-mark.png`
  - `public/brand/brand-lockup.png`
  - `public/brand/brand-palette.png`
- Brand palette (Tailwind semantic tokens in `tailwind.config.ts`):
  - brand/accent: `#FF6551`
  - primary (text): `#000000`
  - dark gray: `#333333`
  - gray: `#646464`
  - light gray (muted): `#979797`
  - surface (white): `#F9F9F9`
- Main routes:
  - `/auth/sign-in`, `/auth/sign-up`, `/auth/sign-out`
  - `/console`, `/console/products`, `/console/products/new`
  - `/products`, `/products/[id]`
# AT
