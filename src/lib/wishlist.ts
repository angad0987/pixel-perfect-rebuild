import { useEffect, useState } from "react";

const KEY = "ew_wishlist";

export function getWishlist(): number[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function toggleWishlist(id: number) {
  const list = getWishlist();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("ew-wishlist"));
  return next;
}

export function isWished(id: number) {
  return getWishlist().includes(id);
}

export function useWishlist() {
  const [list, setList] = useState<number[]>([]);
  useEffect(() => {
    setList(getWishlist());
    const h = () => setList(getWishlist());
    window.addEventListener("ew-wishlist", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("ew-wishlist", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return list;
}
