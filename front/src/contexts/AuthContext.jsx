import { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../api/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const firstLogin = localStorage.getItem('firstLogin') === 'true';
    const role = localStorage.getItem('role');
    if (token) {
      setUser({ token, firstLogin, role });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      const { token, firstLogin, role } = data;
      localStorage.setItem('token', token);
      localStorage.setItem('firstLogin', firstLogin);
      localStorage.setItem('role', role);
      setUser({ token, firstLogin, role });
      return { success: true, firstLogin };
    } catch (error) {
      console.error('Login failed', error);
      return { success: false, message: 'Invalid credentials' };
    }
  };

  const register = async (email, password, role) => {
    try {
        await authService.register(email, password, role);
        return { success: true };
    } catch (error) {
        return { success: false };
    }
  }

  const changePassword = async (newPassword) => {
    try {
      await authService.changePassword(newPassword);
      localStorage.setItem('firstLogin', 'false');
      setUser(prev => ({ ...prev, firstLogin: false }));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstLogin');
    localStorage.removeItem('role');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, changePassword, loading, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
