import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { API_PATHS } from "../../constants/apiPaths";




/* ======================================================
   THUNKS
====================================================== */

// 🔹 Fetch Sales Dashboard Stats
export const fetchSalesDashboardThunk = createAsyncThunk(
  "sales/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.DASHBOARD_STATS
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch dashboard stats"
      );
    }
  }
);

// 🔹 Fetch Sales Clients List
export const fetchSalesClientsThunk = createAsyncThunk(
  "sales/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.MY_CLIENTS
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch sales clients"
      );
    }
  }
);

/* ======================================================
   SLICE
====================================================== */

const salesSlice = createSlice({
  name: "sales",
  initialState: {
    dashboard: null,
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- DASHBOARD ---------- */
      .addCase(fetchSalesDashboardThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesDashboardThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchSalesDashboardThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ---------- CLIENTS ---------- */
      .addCase(fetchSalesClientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalesClientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchSalesClientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
