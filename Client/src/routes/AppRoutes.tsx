import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import ChatbotPage from "../pages/chatbot/ChatbotPage";
import UserManagement from "../pages/users/UserManagement";
import RoleManagement from "../pages/roles/RoleManagement";
import PermissionManagement from "../pages/permissions/PermissionManagement";
import RoleRoute from "./RoleRoute";
import Unauthorized from "../pages/Unauthorized";
import ProfilePage from "../pages/profile/ProfilePage";
import UserDashboard from "../pages/userDashboard/UserDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/profile" element={<ProfilePage/>}/>

          <Route
            path="/users"
            element={
              <RoleRoute allowedRoels={["admin", "manager"]}>
                <UserManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/roles"
            element={
              <RoleRoute allowedRoels={["admin"]}>
                <RoleManagement />
              </RoleRoute>
            }
          />
          <Route
            path="/permissions"
            element={
              <RoleRoute allowedRoels={["admin"]}>
                <PermissionManagement />
              </RoleRoute>
            }
          />
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
