import React, { useState, KeyboardEvent } from "react";
import { Input } from "./Input";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  className?: string;
  placeholder?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
  className,
  placeholder = "Adicionar tag...",
}) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      onAddTag(input.trim().toLowerCase());
      setInput("");
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      onRemoveTag(tags[tags.length - 1]);
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
          >
            #{tag}
            <button
              onClick={() => onRemoveTag(tag)}
              className="hover:text-primary/70"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="mt-2"
      />
    </div>
  );
};
