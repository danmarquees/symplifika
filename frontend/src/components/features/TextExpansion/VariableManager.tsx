import React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Variable } from "@/types/shortcuts";

interface VariableManagerProps {
  variables: Variable[];
  onAddVariable: (variable: Variable) => void;
  onRemoveVariable: (key: string) => void;
  onUpdateVariable: (key: string, variable: Partial<Variable>) => void;
}

const VariableManager: React.FC<VariableManagerProps> = ({
  variables,
  onAddVariable,
  onRemoveVariable,
  onUpdateVariable,
}) => {
  const [newVariable, setNewVariable] = React.useState<Partial<Variable>>({
    type: "text",
  });

  const handleAddVariable = () => {
    if (newVariable.key && newVariable.label) {
      onAddVariable(newVariable as Variable);
      setNewVariable({ type: "text" });
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Variáveis</h3>

      {/* Adicionar nova variável */}
      <div className="flex gap-2">
        <Input
          placeholder="Nome da variável (ex: nome)"
          value={newVariable.key || ""}
          onChange={(e) =>
            setNewVariable({
              ...newVariable,
              key: e.target.value,
              label:
                e.target.value.charAt(0).toUpperCase() +
                e.target.value.slice(1),
            })
          }
        />
        <select
          className="border rounded-md px-2"
          value={newVariable.type}
          onChange={(e) =>
            setNewVariable({
              ...newVariable,
              type: e.target.value as Variable["type"],
            })
          }
        >
          <option value="text">Texto</option>
          <option value="date">Data</option>
          <option value="email">Email</option>
          <option value="number">Número</option>
        </select>
        <Button onClick={handleAddVariable}>Adicionar</Button>
      </div>

      {/* Lista de variáveis */}
      <div className="space-y-2">
        {variables.map((variable) => (
          <div
            key={variable.key}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
          >
            <span className="font-mono text-sm">
              {"{"}
              {variable.key}
              {"}"}
            </span>
            <span className="text-gray-500">-</span>
            <span>{variable.label}</span>
            <span className="text-gray-500 text-sm ml-auto">
              {variable.type}
            </span>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onRemoveVariable(variable.key)}
            >
              Remover
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariableManager;
