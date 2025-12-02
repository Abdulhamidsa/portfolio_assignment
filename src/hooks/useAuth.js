import { useState, useCallback, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // start true so we check /me first
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(ENDPOINTS.get.GET_CURRENT_USER, {
        credentials: "include",
      });

      if (res.ok) {
        const json = await res.json();
        setUser(json.data);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔁 Run once when app loads
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🔐 Login
  const login = useCallback(async (emailOrUsername, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Login failed");
      }

      console.log("Login response data:", json.data);

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

  // 🧾 Register
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.REGISTER, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.message || "Registration failed");
      }

      if (json.data && json.data.userId) {
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

  // 🚪 Logout
  const logout = useCallback(async () => {
    try {
      await fetch(ENDPOINTS.post.LOGOUT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch {
      error;
    }

    setUser(null);
    setError(null);
    setIsAuthenticated(false);
  }, []);

  // 🌐 API fetch wrapper with auto-logout on expired cookie
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    if (res.status === 401) {
      // token expired or invalid
      setUser(null);
      setIsAuthenticated(false);
    }

    return res;
  }, []);

  const getCurrentUser = useCallback(() => user, [user]);
  const updateUser = useCallback((u) => setUser(u), []);
  const clearError = useCallback(() => setError(null), []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    authenticatedFetch,
    getCurrentUser,
    updateUser,
    clearError,
  };
};

export default useAuth;
