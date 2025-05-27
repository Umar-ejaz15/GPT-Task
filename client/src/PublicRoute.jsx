import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated) {
    // Redirect based on role or default dashboard
    if (user?.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    else return <Navigate to={`/user/dashboard/${user.id}`} replace />;
  }

  return children;
};

export default PublicRoute;
