// Using relative URLs since Vite proxy will handle routing to backend
const API_BASE_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  post: {
    REGISTER: `${API_BASE_URL}/Auth/register`,
    LOGIN: `${API_BASE_URL}/Auth/login`,
    LOGOUT: `${API_BASE_URL}/Auth/logout`,
    TOGGLE_BOOKMARK: (tconst) => `${API_BASE_URL}/Bookmarks/toggle/${tconst}`,
  },
  get: {
    GET_ALL_TITLES: `${API_BASE_URL}/Titles/all`,
    GET_TITLE_BY_ID: (id) => `${API_BASE_URL}/Titles/${id}`,
    SEARCH_TITLES: (query) => `${API_BASE_URL}/Titles/search?query=${encodeURIComponent(query)}`,
    GET_POPULAR_PEOPLE: `${API_BASE_URL}/People/popular`,
<<<<<<< HEAD
    GET_PERSON_BY_ID: (nconst) => `${API_BASE_URL}/People/${nconst}`,
=======
    GET_BOOKMARKS: `${API_BASE_URL}/Bookmarks`,
    GET_CURRENT_USER: `${API_BASE_URL}/Auth/me`,
>>>>>>> a0d306ec3baeeb1cce7266bdbfbbb8d10db0bd47
  },
};
