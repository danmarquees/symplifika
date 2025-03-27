import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authService } from "@/services/auth"; // Import authService
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage(""); // Clear any previous success message

    try {
      // Implementar lógica de registro no backend
      await authService.register({ name, email, password });

      // Após o registro, faça login automaticamente
      await login(email, password);
      setSuccessMessage("Registro realizado com sucesso!"); // success message
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Erro ao criar a conta.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Criar Conta</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome:
            </label>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha:
            </label>
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button fullWidth>Criar Conta</Button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-sm text-blue-500 hover:underline">
            Já possui uma conta?
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;
