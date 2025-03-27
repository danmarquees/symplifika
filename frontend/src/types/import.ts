import { Shortcut, Category } from "./shortcuts";

export interface ImportValidation {
  isValid: boolean;
  errors: string[];
}

export interface ImportData {
  shortcuts: Shortcut[];
  categories: Category[];
  version: string;
  exportDate: string;
}

export const validateImport = (data: any): ImportValidation => {
  const errors: string[] = [];

  if (!data) {
    errors.push("Dados inválidos");
    return { isValid: false, errors };
  }

  if (!data.version) {
    errors.push("Versão não especificada");
  }

  if (!Array.isArray(data.shortcuts)) {
    errors.push("Lista de atalhos inválida");
  }

  if (!Array.isArray(data.categories)) {
    errors.push("Lista de categorias inválida");
  }

  if (data.shortcuts) {
    data.shortcuts.forEach((shortcut: any, index: number) => {
      if (!shortcut.trigger || !shortcut.content) {
        errors.push(`Atalho ${index + 1} inválido: faltam campos obrigatórios`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
