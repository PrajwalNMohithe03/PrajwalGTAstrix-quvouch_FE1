import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { ROUTES } from "../../constants";

export default function PublicRoute({
  children,
  redirectTo = ROUTES.ADMIN_DASHBOARD,
}) {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  return !user ? (
    <Outlet />
  ) : loading ? (
    <Loading />
  ) : (
    <Navigate to={redirectTo} state={{ from: location }} replace />
  );
}
