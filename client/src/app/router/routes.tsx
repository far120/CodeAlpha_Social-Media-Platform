import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

import Loader from "../../components/Feedback/Loader";

const NotFound = lazy(() => import("./NotFound"));
const HomePage = lazy(() => import("../../pages/HomePage"));
const MainLayout = lazy(
  () => import("../../components/Layout/MainLayout")
);

import Login from "../../features/auth/components/Login";
import Register from "../../features/auth/components/Register";
import Profile from "../../features/user/components/profile";
import ChangePassword from "../../features/user/components/changepassword";
import Dashboard from "../../features/user/components/dashboard";
import UserManagement from "../../features/user/components/UserManagement";
import UserActivityLogs from "../../features/logs/components/UserActivityLogs";
import UserProfile from "../../features/user/components/UserProfile";

import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    hydrateFallbackElement: <Loader />,

    children: [
      // =========================================
      // PUBLIC
      // =========================================

      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },

      // =========================================
      // PUBLIC USER PROFILE
      // =========================================

      {
        path: "/users/:userId",
        element: <UserProfile />,
      },

      // =========================================
      // AUTHENTICATED USERS
      // =========================================

      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },

          {
            path: "/change-password",
            element: <ChangePassword />,
          },
        ],
      },

      // =========================================
      // SUPER ADMIN DASHBOARD ONLY
      // =========================================

      {
        element: (
          <ProtectedRoute
            allowedRoles={[
              "super-admin",
            ]}
          />
        ),

        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },

          {
            path: "/dashboard/users",
            element: <UserManagement />,
          },

          {
            path: "/dashboard/logs",
            element: <UserActivityLogs />,
          },
        ],
      },
    ],
  },
]);