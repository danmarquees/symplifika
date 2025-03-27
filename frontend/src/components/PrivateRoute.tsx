import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element,
  path,
  children,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirecionar para a página de login
    return <Navigate to="/login" replace />;
  }

  return (
    <Route path={path} element={element}>
      {children}
    </Route>
  );
};

export default PrivateRoute;
