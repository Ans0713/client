import React, { createContext, useEffect, useState, useContext } from 'react';
import axios from 'axios'; // Make sure to import axios

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user_data'));
    console.log('Stored Data:', storedData); // Debug line

    if (storedData) {
      const { userToken, user } = storedData;

      if (userToken) {
        // Assuming user information is directly available in storedData
        setToken(userToken);
        setUserData(user || null);
        setIsAuthenticated(true);
      } else {
        setToken(null);
        setUserData(null);
        setIsAuthenticated(false);
      }
    } else {
      setToken(null);
      setUserData(null);
      setIsAuthenticated(false);
    }

    // Fetch user data from API
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/current_user'); // Your API endpoint
        setUserData(response.data.user); // Set user data from the API
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    fetchUser();
  }, []);

  const login = (newToken, newData) => {
    localStorage.setItem(
      'user_data',
      JSON.stringify({ userToken: newToken, user: newData })
    );
    setToken(newToken);
    setUserData(newData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('user_data');
    setToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
