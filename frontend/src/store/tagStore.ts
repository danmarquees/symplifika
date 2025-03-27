import { create } from "zustand";

interface TagState {
  popularTags: string[];
  addPopularTag: (tag: string) => void;
  removePopularTag: (tag: string) => void;
}

export const useTagStore = create<TagState>((set) => ({
  popularTags: ["email", "documento", "codigo", "saudacao", "assinatura"],
  addPopularTag: (tag) =>
    set((state) => ({
      popularTags: [...new Set([...state.popularTags, tag])],
    })),
  removePopularTag: (tag) =>
    set((state) => ({
      popularTags: state.popularTags.filter((t) => t !== tag),
    })),
}));
