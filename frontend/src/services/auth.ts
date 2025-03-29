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
      console.error("Erro no login:", error);
      let message = "Erro ao fazer login.";
      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      throw new Error(message);
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
      let message = "Erro ao criar a conta.";
      if (error.response && error.response.data && error.response.data.msg) {
        message = error.response.data.msg;
      }
      throw new Error(message);
    }
  },
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error: any) {
      console.error("Erro no logout:", error);
      throw new Error("Erro ao fazer logout.");
    }
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
  updateProfile: async (profileData: {
    name: string;
    email: string;
    bio: string;
  }): Promise<User> => {
    try {
      const response = await api.put<User>("/api/auth/profile", profileData);
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      throw new Error(error.response?.data?.msg || "Erro ao atualizar perfil.");
    }
  },
};
