import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';
import Attendence from './pages/Attendence'; 
import Leave from './pages/Leave'; 
import { useAuth } from './contexts/AuthContext';
import AdminPortal from './pages/AdminPortal';
import CoursesPage from './pages/Courses';
import Timetable from './pages/TimeTable'; // Import Timetable component

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to='/dashboard' /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/register" 
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
          <Route 
            path="/admin-portal" 
            element={isAuthenticated ? <AdminPortal /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/attendance" 
            element={isAuthenticated ? <Attendence /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/leave" 
            element={isAuthenticated ? <Leave /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/courses" 
            element={isAuthenticated ? <CoursesPage /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/timetable" 
            element={isAuthenticated ? <Timetable /> : <Navigate to='/login' />} 
          /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
