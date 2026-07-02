/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "@/lib/api";
import {
  getUser,
  getStoredAccessToken,
  getStoredRefreshToken,
  isAccessTokenValid,
  logout as clearAuth,
} from "@/lib/auth";
import { setIds, clearWishlist } from "./wishlistSlice";
import { clearOrders } from "./ordersSlice";

interface User {
  id: string;
  phone: string;
  name?: string;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  otpVerified: boolean;
  signupData: { phone: string; name: string; password: string } | null;
}

function init(): AuthState {
  if (typeof window === "undefined") {
    return {
      user: null,
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      loading: false,
      error: null,
      initialized: false,
      otpVerified: false,
      signupData: null,
    };
  }

  if (isAccessTokenValid()) {
    const user = getUser();
    const accessToken = getStoredAccessToken();
    const refreshToken = getStoredRefreshToken();
    return {
      user,
      accessToken,
      refreshToken,
      isLoggedIn: !!user,
      loading: false,
      error: null,
      initialized: false,
      otpVerified: false,
      signupData: null,
    };
  }

  return {
    user: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    loading: false,
    error: null,
    initialized: false,
    otpVerified: false,
    signupData: null,
  };
}

const initialState: AuthState = init();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    setAuth(
      state,
      action: PayloadAction<{ user: User; accessToken: string; refreshToken: string }>,
    ) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
      state.signupData = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    setInitialized(state) {
      state.initialized = true;
      state.loading = false;
    },
    setOtpVerified(state, action: PayloadAction<boolean>) {
      state.otpVerified = action.payload;
    },
    setSignupData(
      state,
      action: PayloadAction<{ phone: string; name: string; password: string } | null>,
    ) {
      state.signupData = action.payload;
    },
    resetOtpFlow(state) {
      state.otpVerified = false;
      state.signupData = null;
    },
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = null;
      state.otpVerified = false;
      state.signupData = null;
    },
  },
});

export const {
  setUser,
  setAuth,
  setLoading,
  clearLoading,
  setError,
  clearError,
  setInitialized,
  setOtpVerified,
  setSignupData,
  resetOtpFlow,
  logout,
} = authSlice.actions;

// ============================================================
// Thunks — dispatch these from components
// ============================================================

export const sendOtpThunk = (phone: string) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    await api.sendOtp(phone);
    dispatch(clearLoading());
    return true;
  } catch (err: any) {
    dispatch(setError(err.message || "Failed to send OTP"));
    return false;
  }
};

export const verifyOtpThunk = (phone: string, code: string) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    await api.verifyOtp(phone, code);
    dispatch(setOtpVerified(true));
    dispatch(clearLoading());
    return true;
  } catch (err: any) {
    dispatch(setError(err.message || "OTP verification failed"));
    return false;
  }
};

export const createAccountThunk = () => async (dispatch: any, getState: any) => {
  const { signupData } = getState().auth;
  if (!signupData) {
    dispatch(setError("Signup data missing. Please start again."));
    return false;
  }

  dispatch(setLoading());
  try {
    const result = await api.signup(signupData);

    const guestIds: number[] = JSON.parse(localStorage.getItem("ew_wishlist") || "[]");
    const userKey = `ew_wishlist_${result.user.phone}`;
    const existingIds: number[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const merged = [...new Set([...existingIds, ...guestIds])];
    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem("ew_wishlist");

    dispatch(setAuth(result));
    dispatch(setIds(merged));
    return true;
  } catch (err: any) {
    if (err instanceof api.ApiError) {
      dispatch(setError(err.message));
    } else {
      dispatch(setError("Failed to create account. Please try again."));
    }
    return false;
  }
};

export const loginThunk = (phone: string, password: string) => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const result = await api.login({ phone, password });

    const guestIds: number[] = JSON.parse(localStorage.getItem("ew_wishlist") || "[]");
    const userKey = `ew_wishlist_${result.user.phone}`;
    const existingIds: number[] = JSON.parse(localStorage.getItem(userKey) || "[]");
    const merged = [...new Set([...existingIds, ...guestIds])];
    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem("ew_wishlist");

    dispatch(setAuth(result));
    dispatch(setIds(merged));
    return true;
  } catch (err: any) {
    if (err instanceof api.ApiError) {
      dispatch(setError(err.message));
    } else {
      dispatch(setError("Login failed. Please try again."));
    }
    return false;
  }
};

export const refreshTokenThunk = () => async (dispatch: any) => {
  const storedRefreshToken = getStoredRefreshToken();
  if (!storedRefreshToken) {
    clearAuth();
    dispatch(logout());
    dispatch(setInitialized());
    return false;
  }

  dispatch(setLoading());
  try {
    const result = await api.refreshToken(storedRefreshToken);
    dispatch(setAuth({ ...result, refreshToken: result.refreshToken }));
    dispatch(setInitialized());
    return true;
  } catch (err: any) {
    clearAuth();
    dispatch(logout());
    dispatch(setInitialized());
    return false;
  }
};

export const logoutThunk = () => (dispatch: any, getState: any) => {
  const user = getState().auth.user;
  if (user) {
    const ids = getState().wishlist.ids;
    localStorage.setItem(`ew_wishlist_${user.phone}`, JSON.stringify(ids));
  }
  clearAuth();
  dispatch(logout());
  dispatch(clearWishlist());
  dispatch(clearOrders());
};

export default authSlice.reducer;
