import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LibraryUserContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const LibraryUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('libraryToken'));

  // Configure axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('libraryToken');
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/library-users/profile`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          
          if (response.data.success) {
            setUser(response.data.data);
            setToken(storedToken);
          } else {
            localStorage.removeItem('libraryToken');
            setToken(null);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          localStorage.removeItem('libraryToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/library-users/register`, userData);
      
      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem('libraryToken', newToken);
        setToken(newToken);
        setUser(newUser);
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/library-users/login`, {
        email,
        password
      });
      
      if (response.data.success) {
        const { token: newToken, user: newUser } = response.data;
        localStorage.setItem('libraryToken', newToken);
        setToken(newToken);
        setUser(newUser);
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('libraryToken');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(
        `${API_URL}/library-users/profile`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setUser(response.data.data);
        return { success: true };
      }
      
      return { success: false, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Update failed'
      };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile
  };

  return (
    <LibraryUserContext.Provider value={value}>
      {children}
    </LibraryUserContext.Provider>
  );
};

export const useLibraryUser = () => {
  const context = useContext(LibraryUserContext);
  if (!context) {
    throw new Error('useLibraryUser must be used within LibraryUserProvider');
  }
  return context;
};
