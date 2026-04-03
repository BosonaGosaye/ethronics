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
    
    console.log('🔍 Axios Request Interceptor:', {
      url: config.url,
      method: config.method,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : 'NO TOKEN',
      instanceToken: axiosInstance.defaults.headers.common['Authorization'] ? 'YES' : 'NO',
      globalToken: axios.defaults.headers.common['Authorization'] ? 'YES' : 'NO'
    });
    
    if (token) {
      config.headers.Authorization = token;
    } else {
      console.error('❌ NO TOKEN FOUND IN REQUEST!');
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
    console.log('🔴 Axios Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message
    });
    
    if (error.response?.status === 401) {
      console.error('❌ 401 UNAUTHORIZED - Redirecting to login');
      // Token expired or invalid - redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
