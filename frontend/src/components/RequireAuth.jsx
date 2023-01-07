import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequireAuth() {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
}

export default RequireAuth;
