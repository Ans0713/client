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
import FeePaymentPage from './components/FeePayment/FeePayment';
import PayNowPage from './components/FeePayment/PayNow';
import StudentProfile from './pages/StudentProfile';
import ProfilePage from './pages/ProfilePage';
import StudentPage from './pages/Student';


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
            element={isAuthenticated ? <CoursesPage /> : <Navigate to='/login' />} 
          />
          
          <Route 
            path="/attendance" 
            element={isAuthenticated ? <Attendance /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/leave-application" 
            element={isAuthenticated ? <LeaveApplication /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/calendar" 
            element={isAuthenticated ? <CalendarPage /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/fee-payment" 
            element={isAuthenticated ? <FeePaymentPage /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/pay-now" 
            element={isAuthenticated ? <PayNowPage /> : <Navigate to='/login' />} 
          />
          <Route 
            path="/student-profile" 
            element={isAuthenticated ? <StudentProfile /> : <Navigate to='/login' />} 
          />
             <Route 
            path="/profile/:id"  // Parameterized route for ProfilePage
            element={isAuthenticated ? <ProfilePage /> : <Navigate to='/login' />} 
          />
             <Route 
            path="/student" 
            element={isAuthenticated ? <StudentPage /> : <Navigate to='/login' />} 
          />
  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
