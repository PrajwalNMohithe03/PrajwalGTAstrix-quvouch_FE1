// features/review/reviewService.js
import { api } from "../../utils/api";
import { API_PATHS } from "../../constants/apiPaths";

/* ================= POST REVIEW ================= */
export const rateQrCodeService = (qrCode, payload) => {
  return api.post(API_PATHS.RATE_QR(qrCode), payload);
};

/* ================= GET QR DETAILS ================= */
export const getQrDetailsApi = (qrCodeId) => {
  return api.get(`/api/v1/qr/qr/${qrCodeId}`);
};

/* ================= GET BUSINESS REVIEWS ================= */
export const getBusinessReviewsApi = (businessId) => {
  return api.get(`/api/v1/qr/reviews/business/${businessId}`);
};

/* ================= GET BUSINESS STATS ================= */
export const getBusinessStatsApi = (businessId) => {
  return api.get(`/api/v1/qr/reviews/business/${businessId}/stats`);
};
