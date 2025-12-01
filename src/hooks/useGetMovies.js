import { useState, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";
const useGetMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(ENDPOINTS.get.GET_ALL_TITLES);

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
  }, []);

  return { movies, loading, error };
};

export default useGetMovies;
