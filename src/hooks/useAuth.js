import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { ENDPOINTS } from "../util/endpoints";

const TOKEN_COOKIE_NAME = "auth_token";
const USER_COOKIE_NAME = "auth_user";
const COOKIE_EXPIRES_DAYS = 7; // Token expires in 7 days

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from cookies
  useEffect(() => {
    const storedToken = Cookies.get(TOKEN_COOKIE_NAME);
    const storedUser = Cookies.get(USER_COOKIE_NAME);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Error parsing stored user data:", err);
        // Clear invalid cookies
        Cookies.remove(TOKEN_COOKIE_NAME);
        Cookies.remove(USER_COOKIE_NAME);
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = useCallback(async (emailOrUsername, password) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      // Assuming the API returns { token, user } or similar structure
      const { token: authToken, user: userData } = data;

      // Store token and user data in cookies
      Cookies.set(TOKEN_COOKIE_NAME, authToken, { expires: COOKIE_EXPIRES_DAYS });
      Cookies.set(USER_COOKIE_NAME, JSON.stringify(userData), { expires: COOKIE_EXPIRES_DAYS });

      // Update state
      setToken(authToken);
      setUser(userData);

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Register function
  const register = useCallback(async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(ENDPOINTS.post.REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      // Assuming the API returns { token, user } after registration
      // If not, you might need to automatically login after registration
      const { token: authToken, user: newUser } = data;

      if (authToken && newUser) {
        // Store token and user data in cookies
        Cookies.set(TOKEN_COOKIE_NAME, authToken, { expires: COOKIE_EXPIRES_DAYS });
        Cookies.set(USER_COOKIE_NAME, JSON.stringify(newUser), { expires: COOKIE_EXPIRES_DAYS });

        // Update state
        setToken(authToken);
        setUser(newUser);
      }

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    // Remove cookies
    Cookies.remove(TOKEN_COOKIE_NAME);
    Cookies.remove(USER_COOKIE_NAME);

    // Clear state
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  // Function to make authenticated API calls
  const authenticatedFetch = useCallback(
    async (url, options = {}) => {
      if (!token) {
        throw new Error("No authentication token available");
      }

      const authHeaders = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      return fetch(url, {
        ...options,
        headers: authHeaders,
      });
    },
    [token]
  );

  // Check if user is authenticated
  const isAuthenticated = Boolean(token && user);

  // Get current user info
  const getCurrentUser = useCallback(() => {
    return user;
  }, [user]);

  // Update user data (useful for profile updates)
  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    Cookies.set(USER_COOKIE_NAME, JSON.stringify(updatedUser), { expires: COOKIE_EXPIRES_DAYS });
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    // State
    user,
    token,
    loading,
    error,
    isAuthenticated,

    // Actions
    login,
    register,
    logout,
    getCurrentUser,
    updateUser,
    clearError,
    authenticatedFetch,
  };
};

export default useAuth;
