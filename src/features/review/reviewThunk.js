import { createAsyncThunk } from "@reduxjs/toolkit";
import { rateQrCodeService } from "./reviewService";

export const rateQrCodeThunk = createAsyncThunk(
  "review/rateQrCode",
  async ({ qrCode, payload }, { rejectWithValue }) => {
    try {
      const res = await rateQrCodeService(qrCode, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to submit review");
    }
  }
);
