import { api } from "../utils/api";
import { API_PATHS } from "../constants/apiPaths";

/* ================= OWN BUSINESS ================= */
export const getOwnBusiness = () =>
  api.get(API_PATHS.BUSINESS.OWN);

/* ================= DASHBOARD ================= */
export const getDashboard = (id) =>
  api.get(API_PATHS.BUSINESS.DASHBOARD(id));

export const getAnalytics = (id) =>
  api.get(API_PATHS.BUSINESS.ANALYTICS(id));

/* ================= REVIEWS ================= */
export const getReviewsForClient = () =>
  api.get(API_PATHS.BUSINESS.REVIEWS);

export const exportReviews = (id) =>
  api.get(API_PATHS.BUSINESS.EXPORT(id), {
    responseType: "blob",
  });

export const shareReviews = (id) =>
  api.get(API_PATHS.BUSINESS.SHARE(id));

/* ================= QR ================= */
export const downloadQr = (id) =>
  api.get(API_PATHS.BUSINESS.QR_DOWNLOAD(id), {
    responseType: "blob",
  });