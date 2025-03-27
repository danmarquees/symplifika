import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`sidebar ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        {!isCollapsed && <h2 className="text-lg font-bold">Symplifika</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <FiMenu size={24} />
        </button>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/" className="nav-item">
              {!isCollapsed && "Dashboard"}
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-item">
              {!isCollapsed && "Configurações"}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
