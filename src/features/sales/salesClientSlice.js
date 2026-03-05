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

// 🔹 Create New Client
export const createClientThunk = createAsyncThunk(
  "sales/createClient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_PATHS.SALES.MY_CLIENTS,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to create client"
      );
    }
  }
);

// 🔹 Delete Client
export const deleteClientThunk = createAsyncThunk(
  "sales/deleteClient",
  async (businessId, { rejectWithValue }) => {
    try {
      await api.delete(
        API_PATHS.SALES.DELETE_CLIENT(businessId)
      );

      return businessId; // return deleted id
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔹 Toggle Business Status
export const toggleBusinessStatusThunk = createAsyncThunk(
  "sales/toggleBusinessStatus",
  async (businessId, { rejectWithValue }) => {
    try {
      const res = await api.patch(
        API_PATHS.SALES.TOGGLE_BUSINESS_STATUS(businessId)
      );

      return res.data; // backend should return updated business
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);
// 🔹 Search Clients
export const searchClientsThunk = createAsyncThunk(
  "sales/searchClients",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await api.get(
        API_PATHS.SALES.SEARCH_CLIENTS,
        { params: { keyword } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to search clients"
      );
    }
  }
);

// 🔹 Generate QR Code (✅ FIXED)
export const generateQrThunk = createAsyncThunk(
  "sales/generateQr",
  async ({ businessId, location }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        API_PATHS.SALES.GENERATE_QR,
        {
          businessId,
          location,
        }
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// 🔹 Assign QR Code To Client
export const assignQrToClientThunk = createAsyncThunk(
  "sales/assignQr",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_PATHS.SALES.ASSIGN_QR,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to assign QR"
      );
    }
  }
);
//Active qr 
export const fetchActiveQrThunk = createAsyncThunk(
  "sales/fetchActiveQr",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        API_PATHS.SALES.ACTIVE_QR
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
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
     activeQr: [],  
    selectedClient: null,
    filteredClients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* ---------- DASHBOARD ---------- */
      .addCase(fetchSalesDashboardThunk.fulfilled, (state, action) => {
        state.dashboard = action.payload;
      })

      /* ---------- FETCH CLIENTS ---------- */
      .addCase(fetchSalesClientsThunk.fulfilled, (state, action) => {
        state.clients = action.payload;
      })

      /* ---------- CREATE CLIENT ---------- */
      .addCase(createClientThunk.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })

      /* ---------- DELETE CLIENT ---------- */
.addCase(deleteClientThunk.fulfilled, (state, action) => {
  const deletedBusinessId = action.payload;

  state.clients = state.clients.filter(
    (client) => client.businessId !== deletedBusinessId
  );

  // Optional: also update dashboard count
  if (state.dashboard?.clientsCount > 0) {
    state.dashboard.clientsCount -= 1;
  }
})
      /* ---------- TOGGLE STATUS ---------- */
      .addCase(toggleBusinessStatusThunk.fulfilled, (state, action) => {
  const updatedBusiness = action.payload;

  const index = state.clients.findIndex(
    (c) => c.businessId === updatedBusiness.businessId
  );

  if (index !== -1) {
    state.clients[index] = updatedBusiness;
  }
})

 /* ---------- GENERATE QR ---------- */
.addCase(generateQrThunk.fulfilled, (state, action) => {
  const { businessId } = action.meta.arg;

  const client = state.clients.find(
    (c) => c.businessId === businessId
  );

  if (client) {
    client.qrCount = (client.qrCount || 0) + 1;
  }
})
      /* ---------- ASSIGN QR ---------- */
      .addCase(assignQrToClientThunk.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.clients.findIndex(
          (c) => c.businessId === updated.businessId
        );
        if (index !== -1) {
          state.clients[index] = updated;
        }
      })
      .addCase(fetchActiveQrThunk.fulfilled, (state, action) => {
  state.activeQr = action.payload;
})

      /* ---------- SEARCH ---------- */
      .addCase(searchClientsThunk.fulfilled, (state, action) => {
        state.filteredClients = action.payload;
      });
  },
});

export default salesSlice.reducer;