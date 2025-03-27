import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import api from "@/services/api";

interface OpenAIFormProps {
  onReceiveText: (text: string) => void;
}

const OpenAIForm: React.FC<OpenAIFormProps> = ({ onReceiveText }) => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<{ text: string }>(
        "/api/openai/generate",
        {
          prompt: prompt,
        },
      );
      onReceiveText(response.data.text);
    } catch (error: any) {
      setError(error.response?.data?.msg || "Erro ao gerar texto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Gerar Texto com OpenAI</h3>
      <div className="space-y-4">
        <Input
          placeholder="Digite seu prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Gerando..." : "Gerar"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </Card>
  );
};

export default OpenAIForm;
