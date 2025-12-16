import { useState, useEffect } from "react";
import { ENDPOINTS } from "../util/endpoints";
import { useAuthContext } from "./useAuth";

const useSearchTitles = (q) => {
  const { authenticatedFetch, isAuthenticated, authReady } = useAuthContext();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!q || q.trim() === "") {
      setResults([]);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await authenticatedFetch(ENDPOINTS.get.SEARCH_TITLES(q));

        if (!res.ok) {
          throw new Error("Failed to search titles");
        }

        const json = await res.json();
        setResults(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [q, authReady, isAuthenticated, authenticatedFetch]);

  return { results, loading, error };
};

export default useSearchTitles;
