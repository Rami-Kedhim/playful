
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import Escorts from "@/pages/Escorts";
import EscortDetail from "@/pages/EscortDetail";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/Dashboard";
import ProfileSettings from "@/pages/dashboard/ProfileSettings";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/components/auth/PrivateRoute";
import Home from "@/pages/Home";
import { Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout><Outlet /></MainLayout>,
    children: [
      { index: true, element: <Home /> },
      { path: "escorts", element: <Escorts /> },
      { path: "escorts/:id", element: <EscortDetail /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><MainLayout><Outlet /></MainLayout></PrivateRoute>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <ProfileSettings /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
