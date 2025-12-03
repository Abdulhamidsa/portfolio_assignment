import AuthExample from "../components/AuthExample";
import { useAuthContext } from "../hooks/useAuth";

function Home() {
  const { user, isAuthenticated, loading } = useAuthContext();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div>
            <h3>Auth State</h3>
            <pre>{JSON.stringify({ user, isAuthenticated, loading }, null, 2)}</pre>
          </div>

          <AuthExample />
        </div>
      </div>
    </div>
  );
}

export default Home;
