import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { authService } from "@/services/auth"; // Import authService
import { useError } from "@/context/ErrorContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setError, error } = useError(); // Use setError from context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Usando setError do contexto
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Credenciais inválidas."); // Usando setError do contexto
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {/* Display the error message */}
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
          <Button fullWidth>Login</Button>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline"
          >
            Criar uma conta
          </Link>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Esqueceu sua senha?
          </Link>
        </div>

        {/* <Button variant="secondary" fullWidth onClick={handleGoogleSignIn}>
          Login com Google
        </Button> */}
      </Card>
    </div>
  );
};

export default Login;
