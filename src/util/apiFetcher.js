/**
 * 🌐 API FETCHER UTILITIES
 *
 * Two types of fetch functions:
 * 1. publicFetch - For public endpoints (no authentication required)
 * 2. authenticatedFetch - Use from useAuth hook (for protected endpoints)
 */

/**
 * Public API fetcher - For endpoints that don't require authentication
 * Use this for public data like movie listings, search results, etc.
 */
export const publicFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    return response;
  } catch (error) {
    console.error("❌ Public fetch error:", error);
    throw error;
  }
};

/**
 * Helper to handle API responses consistently
 */
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(errorData.message || `HTTP ${response.status}`);
  }

  const json = await response.json();

  if (!json.success) {
    throw new Error(json.message || "Request was not successful");
  }

  return json.data;
};

/**
 * Example usage patterns:
 *
 * PUBLIC ENDPOINT:
 * -----------------
 * const response = await publicFetch(ENDPOINTS.get.GET_ALL_TITLES);
 * const data = await handleApiResponse(response);
 *
 * PROTECTED ENDPOINT (in component):
 * -----------------------------------
 * const { authenticatedFetch } = useAuthContext();
 * const response = await authenticatedFetch(ENDPOINTS.get.GET_BOOKMARKS);
 * const data = await handleApiResponse(response);
 */
