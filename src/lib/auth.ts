import { useEffect, useState } from "react";

export type User = { id: string; phone: string; name?: string; createdAt: string };

interface StoredUser extends User {
  password: string;
}

const USERS_KEY = "ew_users";
const USER_KEY = "ew_user";
const OTP_KEY = "ew_otp";
const ACCESS_TOKEN_KEY = "ew_access_token";
const REFRESH_TOKEN_KEY = "ew_refresh_token";
const ACCESS_TOKEN_EXP_KEY = "ew_access_token_exp";
const REFRESH_TOKEN_EXP_KEY = "ew_refresh_token_exp";

function generateId(): string {
  return (
    (typeof crypto !== "undefined" && crypto.randomUUID?.()) ||
    Math.random().toString(36).substring(2) + Date.now().toString(36)
  );
}

function getRawUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveRawUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByPhone(phone: string): StoredUser | undefined {
  return getRawUsers().find((u) => u.phone === phone);
}

export function createUser(phone: string, name: string, password: string): User {
  const user: User = {
    id: generateId(),
    phone,
    name,
    createdAt: new Date().toISOString(),
  };
  const stored: StoredUser = { ...user, password };
  const users = getRawUsers();
  users.push(stored);
  saveRawUsers(users);
  return user;
}

const ACCESS_EXP_MS = 24 * 60 * 60 * 1000;
const REFRESH_EXP_MS = 7 * 24 * 60 * 60 * 1000;

function generateToken(): string {
  return generateId() + generateId();
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExp: number;
  refreshTokenExp: number;
}

export function createTokenPair(): TokenPair {
  return {
    accessToken: generateToken(),
    refreshToken: generateToken(),
    accessTokenExp: Date.now() + ACCESS_EXP_MS,
    refreshTokenExp: Date.now() + REFRESH_EXP_MS,
  };
}

export function storeTokens(tokens: TokenPair): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  localStorage.setItem(ACCESS_TOKEN_EXP_KEY, String(tokens.accessTokenExp));
  localStorage.setItem(REFRESH_TOKEN_EXP_KEY, String(tokens.refreshTokenExp));
}

export function getStoredAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function isAccessTokenValid(): boolean {
  const exp = localStorage.getItem(ACCESS_TOKEN_EXP_KEY);
  return !!exp && Date.now() < Number(exp);
}

export function updateStoredUser(partial: Partial<User>): void {
  const users = getRawUsers();
  const current = getUser();
  if (!current) return;
  const idx = users.findIndex((u) => u.id === current.id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...partial };
    saveRawUsers(users);
  }
}

export function storeUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function storeOtp(phone: string, otp: string): void {
  localStorage.setItem(OTP_KEY, JSON.stringify({ phone, otp, ts: Date.now() }));
}

export function getStoredOtp(): { phone: string; otp: string; ts: number } | null {
  try {
    const raw = localStorage.getItem(OTP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function removeOtp(): void {
  localStorage.removeItem(OTP_KEY);
}

export function logout(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(ACCESS_TOKEN_EXP_KEY);
  localStorage.removeItem(REFRESH_TOKEN_EXP_KEY);
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("ew-auth"));
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(getUser());
    const h = () => setUser(getUser());
    window.addEventListener("ew-auth", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("ew-auth", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return user;
}
