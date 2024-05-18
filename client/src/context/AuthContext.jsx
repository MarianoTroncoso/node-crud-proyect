import { createContext, useState, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';
import { TOKEN_COOKIE_NAME } from '../../../src/controllers/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);

      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (errors) {
      if (Array.isArray(errors.response.data)) {
        return setErrors(errors.response.data);
      }

      setErrors([errors.response.data.error]);
    }
  };

  const logout = () => {
    Cookies.remove(TOKEN_COOKIE_NAME);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      const tokenCokie = cookies[TOKEN_COOKIE_NAME];

      if (!tokenCokie) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(tokenCokie);

        if (!res.data) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        setUser(res.data);
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        isAuthenticated,
        errors,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
