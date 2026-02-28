export const STORAGE_PREFIX = "attrax:";
export const LEGACY_PREFIX = "dovble:";

export function k(key: string) {
  return `${STORAGE_PREFIX}${key}`;
}

export function legacyKey(key: string) {
  return `${LEGACY_PREFIX}${key}`;
}

export function previewKey(id: string) {
  return k(`preview:${id}`);
}
