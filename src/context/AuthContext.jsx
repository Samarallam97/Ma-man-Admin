import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from "../api/client.js";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const decodeUserFromToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      // Check if token is expired
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decoded.exp < currentTime) {
        console.error('Token is expired');
        return null;
      }
      return {
        id: decoded.id,
        email: decoded.email,
        dailyUsageLimit: decoded.dailyUsageLimit,
        dailyUsageToday: decoded.dailyUsageToday,
        lastAccessDate: decoded.lastAccessDate,
        profilePictureUrl: decoded.profilePictureUrl,
        role: decoded.role,
      };
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post('/auth/login', credentials);
      const token = res.data.accessToken;
      const user = decodeUserFromToken(token);

      if (!user) {
        throw new Error('Invalid or expired token');
      }

      if (['parent', 'root-admin'].includes(user.role)) {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', user.id); // Fixed: Use user.id instead of decoded.id
        setUser(user);
        toast.success('Login successful!'); // Add success toast for admin
      } else {
        throw new Error('Access denied: Admin role required');
      }
    } catch (err) {
      console.error('Login error:', err);
      throw err; // Propagate error to the Login component
    }
  };

  const logout = async () => {
    localStorage.clear();
    setUser(null);
    toast.info('Logged out successfully');
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decodedUser = decodeUserFromToken(token);
      if (decodedUser) {
        setUser(decodedUser);
      } else {
        // Clear invalid/expired token
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        toast.error('Session expired. Please log in again.');
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);