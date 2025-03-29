import api from "./api";
import { Shortcut } from "@/types/shortcuts";

export const tagService = {
  getAll: async () => {
    const response = await api.get<Shortcut[]>("/api/tags");
    return response.data;
  },

  create: async (tag: Omit<Shortcut, "id">) => {
    const response = await api.post<Shortcut>("/api/tags", tag);
    return response.data;
  },

  update: async (id: string, tag: Partial<Shortcut>) => {
    const response = await api.put<Shortcut>(`/api/tags/${id}`, tag);
    return response.data;
  },

  delete: async (id: string) => {
    await api.delete(`/api/tags/${id}`);
  },
};
