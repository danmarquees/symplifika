import api from "./api";
import { Shortcut } from "@/types/shortcuts";

export const shortcutsService = {
  getAll: async () => {
    const response = await api.get<Shortcut[]>("/shortcuts");
    return response.data;
  },

  create: async (shortcut: Omit<Shortcut, "id">) => {
    const response = await api.post<Shortcut>("/shortcuts", shortcut);
    return response.data;
  },

  update: async (id: string, shortcut: Partial<Shortcut>) => {
    const response = await api.put<Shortcut>(`/shortcuts/${id}`, shortcut);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/shortcuts/${id}`);
  },
};
