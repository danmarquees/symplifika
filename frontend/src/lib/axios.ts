import axios from "axios";
import { config } from "@/config/env";

const axiosInstance = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar erros
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem("token");
      delete axiosInstance.defaults.headers.common["Authorization"];
      window.location.href = "/login"; // Redireciona para a página de login
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
