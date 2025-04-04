
import { Navigate } from "react-router-dom";

// This is a placeholder for actual authentication logic
// Replace this with your actual authentication check
const isAuthenticated = () => {
  // For MVP, we'll return true always to allow navigation
  // Later, implement with Supabase auth
  return true;
};

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
