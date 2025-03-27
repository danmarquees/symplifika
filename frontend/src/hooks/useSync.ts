import { useState, useEffect } from "react";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { syncService } from "@/services/sync";

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { shortcuts, setShortcuts } = useShortcutsStore();
  const { categories, setCategories } = useCategoryStore();

  // Verificar última sincronização ao carregar
  useEffect(() => {
    const checkLastSync = async () => {
      try {
        const lastSync = await syncService.getLastSync();
        setLastSyncedAt(lastSync);
      } catch (err) {
        console.error("Erro ao verificar última sincronização:", err);
      }
    };

    checkLastSync();
  }, []);

  // Função para sincronizar dados
  const syncData = async () => {
    setIsSyncing(true);
    setError(null);

    try {
      const serverData = await syncService.fetchData();

      // Mergear dados locais com servidor
      const mergedShortcuts = mergeData(shortcuts, serverData.shortcuts);
      const mergedCategories = mergeData(categories, serverData.categories);

      // Atualizar stores
      setShortcuts(mergedShortcuts);
      setCategories(mergedCategories);

      // Enviar dados mesclados de volta ao servidor
      await syncService.pushData({
        shortcuts: mergedShortcuts,
        categories: mergedCategories,
        lastSyncedAt: new Date().toISOString(),
      });

      setLastSyncedAt(new Date().toISOString());
    } catch (err) {
      setError("Erro ao sincronizar dados");
      console.error("Erro de sincronização:", err);
    } finally {
      setIsSyncing(false);
    }
  };

  // Função para mesclar dados
  const mergeData = <T extends { id: string }>(
    localData: T[],
    serverData: T[],
  ): T[] => {
    const merged = new Map<string, T>();

    // Adicionar dados locais
    localData.forEach((item) => merged.set(item.id, item));

    // Mesclar com dados do servidor
    serverData.forEach((item) => {
      const localItem = merged.get(item.id);
      if (!localItem || isNewer(item, localItem)) {
        merged.set(item.id, item);
      }
    });

    return Array.from(merged.values());
  };

  // Função auxiliar para verificar item mais recente
  const isNewer = (a: any, b: any): boolean => {
    return new Date(a.updatedAt) > new Date(b.updatedAt);
  };

  return {
    isSyncing,
    lastSyncedAt,
    error,
    syncData,
  };
};
