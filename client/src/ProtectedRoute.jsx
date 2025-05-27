import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/useAuthStore"; // adjust path accordingly

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Logged in but role does not match → redirect to unauthorized or login
    return <Navigate to="/login" replace />;
    
  }

  // Authenticated and role okay → render children
  return children;
};

export default ProtectedRoute;
