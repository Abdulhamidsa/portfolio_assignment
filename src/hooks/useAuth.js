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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authReady, setAuthReady] = useState(false);

  // This is SAFE because we never store sensitive data in localStorage/sessionStorage
  // The backend validates the httpOnly cookie which JS cannot access
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);

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
        console.log("Session check - Current user:", json);

        if (json.success && json.data) {
          setUser(json.data);
          setIsAuthenticated(true);
          console.log("Session valid - User is authenticated");
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (err) {
        setIsAuthenticated(false);
        setUser(null);
        console.error("Session check failed:", err);
      } finally {
        setLoading(false);
        setAuthReady(true);
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

  // LOGOUT
  const logout = useCallback(async () => {
    try {
      await fetch(ENDPOINTS.post.LOGOUT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.warn("Logout request failed:", err.message);
    }

    // Clear local auth state
    setUser(null);
    setError(null);
    setIsAuthenticated(false);
  }, []);

  // AUTHENTICATED FETCH - wrapper for API calls with credentials
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    // Auto-logout on 401
    if (res.status === 401) {
      setUser(null);
      setIsAuthenticated(false);
    }

    return res;
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    authReady,
    login,
    register,
    logout,
    authenticatedFetch,
    getCurrentUser: () => user,
    updateUser: (u) => setUser(u),
    clearError: () => setError(null),
  };
};

export default useAuth;
