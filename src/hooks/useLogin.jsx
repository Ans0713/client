import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { message } from "antd";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Add useNavigate here

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.status === 200) { // Ensure the status code is 200 for successful login
        message.success(data.message);
        login(data.token, data.user); // Assuming login function handles the token
        navigate('/dashboard'); // Redirect to dashboard on successful login
      } else if (res.status === 400) {
        setError(data.message);
        message.error(data.message);
      } else {
        message.error('Login failed');
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, loginUser };
}

export default useLogin;
