import React, { useState, useEffect } from "react";
import * as reactRouterDom from "react-router-dom";
import Dashboard from "./components/features/Dashboard/Dashboard";
import TextExpansionManager from "./components/features/TextExpansion/TextExpansionManager";
import Sidebar from "./components/ui/Sidebar";
import NewShortcut from "./components/features/NewShortcut/NewShortcut";
import CategoryManager from "./components/features/Categories/CategoryManager";
import TagManager from "./components/features/Tags/TagManager";
import ImportExportManager from "./components/features/ImportExport/ImportExportManager";
import StatsDashboard from "./components/features/Stats/StatsDashboard";
import SettingsDashboard from "./components/features/Settings/SettingsDashboard";
import ProfileDashboard from "./components/features/Profile/ProfileDashboard";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import AuthLayout from "./layouts/AuthLayout";
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Render loading indicator while checking authentication
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <reactRouterDom.BrowserRouter>
      <div className="flex h-screen">
        {isAuthenticated && <Sidebar />}
        <div className="flex-1 p-4">
          <reactRouterDom.Routes>
            {/* Rotas públicas */}
            <reactRouterDom.Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <reactRouterDom.Route
              path="/register"
              element={
                <AuthLayout>
                  <Register />
                </AuthLayout>
              }
            />
            <reactRouterDom.Route
              path="/forgot-password"
              element={
                <AuthLayout>
                  <ForgotPassword />
                </AuthLayout>
              }
            />
            <reactRouterDom.Route
              path="/reset-password/:token"
              element={
                <AuthLayout>
                  <ResetPassword />
                </AuthLayout>
              }
            />

            {/* Rota de redirecionamento condicional */}
            <reactRouterDom.Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />

            {/* Rotas privadas */}
            <reactRouterDom.Route
              path="/text-expansion"
              element={
                isAuthenticated ? (
                  <TextExpansionManager />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
            <reactRouterDom.Route
              path="/new-shortcut"
              element={
                isAuthenticated ? (
                  <NewShortcut />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
            <reactRouterDom.Route
              path="/categories"
              element={
                isAuthenticated ? (
                  <CategoryManager />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
            <reactRouterDom.Route
              path="/import-export"
              element={
                isAuthenticated ? (
                  <ImportExportManager />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
            <reactRouterDom.Route
              path="/stats"
              element={
                isAuthenticated ? (
                  <StatsDashboard />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
            <reactRouterDom.Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <ProfileDashboard />
                ) : (
                  <reactRouterDom.Navigate to="/login" replace />
                )
              }
            />
          </reactRouterDom.Routes>
        </div>
      </div>
    </reactRouterDom.BrowserRouter>
  );
};

export default App;
