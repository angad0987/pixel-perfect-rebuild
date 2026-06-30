/* eslint-disable prettier/prettier */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Order, OrderStatus } from "@/lib/orders";

interface OrdersState {
  items: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: [],
  loading: true,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action: PayloadAction<Order[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    clearOrders(state) {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setOrders, setLoading, setError, clearOrders } = ordersSlice.actions;

export const loadOrdersThunk = () => (dispatch: any, getState: any) => {
  dispatch(setLoading());
  const user = getState().auth.user;
  if (user) {
    const key = `ew_orders_${user.phone}`;
    const items: Order[] =
      typeof window !== "undefined"
        ? JSON.parse(localStorage.getItem(key) || "[]")
        : [];
    dispatch(setOrders(items));
  } else {
    dispatch(setOrders([]));
  }
};

export const createOrderThunk = (
  input: Omit<Order, "id" | "status" | "placedAt" | "timeline" | "customer">
) => (dispatch: any, getState: any) => {
  const user = getState().auth.user;
  if (!user) {
    dispatch(setError("Please login to place an order"));
    return null;
  }
  const id = "EW" + Date.now().toString(36).toUpperCase();
  const now = new Date().toISOString();
  const order: Order = {
    ...input,
    id,
    status: "Placed" as OrderStatus,
    placedAt: now,
    timeline: [{ status: "Placed" as OrderStatus, at: now }],
    customer: { phone: user.phone },
  };
  const key = `ew_orders_${user.phone}`;
  const current: Order[] = JSON.parse(localStorage.getItem(key) || "[]");
  const next = [order, ...current];
  localStorage.setItem(key, JSON.stringify(next));
  dispatch(setOrders(next));
  return order;
};

export default ordersSlice.reducer;
