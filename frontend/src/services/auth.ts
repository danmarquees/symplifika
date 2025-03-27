import api from "./api";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        "/api/auth/login",
        credentials,
      );
      return response.data;
    } catch (error: any) {
      console.error(
        "Erro no login:",
        error.response?.data?.msg || error.message,
      );
      throw new Error(error.response?.data?.msg || "Erro ao fazer login.");
    }
  },

  register: async (userData: RegisterData): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>(
        "/api/auth/register",
        userData,
      );
      return response.data;
    } catch (error: any) {
      console.error("Erro no registro:", error);
      throw new Error(error.response?.data?.msg || "Erro ao criar conta.");
    }
  },

  logout: async (): Promise<void> => {
    // API Call de logout (se necessário)
    await api.post("/auth/logout");
  },

  getMe: async (): Promise<User> => {
    try {
      const response = await api.get<User>("/auth/me");
      return response.data;
    } catch (error: any) {
      console.error("Erro ao obter informações do usuário:", error);
      throw new Error(
        error.response?.data?.msg || "Erro ao obter informações do usuário.",
      );
    }
  },

  resetPassword: async (token: string, password: string): Promise<void> => {
    try {
      await api.post(`/auth/reset-password/${token}`, { password });
    } catch (error: any) {
      console.error("Erro ao redefinir a senha:", error);
      throw new Error(
        error.response?.data?.msg || "Erro ao redefinir a senha.",
      );
    }
  },
};
