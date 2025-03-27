import { Shortcut, Variable } from "@/types/shortcuts";

export const processVariables = (
  content: string,
  variables: Variable[],
  values: Record<string, string> = {},
) => {
  let processedContent = content;

  variables.forEach((variable) => {
    const value =
      values[variable.key] || variable.defaultValue || `[${variable.label}]`;
    processedContent = processedContent.replace(
      new RegExp(`{${variable.key}}`, "g"),
      value,
    );
  });

  return processedContent;
};

export const detectVariables = (content: string): string[] => {
  const regex = /{([^}]+)}/g;
  const matches = content.match(regex);
  return matches ? matches.map((m) => m.slice(1, -1)) : [];
};
