// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import UserService from './components/service/UserService';

type AuthContextType = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
  const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

  const login = () => {
    setIsAuthenticated(true);
    setIsAdmin(UserService.isAdmin());
  };

  const logout = () => {
    UserService.logout();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // In case tokens are changed in other tabs or reload
  useEffect(() => {
    const onStorage = () => {
      setIsAuthenticated(UserService.isAuthenticated());
      setIsAdmin(UserService.isAdmin());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
