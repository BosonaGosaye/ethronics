import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Start with light mode by default
  const [isDark, setIsDark] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      
      if (saved) {
        const isDarkSaved = saved === 'dark';
        setIsDark(isDarkSaved);
      } else {
        // Default to light mode instead of system preference
        setIsDark(false);
        localStorage.setItem('theme', 'light');
      }
      
      setIsInitialized(true);
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    if (isInitialized) {
      const root = document.documentElement;
      
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  }, [isDark, isInitialized]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const setTheme = (theme) => {
    setIsDark(theme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{
      isDark,
      theme: isDark ? 'dark' : 'light',
      toggleTheme,
      setTheme,
      isInitialized
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;