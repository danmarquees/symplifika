import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import VariableManager from "./VariableManager";
import type { Shortcut, Variable } from "@/types/shortcuts";
import { useShortcutsStore } from "@/store/shortcutsStore";
import { useCategoryStore } from "@/store/categoryStore";
import CategoryManager from "./CategoryManager";
import { TagInput } from "@/components/ui/TagInput";
import { useTagStore } from "@/store/tagStore";
import { cn } from "@/lib/utils";
import ImportExport from "./ImportExport";
import SyncManager from "./SyncManager";
import UsageHistory from "./UsageHistory";
import ShortcutStats from "./ShortcutStats";
import OpenAIForm from "./OpenAIForm"; // Import OpenAIForm

const TextExpansionManager: React.FC = () => {
  const { shortcuts, addShortcut, removeShortcut, increaseUsageCount } =
    useShortcutsStore();
  const { categories } = useCategoryStore();
  const { popularTags } = useTagStore();
  const [newShortcut, setNewShortcut] = useState<Partial<Shortcut>>({
    variables: [],
    tags: [],
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredShortcuts = shortcuts.filter((shortcut) => {
    const categoryMatch =
      selectedCategory === "all" || shortcut.categoryId === selectedCategory;
    const tagsMatch =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => shortcut.tags?.includes(tag));
    return categoryMatch && tagsMatch;
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

  const handleAddShortcut = () => {
    if (newShortcut.trigger && newShortcut.content) {
      addShortcut(newShortcut as Shortcut);
      setNewShortcut({ variables: [], tags: [] });
    }
  };

  // New function to handle usage of shortcuts
  const handleShortcutUsage = (shortcutId: string) => {
    increaseUsageCount(shortcutId);
  };

  useEffect(() => {
    const textarea = document.querySelector("textarea");

    const handleTextareaInput = () => {
      const text = textarea?.value || "";

      shortcuts.forEach((shortcut) => {
        if (text.includes(shortcut.trigger)) {
          // Se o atalho for usado, aumenta a contagem
          handleShortcutUsage(shortcut.id);
        }
      });
    };

    textarea?.addEventListener("input", handleTextareaInput);

    // Cleanup
    return () => {
      textarea?.removeEventListener("input", handleTextareaInput);
    };
  }, [shortcuts, increaseUsageCount]);

  const [generatedText, setGeneratedText] = useState("");

  const handleReceiveText = (text: string) => {
    setGeneratedText(text);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gerenciador de Atalhos</h1>
        <div className="flex gap-4">
          <SyncManager />
          <ImportExport />
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4">
          <select
            className="border rounded-md px-3 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Todas as categorias</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <TagInput
            tags={selectedTags}
            onAddTag={(tag) => setSelectedTags([...selectedTags, tag])}
            onRemoveTag={(tag) =>
              setSelectedTags(selectedTags.filter((t) => t !== tag))
            }
            placeholder="Filtrar por tags..."
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t) => t !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              className={cn(
                "px-2 py-1 rounded-md text-sm",
                selectedTags.includes(tag)
                  ? "bg-primary text-white"
                  : "bg-gray-100 hover:bg-gray-200",
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

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

            <div className="absolute right-2 top-2 space-x-1">
              {newShortcut.variables?.map((v) => (
                <span
                  key={v.key}
                  className="inline-block px-2 py-1 bg-gray-100 text-sm rounded cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    const textarea = document.querySelector("textarea");
                    if (textarea) {
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const text = textarea.value;
                      const before = text.substring(0, start);
                      const after = text.substring(end);
                      const variable = `{${v.key}}`;
                      textarea.value = before + variable + after;
                      setNewShortcut({
                        ...newShortcut,
                        content: textarea.value,
                      });
                    }
                  }}
                >
                  {v.key}
                </span>
              ))}
            </div>
          </div>

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

          <TagInput
            tags={newShortcut.tags || []}
            onAddTag={handleAddTag}
            onRemoveTag={handleRemoveTag}
            placeholder="Adicionar tags ao atalho..."
          />

          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-sm"
                disabled={newShortcut.tags?.includes(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>

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

      <div className="grid gap-4">
        {filteredShortcuts.map((shortcut) => (
          <Card key={shortcut.id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{shortcut.trigger}</h3>
                <p className="text-gray-600 mt-1">{shortcut.content}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {shortcut.categoryId && (
                    <span
                      className="px-2 py-1 text-xs rounded-full text-white"
                      style={{
                        backgroundColor: categories.find(
                          (c) => c.id === shortcut.categoryId,
                        )?.color,
                      }}
                    >
                      {
                        categories.find((c) => c.id === shortcut.categoryId)
                          ?.name
                      }
                    </span>
                  )}

                  {shortcut.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-gray-100 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <Button
                variant="destructive"
                onClick={() => removeShortcut(shortcut.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <CategoryManager />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
        <UsageHistory />
        <ShortcutStats />
        <OpenAIForm onReceiveText={handleReceiveText} />
      </div>
    </div>
  );
};

export default TextExpansionManager;
