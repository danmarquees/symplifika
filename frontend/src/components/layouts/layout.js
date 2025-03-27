import { FiHome, FiBarChart2, FiSettings, FiUser } from "react-icons/fi";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="text-lg font-bold text-primary">Symplifika</h2>
        <nav className="mt-4 space-y-2">
          <a href="#" className="nav-item">
            <FiHome size={20} />
            <span>Início</span>
          </a>
          <a href="#" className="nav-item">
            <FiBarChart2 size={20} />
            <span>Relatórios</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <header className="header">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex space-x-4">
            <FiUser size={24} />
            <FiSettings size={24} />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
