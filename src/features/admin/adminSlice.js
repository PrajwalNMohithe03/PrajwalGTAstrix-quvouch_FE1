import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// CREATE BUSINESS
export const createBusinessThunk = createAsyncThunk(
  "admin/createBusiness",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("/api/v1/business", formData);
      console.log(res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data || "Business creation failed");
    }
  },
);

// fetch sales rep
export const fetchSalesRepByThunk = createAsyncThunk(
  "admin/fetchSalesRepByThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/v1/admin/sale-representatives`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch sales representatives",
      );
    }
  },
);

// FETCH SALES REP DETAILS
export const fetchSalesRepByIdThunk = createAsyncThunk(
  "admin/fetchSalesRepById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/api/v1/admin/sale-representatives/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch details",
      );
    }
  },
);

// SLICE
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    loading: false,
    error: null,
    success: false,
    salesReps: [],
    clients: [],
    selectedSalesRep: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    clearSelectedSalesRep: (state) => {
      state.selectedSalesRep = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE BUSINESS
      .addCase(createBusinessThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBusinessThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createBusinessThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH SALES REP DETAILS
      .addCase(fetchSalesRepByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesRepByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSalesRep = action.payload;
      })
      .addCase(fetchSalesRepByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // salesRep list

      .addCase(fetchSalesRepByThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSalesRepByThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.salesReps = action.payload;
      })
      .addCase(fetchSalesRepByThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus, clearSelectedSalesRep } = adminSlice.actions;

export default adminSlice.reducer;

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { api } from "../../utils/api";

// // =============================
// // CREATE BUSINESS
// // =============================
// export const createBusinessThunk = createAsyncThunk(
//   "admin/createBusiness",
//   async (formData, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/api/v1/business", formData);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(err?.response?.data || "Business creation failed");
//     }
//   },
// );

// // =============================
// // FETCH CLIENT BY ID
// // =============================
// export const fetchClientByIdThunk = createAsyncThunk(
//   "admin/fetchClientById",
//   async (id, { rejectWithValue }) => {
//     try {
//       const res = await api.get(`/api/v1/sales/clients/${id}`);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue(
//         err?.response?.data?.message || "Failed to fetch client details",
//       );
//     }
//   },
// );

// // =============================
// // SLICE
// // =============================
// const adminSlice = createSlice({
//   name: "admin",
//   initialState: {
//     loading: false,
//     error: null,
//     success: false,
//     selectedSalesRep: null,
//     selectedClient: null,
//   },

//   reducers: {
//     resetStatus: (state) => {
//       state.success = false;
//       state.error = null;
//     },

//     clearSelectedSalesRep: (state) => {
//       state.selectedSalesRep = null;
//     },

//     clearSelectedClient: (state) => {
//       state.selectedClient = null;
//     },
//   },

//   extraReducers: (builder) => {
//     // =============================
//     // CREATE BUSINESS
//     // =============================
//     builder
//       .addCase(createBusinessThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createBusinessThunk.fulfilled, (state) => {
//         state.loading = false;
//         state.success = true;
//       })
//       .addCase(createBusinessThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

//     // =============================
//     // FETCH CLIENT DETAILS
//     // =============================
//     builder
//       .addCase(fetchClientByIdThunk.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchClientByIdThunk.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedClient = action.payload;
//       })
//       .addCase(fetchClientByIdThunk.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { resetStatus, clearSelectedSalesRep, clearSelectedClient } =
//   adminSlice.actions;

// export default adminSlice.reducer;
