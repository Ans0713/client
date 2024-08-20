import React, { createContext, useEffect, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      const storedData = JSON.parse(localStorage.getItem('user_data'));
      console.log('Stored Data:', storedData); // Debug line

      if (storedData) {
        const { userToken } = storedData;

        if (userToken) {
          try {
            // Dynamically import jwt-decode
            const jwtDecode = (await import('jwt-decode')).default;
            // Decode the token to extract user data
            const decodedToken = jwtDecode(userToken);
            console.log('Decoded Token:', decodedToken); // Debug line

            const user = {
              name: decodedToken.name, // Example field from token payload
              email: decodedToken.email, // Example field from token payload
              role: decodedToken.role  // Example field from token payload
            };

            setToken(userToken);
            setUserData(user);
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error decoding token:', error); // Handle decoding errors
            setToken(null);
            setUserData(null);
            setIsAuthenticated(false);
          }
        } else {
          setToken(null);
          setUserData(null);
          setIsAuthenticated(false);
        }
      }
    };

    fetchTokenData();
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
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout, userData }}>
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
