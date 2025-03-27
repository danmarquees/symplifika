import React from "react";
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
import ForgotPassword from "./components/pages/ForgotPassword"; //Missing semicolon here
import ResetPassword from "./components/pages/ResetPassword"; //Missing semicolon here
import AuthLayout from "./layouts/AuthLayout"; //Missing semicolon here
import { useAuth } from "./hooks/useAuth";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  //const isAuthenticated = true; // force autentication

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

            {/* Redirecionamento para Dashboard */}
            <reactRouterDom.Route
              path="/"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <reactRouterDom.Navigate to="/login" />
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
                  <reactRouterDom.Navigate to="/login" />
                )
              }
            />
            <reactRouterDom.Route
              path="/new-shortcut"
              element={
                isAuthenticated ? (
                  <NewShortcut />
                ) : (
                  <reactRouterDom.Navigate to="/login" />
                )
              }
            />
            <reactRouterDom.Route
              path="/categories"
              element={
                isAuthenticated ? (
                  <CategoryManager />
                ) : (
                  <reactRouterDom.Navigate to="/login" />
                )
              }
            />
            <reactRouterDom.Route
              path="/import-export"
              element={
                isAuthenticated ? (
                  <ImportExportManager />
                ) : (
                  <reactRouterDom.Navigate to="/login" />
                )
              }
            />
            <reactRouterDom.Route path="/stats" element={<StatsDashboard />} />
            <reactRouterDom.Route
              path="/profile"
              element={
                isAuthenticated ? (
                  <ProfileDashboard />
                ) : (
                  <reactRouterDom.Navigate to="/login" />
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
