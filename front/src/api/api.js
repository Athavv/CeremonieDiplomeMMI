import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
        // Optional: auto logout on 401 except on login page
    }
    return Promise.reject(error);
  }
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export function getImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith("http")) return imageUrl;
  // If it's a data URL (base64)
  if (imageUrl.startsWith("data:")) return imageUrl;
  
  const baseUrl = API_BASE_URL.replace("/api", "");
  return imageUrl.startsWith("/")
    ? `${baseUrl}${imageUrl}`
    : `${baseUrl}/api/files/${imageUrl}`;
}

export default api;
