import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./features/user/pages/UserProfile";
import EditProfile from "./features/user/pages/EditProfile";
import LoginInPage from "./features/auth/pages/LoginInPage";
import RegistrationPage from "./features/auth/pages/RegistrationPage";
import UserTaskDashboard from "./features/task/pages/UserTaskDashboard";
import AdminTaskDashBoard from "./features/task/pages/AdminTaskDashBoard";
import AdminPage from "./features/admin/page/AdminPage";
import ProtectedRoute from "./ProtectedRoute"; // import your protected route
import PublicRoute from "./PublicRoute";
import Navigation from "./components/ui/Navigation";
import TaskDetails from "./features/task/pages/TaskDetails";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Routes>
  {/* Public routes */}
  <Route
    path="/"
    element={
      <PublicRoute>
        <LoginInPage />
      </PublicRoute>
    }
  />
  <Route
    path="/login"
    element={
      <PublicRoute>
        <LoginInPage />
      </PublicRoute>
    }
  />
  <Route
    path="/register"
    element={
      <PublicRoute>
        <RegistrationPage />
      </PublicRoute>
    }
  />

  {/* User routes */}
  <Route
    path="/user"
    element={
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/user/edit"
    element={
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    }
  />
  <Route
    path="/user/dashboard/:userId"
    element={
      <ProtectedRoute>
        <UserTaskDashboard />
      </ProtectedRoute>
    }
  />

  {/* Admin routes */}
  <Route
    path="/admin"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminPage />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute requiredRole="admin">
        <AdminTaskDashBoard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin/dashboard/task/:id"
    element={
      <ProtectedRoute requiredRole="admin">
        <TaskDetails />
      </ProtectedRoute>
    }
  />
</Routes>

    </Router>
  );
};

export default App;