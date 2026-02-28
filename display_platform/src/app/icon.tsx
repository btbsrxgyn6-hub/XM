export const size = { width: 64, height: 64 };
export const contentType = "image/svg+xml";

export default function Icon() {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="64" height="64" rx="16" fill="#000000" />
  <path d="M18 35.5C18 26.9396 24.9396 20 33.5 20H38C44.0751 20 49 24.9249 49 31C49 37.0751 44.0751 42 38 42H33.5C24.9396 42 18 35.0604 18 26.5V35.5Z" fill="#FF6551" opacity="0.95" />
  <path d="M18 31.5C18 25.1487 23.1487 20 29.5 20H31.5C37.8513 20 43 25.1487 43 31.5C43 37.8513 37.8513 43 31.5 43H29.5C23.1487 43 18 37.8513 18 31.5Z" fill="#F9F9F9" />
  <path d="M27 31.5C27 29.567 28.567 28 30.5 28H33.5C35.433 28 37 29.567 37 31.5C37 33.433 35.433 35 33.5 35H30.5C28.567 35 27 33.433 27 31.5Z" fill="#979797" />
</svg>
`;

  return new Response(svg, {
    headers: {
      "Content-Type": contentType
    }
  });
}
