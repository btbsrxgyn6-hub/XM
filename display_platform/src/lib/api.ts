import { API_BASE, API_V1 } from "@/lib/api-base";
import type {
  CommentItem,
  CommentList,
  Product,
  ProductDraft,
  ProductFields,
  User
} from "@/lib/types";

const ACCESS_TOKEN_KEY = "attrax:accessToken";
const REFRESH_TOKEN_KEY = "attrax:refreshToken";

type ApiErrorPayload = {
  detail?: string;
  errors?: Record<string, string>;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken?: string | null;
};

type ImageMeta = {
  id?: string;
  url?: string;
};

export function resolveImageUrl(meta?: ImageMeta): string | undefined {
  if (!meta) return undefined;
  const rawUrl = meta.url?.trim();
  if (rawUrl) {
    if (rawUrl.startsWith("http")) return rawUrl;
    const normalized = rawUrl.startsWith("/") ? rawUrl : `/${rawUrl}`;
    return `${API_BASE}${normalized}`;
  }
  if (meta.id) {
    return `${API_V1}/uploads/${meta.id}`;
  }
  return undefined;
}

export function normalizeProduct(product: Product): Product {
  const normalizeImageString = (value?: string): string | undefined => {
    const trimmed = value?.trim();
    if (!trimmed) return undefined;
    if (trimmed.startsWith("/demo/") && trimmed.endsWith(".avif")) {
      return trimmed.replace(/\.avif$/i, ".png");
    }
    if (trimmed.startsWith("/demo/")) return trimmed;
    if (trimmed.startsWith("http")) return trimmed;
    if (trimmed.startsWith(API_BASE) || trimmed.startsWith(API_V1)) return trimmed;
    return resolveImageUrl({ url: trimmed }) ?? trimmed;
  };

  const coverImage =
    normalizeImageString(product.coverImage) ?? resolveImageUrl(product.fields?.productCover);
  const logoImage =
    normalizeImageString(product.logoImage) ?? resolveImageUrl(product.fields?.productLogo);

  if (coverImage === product.coverImage && logoImage === product.logoImage) {
    return product;
  }

  return {
    ...product,
    coverImage,
    logoImage
  };
}

function hasWindow() {
  return typeof window !== "undefined";
}

function readStorage(key: string) {
  if (!hasWindow()) return null;
  return window.localStorage.getItem(key);
}

function writeStorage(key: string, value: string | null) {
  if (!hasWindow()) return;
  if (value === null) {
    window.localStorage.removeItem(key);
  } else {
    window.localStorage.setItem(key, value);
  }
}

export function getAccessToken() {
  return readStorage(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return readStorage(REFRESH_TOKEN_KEY);
}

export function setTokens(accessToken: string, refreshToken?: string | null) {
  writeStorage(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken !== undefined) {
    writeStorage(REFRESH_TOKEN_KEY, refreshToken ?? null);
  }
}

export function clearTokens() {
  writeStorage(ACCESS_TOKEN_KEY, null);
  writeStorage(REFRESH_TOKEN_KEY, null);
}

async function parseJsonSafe(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function refreshTokens() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  const res = await fetch(`${API_V1}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ refreshToken })
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { accessToken: string; refreshToken?: string };
  setTokens(data.accessToken, data.refreshToken);
  return data.accessToken;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  retryOnAuth = true
): Promise<T> {
  const headers = new Headers(options.headers || {});
  const token = getAccessToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_V1}${path}`, {
    ...options,
    headers,
    credentials: "include"
  });

  if (response.status === 401 && retryOnAuth) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return apiFetch<T>(path, options, false);
    }
  }

  if (!response.ok) {
    const payload = (await parseJsonSafe(response)) as ApiErrorPayload | null;
    const message = payload?.detail || `Request failed (${response.status})`;
    const error = new Error(message);
    (error as Error & { status?: number; payload?: ApiErrorPayload }).status =
      response.status;
    (error as Error & { status?: number; payload?: ApiErrorPayload }).payload = payload ?? undefined;
    throw error;
  }

  const json = await parseJsonSafe(response);
  return json as T;
}

export async function registerUser(params: {
  name: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(params)
  });
  setTokens(data.accessToken, data.refreshToken ?? undefined);
  return data;
}

export async function loginUser(params: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const data = await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(params)
  });
  setTokens(data.accessToken, data.refreshToken ?? undefined);
  return data;
}

export async function logoutUser() {
  const refreshToken = getRefreshToken();
  try {
    await apiFetch<{ ok: boolean }>("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken })
    });
  } finally {
    clearTokens();
  }
}

export async function getMe(): Promise<User> {
  return apiFetch<User>("/auth/me");
}

