export function createId(prefix?: string) {
  const base =
    typeof globalThis.crypto !== "undefined" &&
    "randomUUID" in globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === "function"
      ? globalThis.crypto.randomUUID()
      : `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`;

  return prefix ? `${prefix}_${base}` : base;
}

