import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { authReady, isAuthenticated } = useAuthContext();

  if (!authReady) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
        <div className="spinner-border mb-3" role="status" />
        <h5>Verifying authentication…</h5>
        <p className="text-muted">Please wait</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
