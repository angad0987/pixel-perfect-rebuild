import {
  findUserByPhone,
  createUser,
  createTokenPair,
  storeTokens,
  storeUser,
  storeOtp,
  getStoredOtp,
  removeOtp,
  getStoredRefreshToken,
  getUser,
  updateStoredUser,
  logout as clearAuth,
} from "./auth";
import type { User } from "./auth";

// ============================================================
// Shared response types
// ============================================================
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// ============================================================
// API Error — matches what a real backend would return
// ============================================================
export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// ============================================================
// Simulated network delay (remove for real API calls)
// ============================================================
function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ============================================================
// API Endpoints
//
// To switch to a real backend, replace the body of each
// function with an actual fetch/axios call. The return types
// and error conventions stay unchanged.
// ============================================================

/** POST /api/auth/send-otp */
export async function sendOtp(phone: string): Promise<void> {
  await wait(800);
  const otp = "123456";
  storeOtp(phone, otp);
}

/** POST /api/auth/verify-otp */
export async function verifyOtp(phone: string, code: string): Promise<void> {
  await wait(600);
  const data = getStoredOtp();
  if (!data) throw new ApiError(400, "No OTP was sent. Please request a new one.");
  if (data.phone !== phone) throw new ApiError(400, "Phone number mismatch.");
  if (data.otp !== code) throw new ApiError(400, "Invalid OTP. Try 123456.");
  if (Date.now() - data.ts > 5 * 60 * 1000) {
    throw new ApiError(400, "OTP has expired. Please request a new one.");
  }
}

/** POST /api/auth/signup */
export async function signup(data: {
  phone: string;
  name: string;
  password: string;
}): Promise<AuthResponse> {
  await wait(1000);

  const existing = findUserByPhone(data.phone);
  if (existing) {
    throw new ApiError(409, "An account with this phone number already exists. Please sign in.");
  }

  const user = createUser(data.phone, data.name, data.password);
  const tokens = createTokenPair();
  storeTokens(tokens);
  storeUser(user);
  removeOtp();

  window.dispatchEvent(new Event("ew-auth"));

  return { user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
}

/** POST /api/auth/login */
export async function login(data: { phone: string; password: string }): Promise<AuthResponse> {
  await wait(800);

  const stored = findUserByPhone(data.phone);
  if (!stored) {
    throw new ApiError(401, "No account found with this phone number. Please sign up first.");
  }
  if (stored.password !== data.password) {
    throw new ApiError(403, "Incorrect password. Please try again.");
  }

  const user: User = {
    id: stored.id,
    phone: stored.phone,
    name: stored.name,
    createdAt: stored.createdAt,
  };

  const tokens = createTokenPair();
  storeTokens(tokens);
  storeUser(user);
  removeOtp();

  window.dispatchEvent(new Event("ew-auth"));

  return { user, accessToken: tokens.accessToken, refreshToken: tokens.refreshToken };
}

/** PUT /api/users/profile */
export async function updateProfile(data: { name: string }): Promise<User> {
  await wait(400);

  const user = getUser();
  if (!user) {
    throw new ApiError(401, "Not authenticated");
  }

  updateStoredUser({ name: data.name });
  const updated = { ...user, name: data.name };
  storeUser(updated);
  return updated;
}

/** POST /api/auth/refresh-token */
export async function refreshToken(
  token: string,
): Promise<{ accessToken: string; refreshToken: string; user: User }> {
  await wait(500);

  const storedRefreshToken = getStoredRefreshToken();
  if (token !== storedRefreshToken) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  const user = getUser();
  if (!user) {
    clearAuth();
    throw new ApiError(401, "Session expired. Please sign in again.");
  }

  const tokens = createTokenPair();
  storeTokens(tokens);

  return { accessToken: tokens.accessToken, refreshToken: tokens.refreshToken, user };
}
