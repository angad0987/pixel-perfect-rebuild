import { configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "./slices/wishlistSlice";
import authReducer from "./slices/authSlice";
import ordersReducer from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
