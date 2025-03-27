import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const SettingsDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = () => {
    // Implementar lógica de atualização de senha
    console.log("Updating password:", newPassword);
    setNewPassword("");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>

      {/* Configurações da Conta */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Configurações da Conta</h2>
        <div className="space-y-4">
          {user && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome:
                </label>
                <Input type="text" value={user.name} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email:
                </label>
                <Input type="email" value={user.email} disabled />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nova Senha:
                </label>
                <Input
                  type="password"
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button onClick={handleUpdatePassword}>Atualizar Senha</Button>
              </div>
            </>
          )}
        </div>
      </Card>

      {/* Logout */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Logout</h2>
        <p className="text-sm text-gray-500 mb-4">Deseja sair da sua conta?</p>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default SettingsDashboard;
