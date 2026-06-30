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
