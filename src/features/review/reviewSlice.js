import { createSlice } from "@reduxjs/toolkit";
import { rateQrCodeThunk } from "./reviewThunk";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetReviewState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(rateQrCodeThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rateQrCodeThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(rateQrCodeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetReviewState } = reviewSlice.actions;
export default reviewSlice.reducer;
