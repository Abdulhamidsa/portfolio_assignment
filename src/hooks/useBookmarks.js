import { useState, useCallback, useEffect } from "react";
import { useAuthContext } from "./useAuth";
import { ENDPOINTS } from "../util/endpoints";

const useBookmarks = () => {
  const { authenticatedFetch, isAuthenticated } = useAuthContext();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookmarks = useCallback(async () => {
    if (!isAuthenticated) {
      setBookmarks([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await authenticatedFetch(ENDPOINTS.get.GET_BOOKMARKS);

      if (!response.ok) {
        throw new Error("Failed to fetch bookmarks");
      }

      const json = await response.json();

      if (json.success) {
        setBookmarks(json.data || []);
      } else {
        throw new Error(json.message || "Failed to load bookmarks");
      }
    } catch (err) {
      console.error("❌ Fetch bookmarks error:", err);
      setError(err.message);
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  }, [authenticatedFetch, isAuthenticated]);

  const toggleBookmark = useCallback(
    async (tconst) => {
      if (!isAuthenticated) {
        throw new Error("Must be authenticated to toggle bookmarks");
      }

      try {
        setError(null);

        const response = await authenticatedFetch(ENDPOINTS.post.TOGGLE_BOOKMARK(tconst), {
          method: "POST",
        });

        if (!response.ok) {
          throw new Error("Failed to toggle bookmark");
        }

        const json = await response.json();

        if (json.success) {
          await fetchBookmarks();
          return json.data;
        } else {
          throw new Error(json.message || "Failed to toggle bookmark");
        }
      } catch (err) {
        console.error("❌ Toggle bookmark error:", err);
        setError(err.message);
        throw err;
      }
    },
    [authenticatedFetch, isAuthenticated, fetchBookmarks]
  );

  const isBookmarked = useCallback(
    (tconst) => {
      return bookmarks.some((bookmark) => bookmark.tconst === tconst);
    },
    [bookmarks]
  );

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [isAuthenticated, fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    toggleBookmark,
    isBookmarked,
  };
};

export default useBookmarks;
