import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import businessReducer from "../features/business/businessSlice";
import salesReducer from "../features/sales/salesClientSlice";
import reviewReducer from "../features/review/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
    sales: salesReducer,
     review: reviewReducer,
  },
});