export async function listMyProducts(params?: {
  status?: "draft" | "submitted" | "published" | "all";
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  query.set("status", params?.status ?? "all");
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  const data = await apiFetch<Product[]>(`/products/mine?${query.toString()}`);
  return data.map(normalizeProduct);
}

export async function createProduct(params: {
  id?: string;
  fields: ProductFields;
  iconKey?: string;
}): Promise<Product> {
  const data = await apiFetch<Product>("/products", {
    method: "POST",
    body: JSON.stringify({
      id: params.id,
      fields: params.fields,
      iconKey: params.iconKey
    })
  });
  return normalizeProduct(data);
}

export async function updateProduct(params: {
  id: string;
  fields: ProductFields;
  iconKey?: string;
}): Promise<Product> {
  const data = await apiFetch<Product>(`/products/${params.id}`, {
    method: "PUT",
    body: JSON.stringify({
      fields: params.fields,
      iconKey: params.iconKey
    })
  });
  return normalizeProduct(data);
}

export async function deleteProduct(id: string) {
  return apiFetch<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" });
}

export async function duplicateProduct(id: string): Promise<Product> {
  const data = await apiFetch<Product>(`/products/${id}/duplicate`, { method: "POST" });
  return normalizeProduct(data);
}

export async function submitProduct(id: string): Promise<Product> {
  const data = await apiFetch<Product>(`/products/${id}/submit`, { method: "POST" });
  return normalizeProduct(data);
}

export async function publishProduct(id: string): Promise<Product> {
  const data = await apiFetch<Product>(`/products/${id}/publish`, { method: "POST" });
  return normalizeProduct(data);
}

export async function listPublicProducts(params?: {
  q?: string;
  status?: "draft" | "submitted" | "published" | "all";
  region?: string;
  tags?: string[];
  sort?: "newest" | "popular" | "name";
  limit?: number;
  offset?: number;
}): Promise<Product[]> {
  const query = new URLSearchParams();
  if (params?.q) query.set("q", params.q);
  if (params?.status) query.set("status", params.status);
  if (params?.region) query.set("region", params.region);
  if (params?.tags && params.tags.length > 0) {
    params.tags.forEach((tag) => query.append("tags", tag));
  }
  if (params?.sort) query.set("sort", params.sort);
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.offset) query.set("offset", String(params.offset));
  const suffix = query.toString() ? `?${query.toString()}` : "";
  const data = await apiFetch<Product[]>(`/products/public${suffix}`);
  return data.map(normalizeProduct);
}

export async function getProduct(id: string): Promise<Product> {
  const data = await apiFetch<Product>(`/products/${id}`);
  return normalizeProduct(data);
}

export async function listCuratedProducts(): Promise<Product[]> {
  const data = await apiFetch<Product[]>("/products/curated");
  return data.map(normalizeProduct);
}

export async function incrementProductViews(id: string) {
  return apiFetch<{ id: string; views: number }>(`/products/${id}/views`, {
    method: "POST"
  });
}

export async function followProduct(productId: string) {
  return apiFetch<{ ok: boolean }>(`/products/${productId}/follow`, {
    method: "POST"
  });
}

export async function unfollowProduct(productId: string) {
  return apiFetch<{ ok: boolean }>(`/products/${productId}/follow`, {
    method: "DELETE"
  });
}

export async function bookmarkProduct(productId: string) {
  return apiFetch<{ ok: boolean }>(`/products/${productId}/bookmark`, {
    method: "POST"
  });
}

export async function unbookmarkProduct(productId: string) {
  return apiFetch<{ ok: boolean }>(`/products/${productId}/bookmark`, {
    method: "DELETE"
  });
}

export async function getProductInteractions(productId: string) {
  return apiFetch<
    Pick<
      Product,
      "followCount" | "bookmarkCount" | "commentCount" | "isFollowedByMe" | "isBookmarkedByMe"
    >
  >(`/products/${productId}/interactions`);
}

export async function listProductComments(
  productId: string,
  params?: { limit?: number; cursor?: string }
): Promise<CommentList> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.cursor) query.set("cursor", params.cursor);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiFetch<CommentList>(`/products/${productId}/comments${suffix}`);
}

export async function listCommentReplies(
  commentId: string,
  params?: { limit?: number; cursor?: string }
): Promise<CommentList> {
  const query = new URLSearchParams();
  if (params?.limit) query.set("limit", String(params.limit));
  if (params?.cursor) query.set("cursor", params.cursor);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  return apiFetch<CommentList>(`/comments/${commentId}/replies${suffix}`);
}

export async function createProductComment(
  productId: string,
  params: { body: string; parentId?: string }
): Promise<CommentItem> {
  return apiFetch<CommentItem>(`/products/${productId}/comments`, {
    method: "POST",
    body: JSON.stringify(params)
  });
}

export async function updateComment(
  commentId: string,
  params: { body: string }
): Promise<CommentItem> {
  return apiFetch<CommentItem>(`/comments/${commentId}`, {
    method: "PATCH",
    body: JSON.stringify(params)
  });
}

export async function deleteComment(commentId: string) {
  return apiFetch<{ ok: boolean }>(`/comments/${commentId}`, { method: "DELETE" });
}

export async function getDraft(key: string): Promise<ProductDraft | null> {
  const data = await apiFetch<
    | {
        key: string;
        updatedAt: string;
        fields: ProductFields;
      }
    | null
  >(`/drafts/${encodeURIComponent(key)}`);
  if (!data) return null;
  return {
    productId: undefined,
    updatedAt: data.updatedAt,
    fields: data.fields
  };
}

export async function setDraft(key: string, fields: ProductFields) {
  return apiFetch<{ key: string; updatedAt: string; fields: ProductFields }>(
    `/drafts/${encodeURIComponent(key)}`,
    {
      method: "PUT",
      body: JSON.stringify({ fields })
    }
  );
}

export async function deleteDraft(key: string) {
  return apiFetch<{ ok: boolean }>(`/drafts/${encodeURIComponent(key)}`, {
    method: "DELETE"
  });
}
