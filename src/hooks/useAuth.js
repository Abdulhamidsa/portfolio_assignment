import { useState, useCallback, useContext, createContext, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";

export const AuthContext = createContext();

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside <AuthProvider>");
  }
  return ctx;
};

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // <--- IMPORTANT FIX
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // AUTO LOGIN ON PAGE LOAD
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch(ENDPOINTS.get.GET_CURRENT_USER, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const json = await res.json();

        if (json.success) {
          setUser(json.data);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  // LOGIN
  const login = useCallback(async (emailOrUsername, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Login failed");
      }

      const { userId, email, username } = json.data;
      setUser({ userId, email, username });
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // REGISTER
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.REGISTER, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Registration failed");
      }

      if (json.data?.userId) {
        const { userId, email, username } = json.data;
        setUser({ userId, email, username });
        setIsAuthenticated(true);
      }

      return { success: true };
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
      setUser(null);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    getCurrentUser: () => user,
    updateUser: (u) => setUser(u),
    clearError: () => setError(null),
  };
};

export default useAuth;
