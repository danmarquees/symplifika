import React from "react";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { Card } from "@/components/ui/Card";

const UsageHistory: React.FC = () => {
  const { shortcuts } = useShortcutsStore();

  const sortedShortcuts = [...shortcuts].sort(
    (a, b) => (b.usageCount || 0) - (a.usageCount || 0),
  );

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Histórico de Uso</h3>

      <ul>
        {sortedShortcuts.map((shortcut) => (
          <li key={shortcut.id} className="py-2 border-b last:border-b-0">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{shortcut.trigger}</span>
                <p className="text-sm text-gray-500">
                  Usado {shortcut.usageCount || 0} vezes
                </p>
                {shortcut.lastUsedAt && (
                  <p className="text-xs text-gray-400">
                    Último uso: {new Date(shortcut.lastUsedAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsageHistory;
