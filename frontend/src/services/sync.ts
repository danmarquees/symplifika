import api from "./api";
import { Shortcut, Category } from "@/types/shortcuts";

export interface SyncData {
  shortcuts: Shortcut[];
  categories: Category[];
  lastSyncedAt: string;
}

export const syncService = {
  // Buscar dados do servidor
  fetchData: async (): Promise<SyncData> => {
    const response = await api.get<SyncData>("/sync");
    return response.data;
  },

  // Enviar dados para o servidor
  pushData: async (data: SyncData): Promise<SyncData> => {
    const response = await api.post<SyncData>("/sync", data);
    return response.data;
  },

  // Verificar última sincronização
  getLastSync: async (): Promise<string | null> => {
    try {
      const response = await api.get<{ lastSyncedAt: string | null }>(
        "/sync/last",
      );
      return response.data.lastSyncedAt;
    } catch (error) {
      console.error("Erro ao obter última sincronização:", error);
      return null; // Ou trate de acordo com a sua lógica
    }
  },

  // Sincronizar alterações específicas (se necessário)
  syncChanges: async (changes: {
    added: Shortcut[];
    updated: Shortcut[];
    deleted: string[];
    categories: Category[];
  }): Promise<SyncData> => {
    const response = await api.post<SyncData>("/sync/changes", changes);
    return response.data;
  },
};
