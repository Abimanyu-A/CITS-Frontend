import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { user, firstLogin } = useSelector((state) => state.auth);
  const { employee } = useSelector((state) => state.emp);
  const location = useLocation();

  const isOnProfileUpdatePage = location.pathname === "/profile-update";

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (firstLogin && !isOnProfileUpdatePage) {
    return <Navigate to="/profile-update" />;
  }

  if (!employee) {
    return <div>Loading employee data...</div>;
  }

  return <Outlet />;
}
