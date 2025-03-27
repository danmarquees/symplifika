import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiType,
  FiSettings,
  FiUser,
  FiList,
  FiTag,
  FiDownload,
  FiBarChart2,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";

const Sidebar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login"); // Redireciona para a tela de login
    }
  };

  return (
    <div className="w-64 bg-black text-white p-4 flex flex-col h-full">
      {/* Logo e Nome */}
      <div className="mb-8">
        <h2 className="text-lg font-bold font-poppins">Symplifika</h2>
      </div>

      {/* Itens de Navegação */}
      {isAuthenticated && (
        <nav className="flex-1 space-y-2">
          <Link
            to="/"
            className="flex items-center space-x-2 p-2 rounded-md transition-all hover:bg-green-500"
          >
            <FiHome />
            <span className="font-inter">Dashboard</span>
          </Link>
          <Link
            to="/text-expansion"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiType />
            <span className="font-inter">Expansão de Texto</span>
          </Link>
          <Link
            to="/categories"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiList />
            <span className="font-inter">Categorias</span>
          </Link>
          <Link
            to="/tags"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiTag />
            <span className="font-inter">Tags</span>
          </Link>
          <Link
            to="/import-export"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiDownload />
            <span className="font-inter">Import/Export</span>
          </Link>
          <Link
            to="/stats"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiBarChart2 />
            <span className="font-inter">Estatísticas</span>
          </Link>
        </nav>
      )}

      {/* Logout */}
      {isAuthenticated && (
        <div className="border-t border-gray-700 mt-4 pt-4 space-y-2">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md w-full text-left"
          >
            <FiSettings />
            <span>Sair</span>
          </button>
          <Link
            to="/profile"
            className="flex items-center space-x-2 p-2 hover:bg-green-500 rounded-md"
          >
            <FiUser />
            <span>Perfil</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
