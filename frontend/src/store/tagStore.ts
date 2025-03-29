import { create } from "zustand";

interface TagState {
  popularTags: string[];
  addPopularTag: (tag: string) => void;
  removePopularTag: (tag: string) => void;
  setPopularTags: (tags: string[]) => void;
}

export const useTagStore = create<TagState>((set) => ({
  popularTags: [],
  addPopularTag: (tag) =>
    set((state) => ({
      popularTags: [...new Set([...state.popularTags, tag])],
    })),
  removePopularTag: (tag) =>
    set((state) => ({
      popularTags: state.popularTags.filter((t) => t !== tag),
    })),
  setPopularTags: (tags: string[]) => set(() => ({ popularTags: tags })),
}));
