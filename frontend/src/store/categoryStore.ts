import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Category } from "@/types/shortcuts";

interface CategoryState {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  removeCategory: (id: string) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: [
        {
          id: "1",
          name: "Email",
          color: "#2563eb",
          description: "Templates de email",
        },
        {
          id: "2",
          name: "Documentos",
          color: "#16a34a",
          description: "Templates para documentos",
        },
        {
          id: "3",
          name: "Código",
          color: "#dc2626",
          description: "Snippets de código",
        },
      ],
      addCategory: (category) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { ...category, id: Date.now().toString() },
          ],
        })),
      removeCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c,
          ),
        })),
      setCategories: (categories) => set({ categories }),
    }),
    {
      name: "categories-storage",
    },
  ),
);
