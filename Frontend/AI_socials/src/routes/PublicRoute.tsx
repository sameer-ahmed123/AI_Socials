import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../components/common/loadingScreen/LoadingScreen";

interface PublicRouteProps {
  children: React.ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
