import { useState, useEffect, useCallback } from "react";
import { ENDPOINTS } from "../util/endpoints";
import useAuth from "./useAuth";

const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authenticatedFetch, isAuthenticated } = useAuth();

  // Fetch all bookmarks
  const fetchBookmarks = useCallback(async () => {
    if (!isAuthenticated) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(ENDPOINTS.get.GET_BOOKMARKS);

      if (!response.ok) {
        throw new Error("Unable to fetch bookmarks");
      }

      const data = await response.json();
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch, isAuthenticated]);

  // Toggle bookmark for a specific item
  const toggleBookmark = useCallback(
    async (tconst) => {
      if (!isAuthenticated) {
        setError("User not authenticated");
        return;
      }

      try {
        const response = await authenticatedFetch(
          ENDPOINTS.post.TOGGLE_BOOKMARK(tconst),
          { method: "POST" },
          {Credential: "include"}
        );

        if (!response.ok) {
          throw new Error("Failed to toggle bookmark");
        }

        // Refresh bookmarks after toggling
        fetchBookmarks();
      } catch (err) {
        console.error("Toggle error:", err.message);
      }
    },
    [authenticatedFetch, isAuthenticated, fetchBookmarks]
  );

  // Load bookmarks on mount
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return { bookmarks, loading, error, fetchBookmarks, toggleBookmark };
};

export default useBookmarks;
