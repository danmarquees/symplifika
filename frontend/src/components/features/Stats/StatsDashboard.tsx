import React from "react";
import { Card } from "@/components/ui/Card";
import { useShortcutsStore } from "@/store/shortcutsStore";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiList,
  FiCalendar,
} from "react-icons/fi";

const StatsDashboard: React.FC = () => {
  const { shortcuts, getStats } = useShortcutsStore();
  const stats = getStats();

  const calculateActivationsPerTime = (timeFrame: "day" | "week") => {
    const now = new Date();
    const startDate = new Date(now);

    if (timeFrame === "day") {
      startDate.setDate(now.getDate() - 1);
    } else if (timeFrame === "week") {
      startDate.setDate(now.getDate() - 7);
    }

    const activations = shortcuts.reduce((count, shortcut) => {
      if (shortcut.lastUsedAt && new Date(shortcut.lastUsedAt) >= startDate) {
        return count + (shortcut.usageCount || 0);
      }
      return count;
    }, 0);

    return activations;
  };

  const dailyActivations = calculateActivationsPerTime("day");
  const weeklyActivations = calculateActivationsPerTime("week");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Estatísticas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Uso Geral</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiList className="text-gray-500" />
              <span>Total de atalhos: {stats.totalShortcuts}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-green-500" />
              <span>Ativações últimas 24h: {dailyActivations}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiCalendar className="text-blue-500" />
              <span>Ativações última semana: {weeklyActivations}</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Atalhos Mais Usados</h2>
          <ul>
            {stats.mostUsedShortcut ? (
              <li className="py-1 border-b last:border-b-0 flex items-center justify-between">
                <span>{stats.mostUsedShortcut.trigger}</span>
                <span className="text-gray-500">
                  {stats.mostUsedShortcut.usageCount}
                </span>
              </li>
            ) : (
              <li className="text-gray-500">Nenhum atalho usado ainda</li>
            )}
          </ul>
        </Card>

        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Atalhos Menos Usados</h2>
          <ul>
            {stats.leastUsedShortcut ? (
              <li className="py-1 border-b last:border-b-0 flex items-center justify-between">
                <span>{stats.leastUsedShortcut.trigger}</span>
                <span className="text-gray-500">
                  {stats.leastUsedShortcut.usageCount}
                </span>
              </li>
            ) : (
              <li className="text-gray-500">Nenhum atalho criado</li>
            )}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default StatsDashboard;
