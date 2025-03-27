import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      // Implementar a lógica para redefinir a senha no backend
      // const response = await authService.resetPassword(token, password);
      setMessage("Sua senha foi redefinida com sucesso!");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Erro ao redefinir a senha.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Redefinir Senha</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nova Senha:
            </label>
            <Input
              type="password"
              placeholder="Digite sua nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirmar Senha:
            </label>
            <Input
              type="password"
              placeholder="Confirme sua nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button fullWidth>Redefinir Senha</Button>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
