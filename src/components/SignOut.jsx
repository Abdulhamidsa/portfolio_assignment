import Button from "react-bootstrap/Button";
import { useAuth } from "../context/AuthContext";

function SignOut() {
  const { logout } = useAuth();
  return (
    <Button variant="outline-danger" onClick={logout}>
      Sign Out
    </Button>
  );
}

export default SignOut;