import { useState, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";
import useAuth from "./useAuth";

const useGetMoviesWithAuth = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authenticatedFetch, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        let response;

        if (isAuthenticated) {
          // Use authenticated fetch if user is logged in
          response = await authenticatedFetch(ENDPOINTS.get.GET_ALL_TITLES);
        } else {
          // Use regular fetch for public access
          response = await fetch(ENDPOINTS.get.GET_ALL_TITLES);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [isAuthenticated, authenticatedFetch]);

  // Function to refresh movies
  const refreshMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (isAuthenticated) {
        response = await authenticatedFetch(ENDPOINTS.get.GET_ALL_TITLES);
      } else {
        response = await fetch(ENDPOINTS.get.GET_ALL_TITLES);
      }

      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }

      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, error, refreshMovies };
};

export default useGetMoviesWithAuth;
