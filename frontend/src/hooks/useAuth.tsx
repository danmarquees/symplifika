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
