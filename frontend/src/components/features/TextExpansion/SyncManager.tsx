import React from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useSync } from "@/hooks/useSync";
import { FiRefreshCw, FiCheck, FiAlertCircle } from "react-icons/fi";

const SyncManager: React.FC = () => {
  const { isSyncing, lastSyncedAt, error, syncData } = useSync();

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Sincronização</h3>
          <p className="text-sm text-gray-500">
            {lastSyncedAt
              ? `Última sincronização: ${new Date(lastSyncedAt).toLocaleString()}`
              : "Nunca sincronizado"}
          </p>
          {error && (
            <p className="text-sm text-red-500 flex items-center gap-1">
              <FiAlertCircle /> {error}
            </p>
          )}
        </div>

        <Button
          onClick={syncData}
          disabled={isSyncing}
          className="flex items-center gap-2"
        >
          {isSyncing ? (
            <>
              <FiRefreshCw className="animate-spin" />
              Sincronizando...
            </>
          ) : (
            <>
              <FiRefreshCw />
              Sincronizar
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default SyncManager;
