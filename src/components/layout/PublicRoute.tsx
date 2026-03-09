import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated && user) {
    // Determine the redirect path based on the user's role
    const dRole = user.role?.toLowerCase() || "";
    if (dRole.includes("super")) return <Navigate to="/superadmin" replace />;
    if (dRole.includes("supervisor")) return <Navigate to="/supervisor" replace />;
    if (dRole.includes("cook")) return <Navigate to="/cook" replace />;
    if (dRole.includes("rider")) return <Navigate to="/rider" replace />;
    if (dRole.includes("refill")) return <Navigate to="/refill-coordinator" replace />;
    
    // Fallback if role doesn't match known dashboards
    return <Navigate to="/superadmin" replace />;
  }

  return <Outlet />;
};
