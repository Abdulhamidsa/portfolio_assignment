// Utility functions for API handling

/**
 * Handle API response and extract data
 * @param {Response} response - Fetch response object
 * @returns {Object} - Parsed response data
 */
export const handleApiResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
  }
  return await response.json();
};

/**
 * Make an authenticated API request
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @param {string} token - Authentication token
 * @returns {Promise} - Fetch promise
 */
export const authenticatedRequest = (url, options = {}, token) => {
  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, {
    ...options,
    headers: authHeaders,
  });
};

/**
 * Create a request body for JSON APIs
 * @param {Object} data - Data to send
 * @returns {string} - JSON stringified data
 */
export const createJsonBody = (data) => {
  return JSON.stringify(data);
};

/**
 * Default fetch options for JSON APIs
 */
export const jsonApiOptions = {
  headers: {
    "Content-Type": "application/json",
  },
};
