import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refreshThunk } from "./features/auth/authSlice";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/HomePage";
import Footer from "./components/Footer/Footer";
import SignupPage from "./components/Signup/Signup";

import SalesDashboard from "./components/dashboards/Sales/SalesDashboard";
import ClientDashboard from "./components/dashboards/Client/ClientDashboard";
import AdminDashboard from "./components/dashboards/Admin/AdminDashboard";

import CreateClient from "./components/dashboards/Sales/CreateClient";
import SalesReport from "./components/dashboards/Sales/SalesReport";
import RegisterUser from "./components/dashboards/Sales/ClientRegister";

import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import { ROUTES, USER_ROLES } from "./constants";

import CustomerDashboard from "./components/Pages/customer/CustomerDashboard";
import CustomerReview from "./components/Pages/customer/CustomerReview";
import BusinessDetails from "./components/Pages/BusinessDetails";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  const shouldShowNavbar =
    location.pathname === ROUTES.HOME ||
    location.pathname.startsWith("/business");

  return (
    <div className="App min-h-screen flex flex-col">

      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<SignupPage />} />
        <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} />

        <Route path="/business/:id" element={<BusinessDetails />} />

        <Route path={ROUTES.CUSTOMER} element={<CustomerDashboard />} />
        <Route
          path={ROUTES.CUSTOMER_REVIEW}
          element={<CustomerReview />}
        />

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
  path="/register"
  element={
    <ProtectedRoute allowedRole={USER_ROLES.SALE_REPRESENTATIVE}>
      <RegisterUser />
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

        <Route
          path={ROUTES.CLIENT_DASHBOARD}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.CLIENT}>
              <ClientDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.ADMIN_DASHBOARD}
          element={
            <ProtectedRoute allowedRole={USER_ROLES.ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {shouldShowNavbar && <Footer />}

    </div>
  );
}
