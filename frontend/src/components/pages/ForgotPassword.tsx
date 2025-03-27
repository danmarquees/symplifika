import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      // Implementar a lógica para solicitar a redefinição de senha
      // const response = await authService.forgotPassword(email);
      setMessage(
        "Um email com instruções para redefinir sua senha foi enviado.",
      );
    } catch (err: any) {
      setError(err.message || "Erro ao enviar email de recuperação.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Esqueceu sua senha?</h2>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <Input
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <Button fullWidth>Enviar Email de Recuperação</Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Voltar ao Login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default ForgotPassword;
