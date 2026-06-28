import { useEffect, useState } from "react";

const KEY = "ew_orders";

export type OrderStatus = "Placed" | "Confirmed" | "Packed" | "Shipped" | "Delivered";
export const ORDER_STEPS: OrderStatus[] = ["Placed", "Confirmed", "Packed", "Shipped", "Delivered"];

export type Order = {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  brand: string;
  sku: string;
  price: number;
  status: OrderStatus;
  placedAt: string;
  timeline: { status: OrderStatus; at: string }[];
  customer: { phone: string; name?: string };
};

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function getOrder(id: string) {
  return getOrders().find((o) => o.id === id) || null;
}

export function createOrder(input: Omit<Order, "id" | "status" | "placedAt" | "timeline">): Order {
  const id = "EW" + Date.now().toString(36).toUpperCase();
  const now = new Date().toISOString();
  const order: Order = {
    ...input,
    id,
    status: "Placed",
    placedAt: now,
    timeline: [{ status: "Placed", at: now }],
  };
  const all = getOrders();
  localStorage.setItem(KEY, JSON.stringify([order, ...all]));
  window.dispatchEvent(new Event("ew-orders"));
  return order;
}

// Demo: seed a couple sample orders on first load if empty
export function seedDemoOrders(phone: string, products: any[]) {
  if (getOrders().length) return;
  const now = Date.now();
  const sample: Order[] = [
    {
      id: "EWDEMO001",
      productId: products[0].id, productName: products[0].name, productImage: products[0].image,
      brand: products[0].brand, sku: products[0].sku, price: products[0].price,
      status: "Shipped", placedAt: new Date(now - 86400000 * 3).toISOString(),
      timeline: [
        { status: "Placed", at: new Date(now - 86400000 * 3).toISOString() },
        { status: "Confirmed", at: new Date(now - 86400000 * 2.5).toISOString() },
        { status: "Packed", at: new Date(now - 86400000 * 2).toISOString() },
        { status: "Shipped", at: new Date(now - 86400000 * 1).toISOString() },
      ],
      customer: { phone },
    },
    {
      id: "EWDEMO002",
      productId: products[1].id, productName: products[1].name, productImage: products[1].image,
      brand: products[1].brand, sku: products[1].sku, price: products[1].price,
      status: "Delivered", placedAt: new Date(now - 86400000 * 10).toISOString(),
      timeline: ORDER_STEPS.map((s, i) => ({ status: s, at: new Date(now - 86400000 * (10 - i)).toISOString() })),
      customer: { phone },
    },
  ];
  localStorage.setItem(KEY, JSON.stringify(sample));
}

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    setOrders(getOrders());
    const h = () => setOrders(getOrders());
    window.addEventListener("ew-orders", h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener("ew-orders", h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return orders;
}
