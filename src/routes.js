import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
import DashboardApp from "./pages/DashboardApp";
import User from "./pages/User";
import Order from "./pages/Order";
import NotFound from "./pages/Page404";
import Profile from "./pages/Profile";
import UserDetail from "./pages/UserDetail";
import OrderDetail from "./pages/OrderDetail";
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import ProductList from "./pages/ProductList";

import RequireAuth from "./components/authentication/RequireAuth";
import RequireSignOut from "./components/authentication/RequireSignOut";
import ProductDetail from "./pages/ProductDetail";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: "app",
          element: <DashboardApp />,
        },
        { path: "orders",
element: <Order /> },
        { path: "analytics",
element: <DashboardApp /> },
        { path: "users",
element: <User /> },
        { path: "profile",
element: <Profile /> },
        { path: "products",
element: <ProductList /> },
        { path: "products/list",
element: <ProductList /> },
        { path: "products/create-product",
element: <CreateProduct /> },
        { path: "products/:productId",
element: <ProductDetail /> },
        { path: "users/:userId",
element: <UserDetail /> },
        { path: "orders/:orderId",
element: <OrderDetail /> },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "/",
          element: (
            <RequireSignOut>
              <HomePage />
            </RequireSignOut>
          ),
        },
        {
          path: "login",
          element: (
            <RequireSignOut>
              <Login />
            </RequireSignOut>
          ),
        },
        {
          path: "signup",
          element: (
            <RequireSignOut>
              <Register />
            </RequireSignOut>
          ),
        },
        {
          path: "404",
          element: <NotFound />,
        },
        {
          path: "*",
          element: <Navigate to="/404" />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
