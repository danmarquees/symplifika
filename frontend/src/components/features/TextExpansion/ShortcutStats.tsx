import React from "react";
import { Card } from "@/components/ui/Card";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { FiTrendingUp, FiTrendingDown, FiList } from "react-icons/fi";

const ShortcutStats: React.FC = () => {
  const { getStats } = useShortcutsStore();
  const stats = getStats();

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Estatísticas dos Atalhos</h3>

      <div className="space-y-4">
        {/* Número total de atalhos */}
        <div className="flex items-center gap-2">
          <FiList className="text-gray-500" />
          <span>Total de atalhos: {stats.totalShortcuts}</span>
        </div>

        {/* Atalho mais usado */}
        {stats.mostUsedShortcut && (
          <div className="flex items-center gap-2">
            <FiTrendingUp className="text-green-500" />
            <span>
              Atalho mais usado: <b>{stats.mostUsedShortcut.trigger}</b> (
              {stats.mostUsedShortcut.usageCount} usos)
            </span>
          </div>
        )}

        {/* Atalho menos usado */}
        {stats.leastUsedShortcut && (
          <div className="flex items-center gap-2">
            <FiTrendingDown className="text-red-500" />
            <span>
              Atalho menos usado: <b>{stats.leastUsedShortcut.trigger}</b> (
              {stats.leastUsedShortcut.usageCount} usos)
            </span>
          </div>
        )}

        {/* Uso médio */}
        <div className="flex items-center gap-2">
          <FiList className="text-blue-500" />
          <span>Uso médio: {stats.averageUsage.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
};

export default ShortcutStats;
