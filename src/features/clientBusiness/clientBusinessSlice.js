import { createSlice } from "@reduxjs/toolkit";
import {
  fetchOwnBusiness,
  fetchDashboard,
  fetchAnalytics,
  fetchReviews,
} from "../clientBusiness/clientBusinessThunk";

const clientBusinessSlice = createSlice({
  name: "clientBusiness",
  initialState: {
    ownBusiness: null,
    dashboard: null,
    analytics: null,
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // ================= OWN BUSINESS =================
      .addCase(fetchOwnBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwnBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.ownBusiness = action.payload;
      })
      .addCase(fetchOwnBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DASHBOARD =================
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      })

      // ================= ANALYTICS =================
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      })

      // ================= REVIEWS =================
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

export default clientBusinessSlice.reducer;