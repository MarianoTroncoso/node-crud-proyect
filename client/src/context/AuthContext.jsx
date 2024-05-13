import { createContext, useState } from 'react';
import { registerRequest } from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
