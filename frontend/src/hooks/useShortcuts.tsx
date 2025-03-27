import * as useShortcuts from "./useShortcuts";

const TextEditor = () => {
  const { text, handleChange } = useShortcuts.useShortcuts();

  return (
    <textarea
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      placeholder="Digite aqui..."
      className="border p-2 w-full"
    />
  );
};

export default TextEditor;
export function useShortcuts(): { text: any; handleChange: any } {
  throw new Error("Function not implemented.");
}
