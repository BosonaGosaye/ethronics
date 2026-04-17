import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

// Create axios instance with base URL
const axiosInstance = axios.create({
  baseURL: API_URL
});

// Add request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from the instance's own headers or from global axios defaults
    const token = axiosInstance.defaults.headers.common['Authorization'] || 
                  axios.defaults.headers.common['Authorization'];
    
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
