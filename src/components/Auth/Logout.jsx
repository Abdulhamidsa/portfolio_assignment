import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  useEffect(() => {
    const run = async () => {
      await logout();
      navigate("/signin", { replace: true });
    };

    run();
  }, [logout, navigate]);

  return null;
};

export default Logout;
