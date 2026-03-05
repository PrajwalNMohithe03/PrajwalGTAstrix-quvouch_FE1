import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";
import { API_PATHS } from "../../constants/apiPaths";

export const registerUserThunk = createAsyncThunk(
  "register/registerUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(
        API_PATHS.USERS.REGISTER,
        data
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to register user"
      );
    }
  }
);