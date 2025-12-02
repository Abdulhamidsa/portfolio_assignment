// Using relative URLs since Vite proxy will handle routing to backend
const API_BASE_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
  post: {
    REGISTER: `${API_BASE_URL}/Auth/register`,
    LOGIN: `${API_BASE_URL}/Auth/login`,
    LOGOUT: `${API_BASE_URL}/Auth/logout`,
  },
  get: {
    GET_ALL_TITLES: `${API_BASE_URL}/Titles/all`,
    GET_TITLE_BY_ID: (id) => `${API_BASE_URL}/Titles/${id}`,
    SEARCH_TITLES: (query) => `${API_BASE_URL}/Titles/search?query=${encodeURIComponent(query)}`,
    GET_POPULAR_PEOPLE: `${API_BASE_URL}/People/popular`,
    GET_USER_BOOKMARKS: `${API_BASE_URL}/Bookmarks/user`,
    GET_CURRENT_USER: `${API_BASE_URL}/Auth/me`,
  },
};
