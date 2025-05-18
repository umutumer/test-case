import { create } from "zustand";
import { Product } from "../types/types";
import { fetchProducts } from "../services/api";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  loading: false,
  error: null,
  getProducts: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchProducts();
      set({ products: data, loading: false });
    } catch (error:any) {
      set({ error: error.message, loading: false });
    }
  },
}));
