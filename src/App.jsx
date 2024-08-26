import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './pages/Dashboard';  // Assuming Dashboard is a .jsx or .js file
import { useAuth } from './contexts/AuthContext';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RightSide/RightSide';
import Sidebar from './components/Sidebar';
import CoursesPage from './components/Courses/Courses';
import Attendance from './components/Attendance/Attendance';
import LeaveApplication from './components/LeaveApplication/LeaveApplication';
import CalendarPage from './components/Calendar/Calendar';

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="App">
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
            element={isAuthenticated ? (
              <div className="AppGlass">
                <Sidebar />
                <MainDash />
                <RightSide />
              </div>
            ) : <Navigate to='/login' />} 
          />
          <Route 
            path="/courses" 
            element={isAuthenticated ? (
              <div className="AppGlass">
                <Sidebar />
                <CoursesPage />
              </div>
            ) : <Navigate to='/login' />} 
          />
          <Route 
            path="/attendance" 
            element={isAuthenticated ? (
              <div className="AppGlass">
                <Sidebar />
                <Attendance />
              </div>
            ) : <Navigate to='/login' />} 
          />
          <Route 
            path="/leave-application" 
            element={isAuthenticated ? (
              <div className="AppGlass">
                <Sidebar />
                <LeaveApplication />
              </div>
            ) : <Navigate to='/login' />} 
          />
          <Route 
            path="/calendar" 
            element={isAuthenticated ? (
              <div className="AppGlass">
                <Sidebar />
                <CalendarPage />
              </div>
            ) : <Navigate to='/login' />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
