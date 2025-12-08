import AuthExample from "../components/Auth/Signups";
import { useAuthContext } from "../hooks/useAuth";
import Home from "./Home";

const Auth = () => {
  const { user, isAuthenticated, loading } = useAuthContext();
  console.log("🏠 Home - Auth State:", { user, isAuthenticated, loading });

  // Show loading state while checking session
  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-dark text-light">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <h5>Checking your session...</h5>
        <p className="text-muted">Please wait</p>
      </div>
    );
  }
  if (isAuthenticated) {
    return <Home />;
  }

  return (
    <>
      <AuthExample />
    </>
  );
};

export default Auth;
