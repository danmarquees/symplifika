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
  const { categories, addCategory, removeCategory } = useCategoryStore();
  const [newCategory, setNewCategory] = useState<Partial<Category>>({
    color: "#2563eb",
  });

  const handleAddCategory = () => {
    if (newCategory.name) {
      addCategory(newCategory as Omit<Category, "id">);
      setNewCategory({ color: "#2563eb" });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Gerenciar Categorias</h3>

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
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeCategory(category.id)}
              >
                Remover
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;
