import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { API_PATHS } from "../../constants/apiPaths";

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(API_PATHS.USERS.REGISTER, payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Registration failed");
    }
  }
);
