// Mock client-side phone OTP auth using localStorage.
// Replace with Lovable Cloud Supabase phone auth when backend is enabled.

const USER_KEY = "ew_user";
const OTP_KEY = "ew_otp";

export type User = { phone: string; name?: string; createdAt: string };

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isLoggedIn() {
  return !!getUser();
}

export function requestOtp(phone: string): string {
  // Generate fixed-for-demo OTP, store in localStorage
  const otp = "123456";
  localStorage.setItem(OTP_KEY, JSON.stringify({ phone, otp, ts: Date.now() }));
  return otp;
}

export function verifyOtp(phone: string, code: string): User | null {
  try {
    const raw = localStorage.getItem(OTP_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.phone !== phone || data.otp !== code) return null;
    const user: User = { phone, createdAt: new Date().toISOString() };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    localStorage.removeItem(OTP_KEY);
    window.dispatchEvent(new Event("ew-auth"));
    return user;
  } catch {
    return null;
  }
}

export function updateUser(patch: Partial<User>) {
  const u = getUser();
  if (!u) return;
  const next = { ...u, ...patch };
  localStorage.setItem(USER_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("ew-auth"));
}

export function logout() {
  localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event("ew-auth"));
}

// React hook
import { useEffect, useState } from "react";
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
