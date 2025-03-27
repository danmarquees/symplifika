import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { Shortcut } from "@/types/shortcuts";

interface ExportData {
  shortcuts: Shortcut[];
  categories: Category[];
  version: string;
  exportDate: string;
}

const ImportExportManager: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { shortcuts, addShortcut, setShortcuts } = useShortcutsStore();
  const { categories, addCategory, setCategories } = useCategoryStore();

  const handleExport = () => {
    const exportData: ExportData = {
      shortcuts,
      categories,
      version: "1.0",
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
      encoding: "UTF-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `symplifika-shortcuts-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData: ExportData = JSON.parse(e.target?.result as string);

        // Validação básica
        if (!importData.shortcuts || !Array.isArray(importData.shortcuts)) {
          throw new Error("Formato de arquivo inválido");
        }

        // Importar categorias primeiro
        if (importData.categories) {
          setCategories(importData.categories);
        }

        // Importar atalhos
        setShortcuts(importData.shortcuts);

        alert("Importação concluída com sucesso!");
      } catch (error) {
        alert("Erro ao importar arquivo: " + (error as Error).message);
      }
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Importar/Exportar Atalhos</h1>

      <Card className="p-4">
        <div className="flex gap-4">
          <Button onClick={handleExport}>Exportar Atalhos</Button>

          <Button variant="outline" onClick={handleImport}>
            Importar Atalhos
          </Button>

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".json"
            onChange={handleFileChange}
          />
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>• Exporte seus atalhos para fazer backup</p>
          <p>• Importe atalhos de outros dispositivos</p>
          <p>• Formato: JSON</p>
        </div>
      </Card>
    </div>
  );
};

export default ImportExportManager;
