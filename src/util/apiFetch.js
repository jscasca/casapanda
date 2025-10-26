// import { API_BASE_URL } from "../config/apiConfig";

const API_BASE_URL = 'localhost:8008';

export async function apiFetch(path, { method = "GET", params = null, token } = {}) {
  const url = new URL(path, API_BASE_URL);
  console.log(url);

  if (method.toUpperCase() === "GET" && params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    );
  }

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, {
    method,
    headers,
    body:
      method.toUpperCase() !== "GET" && params
        ? JSON.stringify(params)
        : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }

  return res.json();
}
