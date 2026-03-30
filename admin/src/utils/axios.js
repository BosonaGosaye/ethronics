import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL
});

// Add request interceptor to include auth token from axios defaults
// Token will be set by AuthContext after login
axiosInstance.interceptors.request.use(
  (config) => {
    // Token is set in axios.defaults.headers.common by AuthContext
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
