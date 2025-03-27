import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useTagStore } from "@/store/tagStore";
import { cn } from "@/lib/utils";

const TagManager: React.FC = () => {
  const { popularTags, addPopularTag, removePopularTag } = useTagStore();
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      addPopularTag(newTag.trim().toLowerCase());
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    removePopularTag(tag);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Tags</h1>

      {/* Adicionar Nova Tag */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Adicionar Nova Tag</h2>
        <div className="flex gap-4">
          <Input
            placeholder="Nome da tag (ex: importante)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <Button onClick={handleAddTag}>Adicionar Tag</Button>
        </div>
      </Card>

      {/* Lista de Tags Populares */}
      <div className="grid gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold mb-4">Tags Populares</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-2 py-1 rounded-md text-sm",
                  "bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer",
                )}
                onClick={() => handleRemoveTag(tag)}
              >
                #{tag}
              </span>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TagManager;
