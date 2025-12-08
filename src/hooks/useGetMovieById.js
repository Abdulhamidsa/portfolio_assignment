import { useState, useEffect } from "react";

const useGetMovieById = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/Titles/${movieId}/basic`);
        if (!response.ok) throw new Error("Failed to fetch movie");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};

export default useGetMovieById;
