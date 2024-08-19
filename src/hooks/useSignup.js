import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const useSignup = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Set initial state to false
  const navigate = useNavigate(); // Initialize useNavigate

  const registerUser = async (values) => {
    if (values.password !== values.confirmPassword) { // Ensure the field name matches
      return setError('Passwords do not match');
    }
    try {
      setError(null);
      setLoading(true); // Set loading to true when starting the request
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 201) {
        message.success(data.message);
        login(data.token, data.user);
        navigate('/dashboard'); // Redirect to the dashboard on successful registration
      } else if (res.status === 400) {
        setError(data.message);
        message.error(data.message);
      } else {
        message.error('Registration failed');
      }
    } catch (error) {
      message.error('An error occurred');
      setError(error.message);
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  return { loading, error, registerUser };
};

export default useSignup;
