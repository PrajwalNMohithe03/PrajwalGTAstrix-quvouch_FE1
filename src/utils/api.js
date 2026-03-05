import axios from "axios";
import { refreshThunk } from "../features/auth/authSlice";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let store;
let refreshPromise = null;

const PUBLIC_ENDPOINTS = [
  "/api/v1/qr",
];

export const injectStore = (_store) => {
  store = _store;

  // ================= REQUEST =================
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  // 🔥 Do NOT attach access token to refresh endpoint
  if (config.url.includes("/jwt/refresh")) {
    return config;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

  // ================= RESPONSE =================
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;
      const url = original?.url || "";

      const isPublic = PUBLIC_ENDPOINTS.some((path) =>
        url.includes(path)
      );

      if (
        error.response?.status === 401 &&
        !original._retry &&
        !isPublic
      ) {
        original._retry = true;

        if (!refreshPromise) {
          refreshPromise = store
            .dispatch(refreshThunk())
            .unwrap()
            .finally(() => {
              refreshPromise = null;
            });
        }

        try {
          await refreshPromise;
          return api(original);
        } catch {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};