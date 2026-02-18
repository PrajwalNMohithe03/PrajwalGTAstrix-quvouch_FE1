import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

const initialState = {
  user: null,
  accessToken: null, // in-memory only
  loading: false, // important: true on start, to prevent route flicker
  error: null,
};

// LOGIN: backend returns { accessToken, user } and sets refresh cookie (HttpOnly)
export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post(
        "/jwt/login",
        { username: email, password },
        { withCredentials: true },
      );
      return res.data; // { accessToken, user }
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  },
);

// REFRESH: uses HttpOnly refresh cookie, returns new { accessToken, user }
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
  },
);

// LOGOUT: clears refresh cookie server-side
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/jwt/logout", null, { withCredentials: true });
      return true;
    } catch (err) {
      return rejectWithValue("Logout failed");
    }
  },
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
    },
    setAccessToken: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginThunk.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          userId: action.payload.userId,
          roles: action.payload.roles,
        };
        state.accessToken = action.payload.accessToken;
        localStorage.setItem("accessToken", JSON.stringify(state.accessToken));
        state.error = null;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // refresh / bootstrap
    builder
      .addCase(refreshThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = null;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      });

    //logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.accessToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("accessToken");
    });
  },
});

export const { clearAuth, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
