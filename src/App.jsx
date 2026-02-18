import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/HomePage";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/Signup/Signup";

import SalesDashboard from "./components/dashboards/Sales/SalesDashboard";
import ClientDashboard from "./components/dashboards/Client/ClientDashboard";
import AdminDashboard from "./components/dashboards/Admin/AdminDashboard";

import CreateClient from "./components/dashboards/Sales/CreateClient";
import SalesReport from "./components/dashboards/Sales/SalesReport";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import { ROUTES, USER_ROLES } from "./constants";
import PublicRoute from "./components/Auth/PublicRoute";

export default function App() {
  const location = useLocation();

  // Public routes only
  const publicRoutes = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.UNAUTHORIZED];

  const isPublicRoute = publicRoutes.includes(location.pathname);

  return (
    <div className="App min-h-screen flex flex-col">
      {isPublicRoute && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route element={<PublicRoute />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<SignupPage />} />
          <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />
        </Route>

        {/* ================= SALES DASHBOARD ================= */}
        <Route
          path={ROUTES.SALES_DASHBOARD}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.SALE_REPRESENTATIVE}>
              <SalesDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.NEW_CLIENT}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.SALE_REPRESENTATIVE}>
              <CreateClient />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.SALES_REPORT}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.SALE_REPRESENTATIVE}>
              <SalesReport />
            </ProtectedRoute>
          }
        />

        {/* ================= CLIENT DASHBOARD ================= */}
        <Route
          path={ROUTES.CLIENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.CLIENT}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN DASHBOARD ================= */}
        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isPublicRoute && <Footer />}
    </div>
  );
}
