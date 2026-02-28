const RAW_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://attrax-0a358616a2e1.herokuapp.com";

export const API_BASE = RAW_BASE.replace(/\/$/, "");
export const API_V1 = API_BASE.endsWith("/api/v1") ? API_BASE : `${API_BASE}/api/v1`;
