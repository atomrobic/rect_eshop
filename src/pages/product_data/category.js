// src/store/useProductStore.js
import { create } from "zustand";
import axios from "axios";

const useProductStore = create((set) => ({
  products: [],

  fetchProducts: async ({ sortBy = "featured", categoryId = "" } = {}) => {
    try {
      let url = `http://127.0.0.1:8000/seller/products?sort_by=${sortBy}`;
      if (categoryId) url += `&category_id=${categoryId}`;

      const response = await axios.get(url);
      set({ products: response.data });
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  },
}));

export default useProductStore;
