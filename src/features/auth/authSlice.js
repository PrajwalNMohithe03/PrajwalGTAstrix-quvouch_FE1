import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

// 🔥 Restore token from localStorage on app start
const savedToken = localStorage.getItem("accessToken");

const initialState = {
  user: null,
  accessToken: savedToken ? JSON.parse(savedToken) : null,
  loading: false,
  error: null,
};

// ================= LOGIN =================
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/jwt/login",
        { username: email, password },
        { withCredentials: true }
      );
      return res.data; // { accessToken, user }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

// ================= REFRESH =================
export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/jwt/refresh", null, {
        withCredentials: true,
      });
      return res.data; // { accessToken, user }
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  }
);

// ================= LOGOUT =================
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/jwt/logout", null, { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          userId: action.payload.userId,
          roles: action.payload.roles,
        };

        state.accessToken = action.payload.accessToken;

        // 🔥 Save token
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // REFRESH
    builder
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;

        // 🔥 Save refreshed token
        localStorage.setItem(
          "accessToken",
          JSON.stringify(action.payload.accessToken)
        );

        state.loading = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
        localStorage.removeItem("accessToken");
      });

    // LOGOUT
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
