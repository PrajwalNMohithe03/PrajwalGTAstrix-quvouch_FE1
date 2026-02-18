import axios from "axios";
import { refreshThunk } from "../features/auth/authSlice";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

let store;
let refreshPromise = null;

// 🔓 Public endpoints (no auth, no refresh)
const PUBLIC_ENDPOINTS = [
  "/api/v1/qr",        // customer review
];
export const getBusinessByIdApi = async (id) => {
  const res = await api.get(`/api/v1/business/${id}`);
  return res.data;
};

export const injectStore = (_store) => {
  store = _store;

  // ================= REQUEST INTERCEPTOR =================
  api.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;

    // 🔐 Attach token only if exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // ================= RESPONSE INTERCEPTOR =================
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const original = error.config;
      const url = original?.url || "";

      // 🚫 Skip refresh logic for PUBLIC APIs
      const isPublic = PUBLIC_ENDPOINTS.some((path) =>
        url.includes(path)
      );

      if (
        error.response?.status === 401 &&
        !original._retry &&
        !isPublic
      ) {
        original._retry = true;

        // 🔒 Single refresh lock
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
          return api(original); // retry AFTER refresh
        } catch {
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};
