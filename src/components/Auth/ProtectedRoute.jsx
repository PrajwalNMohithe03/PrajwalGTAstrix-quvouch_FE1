import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import { ROUTES } from "../../constants";

export default function ProtectedRoute({
  children,
  allowedRole,
  allowedRoles,
  redirectTo = ROUTES.LOGIN,
  unauthorizedRedirectTo = ROUTES.UNAUTHORIZED,
}) {
  const location = useLocation();
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  const userRole = user.roles[0];
  console.log(userRole);

  const rolesToAllow =
    allowedRoles && Array.isArray(allowedRoles)
      ? allowedRoles
      : allowedRole
        ? [allowedRole]
        : null;

  if (rolesToAllow) {
    const hasAccess = rolesToAllow.includes(userRole);
    if (!hasAccess) {
      return (
        <Navigate
          to={unauthorizedRedirectTo}
          state={{ from: location }}
          replace
        />
      );
    }
  }

  return children;
}
