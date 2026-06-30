/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { verifyOtp as mockVerifyOtp, logout as mockLogout } from "@/lib/auth";
import { setIds, clearWishlist } from "./wishlistSlice";
import { clearOrders } from "./ordersSlice";

interface User {
  phone: string;
  name?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("ew_user") || "null")
    : null,
  token: typeof window !== "undefined"
    ? localStorage.getItem("ew_token")
    : null,
  isLoggedIn: typeof window !== "undefined"
    ? !!localStorage.getItem("ew_user")
    : false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.token = action.payload ? state.token : null;
      state.loading = false;
      state.error = null;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setUser, setToken, setLoading, setError, logout } = authSlice.actions;

export const requestOtpThunk = (phone: string) => (dispatch: any) => {
  dispatch(setLoading());
  try {
    const otp = "123456";
    localStorage.setItem("ew_otp", JSON.stringify({ phone, otp, ts: Date.now() }));
    dispatch(setLoading());
    return otp;
  } catch (err: any) {
    dispatch(setError("Failed to send OTP"));
    return null;
  }
};

export const loginThunk = (phone: string, otp: string) => (dispatch: any, getState: any) => {
  dispatch(setLoading());
  const user = mockVerifyOtp(phone, otp);
  if (user) {
    // Merge guest wishlist into user's wishlist
    const guestIds: number[] = JSON.parse(localStorage.getItem("ew_wishlist") || "[]");
    const userKey = `ew_wishlist_${phone}`;
    const existingIds: number[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const merged = [...new Set([...existingIds, ...guestIds])];
    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem("ew_wishlist");
    dispatch(setIds(merged));
    dispatch(setUser(user));
    return true;
  } else {
    dispatch(setError("Invalid OTP. Try 123456 for the demo."));
    return false;
  }
};

export const logoutThunk = () => (dispatch: any, getState: any) => {
  const user = getState().auth.user;
  if (user) {
    const ids = getState().wishlist.ids;
    localStorage.setItem(`ew_wishlist_${user.phone}`, JSON.stringify(ids));
  }
  mockLogout();
  dispatch(logout());
  dispatch(clearWishlist());
  dispatch(clearOrders());
};

export default authSlice.reducer;
