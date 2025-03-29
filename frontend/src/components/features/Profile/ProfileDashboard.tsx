import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/auth";

const ProfileDashboard: React.FC = () => {
  const { user, login, token } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    setSuccessMessage("");

    try {
      if (!token) {
        setError("Não autenticado. Por favor, faça login novamente.");
        return;
      }

      const updatedUser = await authService.updateProfile(profileData);

      if (updatedUser) {
        login(updatedUser.email, null);
        setSuccessMessage("Perfil atualizado com sucesso!");
      } else {
        setError("Falha ao atualizar perfil.");
      }
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar o perfil.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Perfil</h1>

      {/* Informações do Perfil */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && (
          <p className="text-green-500 mb-4">{successMessage}</p>
        )}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome:
            </label>
            <Input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <Input
              type="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio:
            </label>
            <textarea
              className="w-full p-2 border rounded-md"
              name="bio"
              value={profileData.bio}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <Button onClick={handleSubmit}>Salvar Alterações</Button>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDashboard;
