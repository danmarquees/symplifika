import { useState, useEffect } from "react";
import { authService } from "../services/auth";
import api from "../services/api"; // Importe a instância do Axios configurada
import { useError } from "@/context/ErrorContext";

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
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
  const { setError } = useError(); // Using ErrorContext

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
          setError("Sessão expirada. Por favor, faça login novamente.");
          localStorage.removeItem("token");
          delete api.defaults.headers.common["Authorization"];
          setAuthState({ user: null, token: null });
        }
      }
    } catch (error) {
      console.error("checkAuth Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null); // Clear any previous errors
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setAuthState({ user: response.user, token: response.token });
      return response.user; // Return the user object on successful login
    } catch (error: any) {
      console.error("Login failed:", error);
      setError(error.message || "Credenciais inválidas.");
      throw error;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError(null); // Clear any previous errors

    try {
      const response = await authService.register(userData);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      api.defaults.headers.common["Authorization"] = `Bearer ${response.token}`;
      setAuthState({ user: response.user, token: response.token });
      return response.user; // Return the user object on successful registration
    } catch (error: any) {
      console.error("Registration failed:", error);
      setError(error.message || "Erro ao criar a conta.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error: any) {
      console.error("Logout failed:", error);
      setError(error.message || "Erro ao fazer logout.");
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
