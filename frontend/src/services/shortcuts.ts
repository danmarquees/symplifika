import api from "./api";
import { Shortcut } from "@/types/shortcuts";

export const shortcutsService = {
  getAll: async () => {
    const response = await api.get<Shortcut[]>("/api/shortcuts");
    return response.data;
  },

  create: async (shortcut: Omit<Shortcut, "id">) => {
    const response = await api.post<Shortcut>("/api/shortcuts", shortcut);
    return response.data;
  },

  update: async (id: string, shortcut: Partial<Shortcut>) => {
    const response = await api.put<Shortcut>(`/api/shortcuts/${id}`, shortcut);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/shortcuts/${id}`);
  },
};
