import { createSlice } from "@reduxjs/toolkit";
import {
  createBusiness,
  fetchBusinesses,
  deleteBusiness,
  fetchBusinessById,   // 👈 ADD THIS
} from "./businessThunk";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    list: [],
    selectedBusiness: null,   // 👈 already correct
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedBusiness: (state) => {
      state.selectedBusiness = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // ================= FETCH ALL =================
      .addCase(fetchBusinesses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinesses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBusinesses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CREATE =================
      .addCase(createBusiness.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBusiness.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createBusiness.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================
      .addCase(deleteBusiness.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (b) => b.id !== action.payload
        );
      })

      // ================= FETCH BY ID 🔥 =================
      .addCase(fetchBusinessById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBusinessById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBusiness = action.payload;
      })
      .addCase(fetchBusinessById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSelectedBusiness } = businessSlice.actions;

export default businessSlice.reducer;
