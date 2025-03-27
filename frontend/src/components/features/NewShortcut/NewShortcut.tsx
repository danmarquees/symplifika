import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import VariableManager from "../TextExpansion/VariableManager";
import type { Shortcut, Variable } from "@/types/shortcuts";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { useCategoryStore } from "@/store/categoryStore";
import { TagInput } from "@/components/ui/TagInput";

const NewShortcut: React.FC = () => {
  const { shortcuts, addShortcut, removeShortcut } = useShortcutsStore();
  const { categories } = useCategoryStore();
  const [newShortcut, setNewShortcut] = useState<Partial<Shortcut>>({
    variables: [],
    tags: [],
  });

  const handleAddVariable = (variable: Variable) => {
    setNewShortcut((prev) => ({
      ...prev,
      variables: [...(prev.variables || []), variable],
    }));
  };

  const handleRemoveVariable = (key: string) => {
    setNewShortcut((prev) => ({
      ...prev,
      variables: prev.variables?.filter((v) => v.key !== key) || [],
    }));
  };

  const handleAddShortcut = () => {
    if (newShortcut.trigger && newShortcut.content) {
      addShortcut(newShortcut as Shortcut);
      setNewShortcut({ variables: [] });
    }
  };

  const handleAddTag = (tag: string) => {
    setNewShortcut((prev) => ({
      ...prev,
      tags: [...new Set([...(prev.tags || []), tag])],
    }));
  };

  const handleRemoveTag = (tag: string) => {
    setNewShortcut((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Novo Atalho</h1>

      {/* Formulário de Novo Atalho */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Adicionar Novo Atalho</h2>
        <div className="space-y-4">
          <Input
            placeholder="Digite o atalho (ex: /ola)"
            value={newShortcut.trigger || ""}
            onChange={(e) =>
              setNewShortcut({ ...newShortcut, trigger: e.target.value })
            }
          />

          <div className="relative">
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Digite o texto expandido. Use {variavel} para inserir variáveis"
              value={newShortcut.content || ""}
              onChange={(e) =>
                setNewShortcut({ ...newShortcut, content: e.target.value })
              }
              rows={4}
            />
            {/* Preview das variáveis disponíveis */}
          </div>

          <TagInput
            tags={newShortcut.tags || []}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            placeholder="Adicionar tags ao atalho..."
          />

          <select
            className="border rounded-md px-3 py-2 w-full"
            value={newShortcut.categoryId || ""}
            onChange={(e) =>
              setNewShortcut({ ...newShortcut, categoryId: e.target.value })
            }
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <VariableManager
            variables={newShortcut.variables || []}
            onAddVariable={handleAddVariable}
            onRemoveVariable={handleRemoveVariable}
            onUpdateVariable={(key, variable) => {
              setNewShortcut((prev) => ({
                ...prev,
                variables:
                  prev.variables?.map((v) =>
                    v.key === key ? { ...v, ...variable } : v,
                  ) || [],
              }));
            }}
          />

          <Button onClick={handleAddShortcut}>Adicionar Atalho</Button>
        </div>
      </Card>
    </div>
  );
};

export default NewShortcut;
