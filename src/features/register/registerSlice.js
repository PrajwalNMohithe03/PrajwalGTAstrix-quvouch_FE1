// features/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { registerUserThunk } from "./authThunk";

const initialState = {
  registerLoading: false,
  registerSuccess: null,
  registerError: null,
  registeredUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetRegisterState: (state) => {
      state.registerLoading = false;
      state.registerSuccess = null;
      state.registerError = null;
      state.registeredUser = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 🔵 Pending
      .addCase(registerUserThunk.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerSuccess = null;
      })

      // 🟢 Success
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.registerLoading = false;
        state.registerSuccess = "User registered successfully!";
        state.registeredUser = action.payload;
      })

      // 🔴 Error
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.payload;
      });
  },
});

export const { resetRegisterState } = authSlice.actions;
export default authSlice.reducer;