'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, setToken, removeToken } from '@/lib/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Decode token to get user (simple, no backend call)
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setTokenState(token);
        setUser({ id: payload.userId, email: 'user@email.com', name: 'User' }); // Mock, fetch /me later
      } catch {
        removeToken();
      }
    }
    setLoading(false);
  }, []);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    setTokenState(newToken);
    setToken(newToken);
  };

  const logout = () => {
    setUser(null);
    setTokenState(null);
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
