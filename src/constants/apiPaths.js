export const API_PATHS = {
  /* =========================================================
     SALES MODULE
  ========================================================== */
  SALES: {
    /* ================= DASHBOARD ================= */
    DASHBOARD_STATS: "/api/v1/sales/clients/dashboard",

    /* ================= CLIENT CRUD ================= */
    MY_CLIENTS: "/api/v1/sales/clients",
    CLIENT_BY_ID: (id) => `/api/v1/sales/clients/${id}`,
    UPDATE_CLIENT: (id) => `/api/v1/sales/clients/${id}`,

    // DELETE BUSINESS CLIENT
    DELETE_CLIENT: (businessId) =>
      `/api/v1/sales/clients/business/${businessId}`,

    /* ================= BUSINESS STATUS ================= */

    // Toggle Business Status: ACTIVE ↔ INACTIVE
    TOGGLE_BUSINESS_STATUS: (id) =>
      `/api/v1/sales/clients/business/${id}/status/toggle`,

    /* ================= FILTER & SEARCH ================= */
    CLIENTS_BY_STATUS: "/api/v1/sales/clients/status",
    SEARCH_CLIENTS: "/api/v1/sales/clients/search",

    /* ================= REGISTERED USERS ================= */
    REGISTERED_USERS:
      "/api/v1/sales/clients/registered-users",

    /* ================= QR CODE ================= */
    ASSIGN_QR: "/api/v1/sales/clients/qrcodes/assign",
    UNASSIGNED_QR:
      "/api/v1/sales/clients/qrcodes/unassigned",
    MY_ASSIGNED_QR:
      "/api/v1/sales/clients/qrcodes/my",
    ACTIVE_QR:
      "/api/v1/sales/clients/qr/active",

    GENERATE_QR: "/api/v1/qrcode/generate",

    /* ================= PROFILE ================= */
    PROFILE: "/api/v1/sales/clients/me",
  },

  /* =========================================================
     USER MODULE
  ========================================================== */
  USERS: {
    REGISTER: "/api/v1/users/register",
  },

  /* =========================================================
     BUSINESS MODULE
  ========================================================== */
  BUSINESS: {
    BASE: "/api/v1/business",

    OWN: "/api/v1/business/own",
    BY_ID: (id) => `/api/v1/business/${id}`,
    UPDATE: (id) => `/api/v1/business/${id}`,
    PAGE: "/api/v1/business/page",

    DASHBOARD: (id) =>
      `/api/v1/business/dashboard/${id}`,

    ANALYTICS: (id) =>
      `/api/v1/business/analytics/${id}`,

    REVIEWS: "/api/v1/business/reviews",

    EXPORT: (id) =>
      `/api/v1/business/export/${id}`,

    SHARE: (id) =>
      `/api/v1/business/share/${id}`,

    QR_DOWNLOAD: (id) =>
      `/api/v1/business/qr/download/${id}`,
  },

  /* =========================================================
     PUBLIC QR
  ========================================================== */
  RATE_QR: (qrCode) =>
    `/api/v1/qr/${qrCode}/rate`,
};