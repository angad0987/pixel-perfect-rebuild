import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  ids: number[];
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  ids: [],
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setIds(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
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
    clearWishlist(state) {
      state.ids = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setIds, setLoading, setError, clearWishlist } = wishlistSlice.actions;

function getWishlistKey(user: { phone: string } | null): string {
  return user ? `ew_wishlist_${user.phone}` : "ew_wishlist";
}

export const loadWishlistThunk = () => (dispatch: any, getState: any) => {
  const user = getState().auth.user;
  const key = getWishlistKey(user);
  const ids: number[] =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem(key) || "[]")
      : [];
  dispatch(setIds(ids));
};

export const toggleWishlistThunk = (productId: number) => (dispatch: any, getState: any) => {
  dispatch(setLoading());
  try {
    const { ids } = getState().wishlist;
    const next = ids.includes(productId)
      ? ids.filter((id: number) => id !== productId)
      : [...ids, productId];
    const user = getState().auth.user;
    const key = getWishlistKey(user);
    localStorage.setItem(key, JSON.stringify(next));
    dispatch(setIds(next));
  } catch (err: any) {
    dispatch(setError(err.message));
  }
};

export default wishlistSlice.reducer;
