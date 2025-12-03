import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // If no user, redirect to Sign In
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;