import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Category } from "@/types/shortcuts";
import { useCategoryStore } from "@/store/categoryStore";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  const colors = [
    "#2563eb",
    "#16a34a",
    "#dc2626",
    "#9333ea",
    "#ea580c",
    "#0d9488",
    "#4f46e5",
    "#0369a1",
  ];

  return (
    <div className="flex gap-2">
      {colors.map((color) => (
        <button
          key={color}
          className={`w-6 h-6 rounded-full ${
            color === value ? "ring-2 ring-offset-2 ring-gray-400" : ""
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
};

const CategoryManager: React.FC = () => {
  const { categories, addCategory, removeCategory, updateCategory } =
    useCategoryStore();
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    color: "#2563eb",
  });
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  const handleAddCategory = () => {
    if (newCategory.name) {
      addCategory(newCategory as Omit<Category, "id">);
      setNewCategory({ color: "#2563eb" });
    }
  };

  const handleStartEdit = (id: string) => {
    setEditingCategory(id);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  const handleUpdateCategory = (
    category: Category,
    updatedCategory: Partial<Category>,
  ) => {
    updateCategory(category.id, updatedCategory);
    setEditingCategory(null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Categorias</h1>

      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Adicionar Nova Categoria</h2>

        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Nome da categoria"
              value={newCategory.name || ""}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <Input
              placeholder="Descrição"
              value={newCategory.description || ""}
              onChange={(e) =>
                setNewCategory({ ...newCategory, description: e.target.value })
              }
            />
          </div>

          <div className="flex items-center gap-4">
            <ColorPicker
              value={newCategory.color || "#2563eb"}
              onChange={(color) => setNewCategory({ ...newCategory, color })}
            />
            <Button onClick={handleAddCategory}>Adicionar Categoria</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-4">
            {editingCategory === category.id ? (
              <div className="space-y-2">
                <Input
                  placeholder="Nome da categoria"
                  value={category.name}
                  onChange={(e) =>
                    updateCategory(category.id, { name: e.target.value })
                  }
                />
                <Input
                  placeholder="Descrição"
                  value={category.description || ""}
                  onChange={(e) =>
                    updateCategory(category.id, { description: e.target.value })
                  }
                />
                <div className="flex items-center gap-4">
                  <ColorPicker
                    value={category.color || "#2563eb"}
                    onChange={(color) => updateCategory(category.id, { color })}
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        handleUpdateCategory(category, {
                          name: category.name,
                          description: category.description,
                          color: category.color,
                        })
                      }
                    >
                      Salvar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <div className="flex-1">
                  <h4 className="font-medium">{category.name}</h4>
                  {category.description && (
                    <p className="text-sm text-gray-500">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStartEdit(category.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeCategory(category.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
