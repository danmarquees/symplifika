import api from "./api";
import { Category } from "@/types/shortcuts";

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/api/categories");
    return response.data;
  },

  create: async (category: Omit<Category, "id">): Promise<Category> => {
    const response = await api.post<Category>("/api/categories", category);
    return response.data;
  },

  update: async (
    id: string,
    category: Partial<Category>,
  ): Promise<Category> => {
    const response = await api.put<Category>(`/api/categories/${id}`, category);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/categories/${id}`);
  },
};
