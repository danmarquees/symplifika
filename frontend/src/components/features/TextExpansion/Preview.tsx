import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Shortcut } from "@/types/shortcuts";
import { processVariables } from "@/utils/textExpansion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PreviewProps {
  shortcut: Partial<Shortcut>;
}

const Preview: React.FC<PreviewProps> = ({ shortcut }) => {
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    {},
  );

  const processedContent =
    shortcut.content && shortcut.variables
      ? processVariables(shortcut.content, shortcut.variables, variableValues)
      : shortcut.content;

  return (
    <Card className="p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-2">Prévia</h3>

      {shortcut.variables && shortcut.variables.length > 0 && (
        <div className="mb-4 space-y-2">
          {shortcut.variables.map((variable) => (
            <Input
              key={variable.key}
              placeholder={variable.label}
              value={variableValues[variable.key] || ""}
              onChange={(e) =>
                setVariableValues({
                  ...variableValues,
                  [variable.key]: e.target.value,
                })
              }
            />
          ))}
        </div>
      )}

      <div className="prose prose-sm bg-gray-50 p-3 rounded">
        {processedContent ? (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {processedContent}
          </ReactMarkdown>
        ) : (
          <span className="text-gray-400">
            Digite algo para ver a prévia...
          </span>
        )}
      </div>
    </Card>
  );
};

export default Preview;
