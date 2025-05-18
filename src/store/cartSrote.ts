// store/cartStore.ts
import { create } from "zustand";
import { Cart, CartProduct } from "../types/types";
import { addCartItem, deleteCartItem, fetchCart, updateCartItemQuantity } from "../services/api";

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  getCart: () => Promise<void>;
  updateQuantity: (productId: number, newQty: number) => Promise<void>;
  addItemToCart: (newProduct: CartProduct) => Promise<void>;
  removeItemFromCart: (productId: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  loading: false,
  error: null,
  getCart: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCart();
      set({ cart: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  updateQuantity: async (productId, newQty) => {
    try {
      set({ loading: true, error: null });
      const currentCart = get().cart;
      if (!currentCart) return;

      await updateCartItemQuantity(productId, newQty, currentCart.products);

      const updatedProducts = currentCart.products.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, newQty) }
          : item
      );

      set({ cart: { ...currentCart, products: updatedProducts }, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  addItemToCart: async (newProduct : CartProduct) => {
    try {
      set({ loading: true, error: null });
      const currentCart = get().cart;
      if (!currentCart) return;

      const updatedCart = await addCartItem(newProduct, currentCart.products);

      set({ cart: updatedCart, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  removeItemFromCart: async (productId: number) => {
    try {
      set({ loading: true, error: null });
      const currentCart = get().cart;
      if (!currentCart) return;

      const updatedProducts = currentCart.products.filter(
        (item) => item.productId !== productId
      );

      const updatedCart = await deleteCartItem(productId, updatedProducts);

      set({ cart: updatedCart, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
