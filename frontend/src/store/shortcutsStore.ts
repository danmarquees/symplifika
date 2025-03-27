import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Shortcut } from "@/types/shortcuts";
import { ShortcutStats } from "@/types/stats";

interface ShortcutsState {
  shortcuts: Shortcut[];
  addShortcut: (shortcut: Omit<Shortcut, "id">) => void;
  updateShortcut: (id: string, shortcut: Partial<Shortcut>) => void;
  removeShortcut: (id: string) => void;
  setShortcuts: (shortcuts: Shortcut[]) => void;
  clearPendingChanges: () => void;
  increaseUsageCount: (id: string) => void; // Adicionado
  getStats: () => ShortcutStats; // Added
}

export const useShortcutsStore = create<ShortcutsState>()(
  persist(
    (set, get) => ({
      shortcuts: [],
      addShortcut: (shortcut) =>
        set((state) => {
          const id = Date.now().toString();
          return {
            shortcuts: [
              ...state.shortcuts,
              { ...shortcut, id: id, usageCount: 0 },
            ],
          };
        }),
      updateShortcut: (id, shortcut) =>
        set((state) => ({
          shortcuts: state.shortcuts.map((s) =>
            s.id === id ? { ...s, ...shortcut } : s,
          ),
        })),
      removeShortcut: (id) =>
        set((state) => ({
          shortcuts: state.shortcuts.filter((s) => s.id !== id),
        })),
      setShortcuts: (shortcuts) =>
        set({
          shortcuts: shortcuts,
        }),
      clearPendingChanges: () => set(() => ({})),
      increaseUsageCount: (id: string) => {
        set((state) => ({
          shortcuts: state.shortcuts.map((s) => {
            if (s.id === id) {
              return {
                ...s,
                usageCount: s.usageCount ? s.usageCount + 1 : 1,
                lastUsedAt: new Date().toISOString(),
              };
            }
            return s;
          }),
        }));
      },
      getStats: () => {
        const totalShortcuts = get().shortcuts.length;
        const sortedShortcuts = [...get().shortcuts].sort(
          (a, b) => (b.usageCount || 0) - (a.usageCount || 0),
        );

        const mostUsedShortcut = sortedShortcuts[0]
          ? {
              trigger: sortedShortcuts[0].trigger,
              usageCount: sortedShortcuts[0].usageCount || 0,
            }
          : undefined;

        const leastUsedShortcut = sortedShortcuts[totalShortcuts - 1]
          ? {
              trigger: sortedShortcuts[totalShortcuts - 1].trigger,
              usageCount: sortedShortcuts[totalShortcuts - 1].usageCount || 0,
            }
          : undefined;

        const totalUsage = get().shortcuts.reduce(
          (sum, shortcut) => sum + (shortcut.usageCount || 0),
          0,
        );
        const averageUsage =
          totalShortcuts > 0 ? totalUsage / totalShortcuts : 0;

        return {
          totalShortcuts,
          mostUsedShortcut,
          leastUsedShortcut,
          averageUsage,
        };
      },
    }),
    {
      name: "shortcuts-storage",
    },
  ),
);
