export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export const ORDER_STEPS: OrderStatus[] = ["Processing", "Shipped", "Delivered"];

export type Order = {
  id: string;
  productId: number;
  productName: string;
  productImage: string;
  brand: string;
  sku: string;
  price: number;
  quantity: number;
  status: OrderStatus;
  placedAt: string;
  timeline: { status: OrderStatus; at: string }[];
  customer: { phone: string; name?: string };
};
