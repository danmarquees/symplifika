export interface Category {
  id: string;
  name: string;
  color?: string;
  description?: string;
}

export interface Variable {
  key: string;
  label: string;
  type: "text" | "date" | "email" | "number";
  defaultValue?: string;
}

export interface Shortcut {
  id: string;
  trigger: string;
  content: string;
  variables: Variable[];
  categoryId?: string;
  tags?: string[];
  usageCount: number; // Contador de uso
  lastUsedAt?: string; // Última vez usado
}
