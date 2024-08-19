import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import { useAuth } from './contexts/AuthContext';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='app'>
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to='/dashboard' /> : <Register />} 
        />
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to='/dashboard' /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} 
        />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
