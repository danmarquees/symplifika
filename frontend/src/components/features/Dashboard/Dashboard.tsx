import React from "react";
import { Link } from "react-router-dom";
import { FiType, FiPlus, FiTrendingUp, FiTrendingDown, FiList } from "react-icons/fi";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { Card } from "@/components/ui/Card";

const Dashboard: React.FC = () => {
  const { shortcuts, getStats } = useShortcutsStore();
  const stats = getStats();

  // Top 3 atalhos mais usados
  const topShortcuts = [...shortcuts]
    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
    .slice(0, 3);

  // 3 atalhos recentes
  const recentShortcuts = [...shortcuts]
    .sort((a, b) => new Date(b.lastUsedAt || 0).getTime() - new Date(a.lastUsedAt || 0).getTime())
    .slice(0, 3);

  return (
    <div className="flex-1 bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          {/* Outros ícones ou ações */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Visão Geral de Uso */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Visão Geral</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <FiList className="text-gray-500" />
              <span>Total de atalhos: {stats.totalShortcuts}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiTrendingUp className="text-green-500" />
              <span>Ativações totais: {/* Implementar o cálculo */}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiList className="text-blue-500" />
              <span>Ativações médias: {stats.averageUsage.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Atalhos Mais Usados */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Atalhos Mais Usados</h2>
          <ul>
            {topShortcuts.map((shortcut) => (
              <li key={shortcut.id} className="py-1 border-b last:border-b-0 flex items-center justify-between">
                <span>{shortcut.trigger}</span>
                <span className="text-gray-500">{shortcut.usageCount}</span>
              </li>
            ))}
            {topShortcuts.length === 0 && <p className="text-gray-400">Nenhum atalho usado ainda.</p>}
          </ul>
        </Card>

        {/* Atalhos Recentes */}
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-2">Atalhos Recentes</h2>
          <ul>
            {recentShortcuts.map((shortcut) => (
              <li key={shortcut.id} className="py-1 border-b last:border-b-0 flex items-center justify-between">
                <span>{shortcut.trigger}</span>
                <span className="text-gray-500">{shortcut.lastUsedAt ? new Date(shortcut.lastUsedAt).toLocaleDateString() : 'Nunca'}</span>
              </li>
            ))}
            {recentShortcuts.length === 0 && <p className="text-gray-400">Nenhum atalho recente.</p>}
          </ul>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <div className="mt-6 flex justify-center">
        <Link to="/text-expansion" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition-colors flex items-center gap-2">
          <FiType /> Gerenciar Atalhos
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
