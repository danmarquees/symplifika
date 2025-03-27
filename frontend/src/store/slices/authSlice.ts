export const authSlice = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
});

// store/slices/shortcutsSlice.ts
export const shortcutsSlice = (set) => ({
  shortcuts: [],
  addShortcut: (shortcut) =>
    set((state) => ({
      shortcuts: [...state.shortcuts, shortcut],
    })),
});
