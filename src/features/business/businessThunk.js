import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createBusinessApi,
  getBusinessesApi,
  deleteBusinessApi,
  getBusinessByIdApi,   // 👈 ADD THIS
} from "./businessService";

// ✅ CREATE
export const createBusiness = createAsyncThunk(
  "business/create",
  async (payload, thunkAPI) => {
    try {
      return await createBusinessApi(payload);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

// ✅ GET ALL
export const fetchBusinesses = createAsyncThunk(
  "business/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await getBusinessesApi();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

// ✅ DELETE
export const deleteBusiness = createAsyncThunk(
  "business/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteBusinessApi(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);

// ✅ GET BY ID  🔥 ADD THIS
export const fetchBusinessById = createAsyncThunk(
  "business/fetchById",
  async (id, thunkAPI) => {
    try {
      return await getBusinessByIdApi(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || err.message
      );
    }
  }
);
