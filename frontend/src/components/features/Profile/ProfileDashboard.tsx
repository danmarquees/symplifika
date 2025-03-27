import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

const ProfileDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Implementar lógica de envio dos dados de perfil para o backend
    console.log("Submitting profile data:", profileData);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Perfil</h1>

      {/* Informações do Perfil */}
      <Card className="mb-6 p-4">
        <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>
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
