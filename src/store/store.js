import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import businessReducer from "../features/business/businessSlice";
import salesReducer from "../features/sales/SalesClientSlice";
import reviewReducer from "../features/review/reviewSlice";
import adminReducer from "../features/admin/adminSlice";
import clientBusinessReducer from "../features/clientBusiness/clientBusinessSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    business: businessReducer,
    sales: salesReducer,   // 👈 This connects your entire sales slice
    review: reviewReducer,
    admin: adminReducer,
     clientBusiness: clientBusinessReducer,
  },
});