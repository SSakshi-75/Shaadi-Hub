import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const signup = async (userData) => {
    const { data } = await api.post('/auth/register', userData);
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const googleLogin = async (idToken, role) => {
    const { data } = await api.post('/auth/google-login', { idToken, role });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, googleLogin, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
