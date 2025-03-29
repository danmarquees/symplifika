import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/Card";
import { authService } from "@/services/auth";
import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useError } from "@/context/ErrorContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const { setError } = useError(); // Using the ErrorContext

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Credenciais inválidas.");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      // Now, send the Firebase token to your backend for verification
      const firebaseToken = await user.getIdToken();
      const response = await api.post("/api/firebaseAuth/login", {
        firebaseToken,
      });
      // Handle the response from your backend (e.g., store JWT in local storage, update user state)
      console.log("Successfull: " + response);
    } catch (error: any) {
      setError(error.message || "Erro na autenticação com Google.");
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

        <Button variant="secondary" fullWidth onClick={handleGoogleSignIn}>
          Login com Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
```

Altere o authService para que ele tambem set o token e o user globalmente dentro da app

```tsx
import { useState, useEffect } from "react";
import { authService } from "../services/auth";
import api from "../services/api"; // Importe a instância do Axios configurada

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          const user = await authService.getMe();
          setAuthState({ user, token });
        } catch (error: any) {
          console.error("Invalid token:", error);
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
          setAuthState({ user: null, token: null });
        }
      }
    } catch (error) {
      console.error("checkAuth Error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setAuthState({ user: response.user, token: response.token });
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await authService.register(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setAuthState({ user: response.user, token: response.token });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete api.defaults.headers.common["Authorization"];
      setAuthState({ user: null, token: null });
    }
  };

  return {
    user: authState.user,
    token: authState.token,
    login,
    register,
    logout,
    isAuthenticated: !!authState.token,
    isLoading,
  };
};
