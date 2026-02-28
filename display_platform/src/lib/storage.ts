import { createId } from "@/lib/id";
import { getIconForProduct } from "@/lib/productIcons";
import { k, LEGACY_PREFIX } from "@/lib/storageKeys";
import type { AuthSession, Product, ProductDraft, User } from "@/lib/types";

const KEYS = {
  session: k("session"),
  users: k("users"),
  products: k("products"),
  draft: (id: string) => k(`draft:${id}`),
  seeded: k("seeded")
} as const;

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

let didMigrate = false;

function migrateLegacyKeys() {
  if (!hasStorage() || didMigrate) return;
  didMigrate = true;
  const keysToRemove: string[] = [];

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const key = window.localStorage.key(index);
    if (!key || !key.startsWith(LEGACY_PREFIX)) continue;
    const nextKey = k(key.replace(LEGACY_PREFIX, ""));
    const currentValue = window.localStorage.getItem(key);
    const hasNext = window.localStorage.getItem(nextKey) !== null;
    if (!hasNext && currentValue !== null) {
      window.localStorage.setItem(nextKey, currentValue);
    }
    if (hasNext || currentValue !== null) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => {
    window.localStorage.removeItem(key);
  });
}

function readJson<T>(key: string, fallback: T): T {
  if (!hasStorage()) return fallback;
  migrateLegacyKeys();
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (!hasStorage()) return;
  migrateLegacyKeys();
  window.localStorage.setItem(key, JSON.stringify(value));
}

function ensureArrayKey(key: string) {
  if (!hasStorage()) return;
  migrateLegacyKeys();
  if (window.localStorage.getItem(key) === null) {
    window.localStorage.setItem(key, JSON.stringify([]));
  }
}

export function getSession(): AuthSession | null {
  const value = readJson<AuthSession | null>(KEYS.session, null);
  if (!value || typeof value !== "object") return null;
  return value;
}

export function setSession(session: AuthSession) {
  writeJson(KEYS.session, session);
}

export function clearSession() {
  if (!hasStorage()) return;
  window.localStorage.removeItem(KEYS.session);
}

export function getUsers(): User[] {
  ensureArrayKey(KEYS.users);
  const value = readJson<unknown>(KEYS.users, []);
  return Array.isArray(value) ? (value as User[]) : [];
}

export function findUserByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return getUsers().find((u) => u.email.toLowerCase() === normalized);
}

export function addUser(user: User) {
  const users = getUsers();
  users.push(user);
  writeJson(KEYS.users, users);
}

export function getProducts(): Product[] {
  ensureArrayKey(KEYS.products);
  const value = readJson<unknown>(KEYS.products, []);
  return Array.isArray(value) ? (value as Product[]) : [];
}

export function getAllProducts(): Product[] {
  return getProducts();
}

export function upsertProduct(product: Product) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  const resolvedIconKey = product.iconKey ?? getIconForProduct(product);
  if (index >= 0) {
    const existing = products[index];
    products[index] = {
      ...product,
      views: product.views ?? existing.views ?? 0,
      isFeatured: product.isFeatured ?? existing.isFeatured,
      featuredRank: product.featuredRank ?? existing.featuredRank,
      iconKey: resolvedIconKey
    };
  } else {
    products.push({
      ...product,
      views: product.views ?? 0,
      iconKey: resolvedIconKey
    });
  }
  writeJson(KEYS.products, products);
}

export function deleteProduct(id: string) {
  const products = getProducts().filter((p) => p.id !== id);
  writeJson(KEYS.products, products);
}

export function duplicateProduct(id: string, ownerUserId?: string) {
  const products = getProducts();
  const original = products.find((p) => p.id === id);
  if (!original) return null;

  const now = new Date().toISOString();
  const copy: Product = {
    ...original,
    id: createId("prd"),
    ownerUserId: ownerUserId ?? original.ownerUserId,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    views: 0,
    isFeatured: false,
    featuredRank: undefined,
    iconKey: original.iconKey,
    fields: {
      ...original.fields,
      productName: `${original.fields.productName} (Copy)`.slice(0, 24)
    }
  };

  products.push(copy);
  writeJson(KEYS.products, products);
  return copy;
}

export function incrementProductViews(productId: string) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === productId);
  if (index < 0) return;
  const current = products[index];
  const nextViews = (current.views ?? 0) + 1;
  products[index] = { ...current, views: nextViews };
  writeJson(KEYS.products, products);
}

export function setFeatured(productId: string, isFeatured: boolean) {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === productId);
  if (index < 0) return;
  const current = products[index];
  products[index] = { ...current, isFeatured };
  writeJson(KEYS.products, products);
}

export function getSeededFlag() {
  if (!hasStorage()) return false;
  migrateLegacyKeys();
  return window.localStorage.getItem(KEYS.seeded) === "true";
}

export function setSeededFlag() {
  if (!hasStorage()) return;
  migrateLegacyKeys();
  window.localStorage.setItem(KEYS.seeded, "true");
}

export function getDraft(id: string): ProductDraft | null {
  const value = readJson<ProductDraft | null>(KEYS.draft(id), null);
  if (!value || typeof value !== "object") return null;
  return value;
}

export function setDraft(id: string, draft: ProductDraft) {
  writeJson(KEYS.draft(id), draft);
}

export function clearDraft(id: string) {
  if (!hasStorage()) return;
  window.localStorage.removeItem(KEYS.draft(id));
}
