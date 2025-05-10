import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingPage from "./LoadingPage";

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
    return <LoadingPage />;
  }

  return <Outlet />;
}
