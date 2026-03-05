import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { API_PATHS } from "../../constants/apiPaths";

/* =========================================================
   FETCH OWN BUSINESS
========================================================= */
export const fetchOwnBusiness = createAsyncThunk(
  "clientBusiness/fetchOwnBusiness",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_PATHS.BUSINESS.OWN);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch own business"
      );
    }
  }
);

/* =========================================================
   FETCH DASHBOARD
========================================================= */
export const fetchDashboard = createAsyncThunk(
  "clientBusiness/fetchDashboard",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.BUSINESS.DASHBOARD(businessId)
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dashboard"
      );
    }
  }
);

/* =========================================================
   FETCH ANALYTICS
========================================================= */
export const fetchAnalytics = createAsyncThunk(
  "clientBusiness/fetchAnalytics",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.BUSINESS.ANALYTICS(businessId)
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch analytics"
      );
    }
  }
);

/* =========================================================
   FETCH REVIEWS
========================================================= */
export const fetchReviews = createAsyncThunk(
  "clientBusiness/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(API_PATHS.BUSINESS.REVIEWS);
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch reviews"
      );
    }
  }
);

/* =========================================================
   EXPORT REVIEWS
========================================================= */
export const exportBusinessReviews = createAsyncThunk(
  "clientBusiness/exportReviews",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.BUSINESS.EXPORT(businessId),
        { responseType: "blob" }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to export reviews"
      );
    }
  }
);

/* =========================================================
   SHARE REVIEWS
========================================================= */
export const shareBusinessReviews = createAsyncThunk(
  "clientBusiness/shareReviews",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.BUSINESS.SHARE(businessId)
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to share reviews"
      );
    }
  }
);

/* =========================================================
   DOWNLOAD QR
========================================================= */
export const downloadBusinessQr = createAsyncThunk(
  "clientBusiness/downloadQr",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.BUSINESS.QR_DOWNLOAD(businessId),
        { responseType: "blob" }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to download QR"
      );
    }
  }
);