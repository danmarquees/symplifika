import { create } from "zustand";

interface Shortcut {
  id: string;
  trigger: string;
  content: string;
  tags?: string[];
  category?: string;
}

interface ShortcutsState {
  shortcuts: Shortcut[];
  addShortcut: (shortcut: Omit<Shortcut, "id">) => void;
  removeShortcut: (id: string) => void;
  updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;
}

export const useShortcutsStore = create<ShortcutsState>((set) => ({
  shortcuts: [],
  addShortcut: (shortcut) =>
    set((state) => ({
      shortcuts: [
        ...state.shortcuts,
        { ...shortcut, id: Date.now().toString() },
      ],
    })),
  removeShortcut: (id) =>
    set((state) => ({
      shortcuts: state.shortcuts.filter((s) => s.id !== id),
    })),
  updateShortcut: (id, shortcut) =>
    set((state) => ({
      shortcuts: state.shortcuts.map((s) =>
        s.id === id ? { ...s, ...shortcut } : s,
      ),
    })),
}));
