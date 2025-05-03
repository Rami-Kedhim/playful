
import { useState } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, username: string) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  // Mock implementation for development
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  
  const login = async (email: string, password: string): Promise<void> => {
    // Mock login logic
    console.log(`Login attempt: ${email}`);
    setUser({
      id: 'user-123',
      email,
      username: email.split('@')[0],
      roles: ['client']
    });
    setIsAuthenticated(true);
  };
  
  const logout = (): void => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  const register = async (email: string, password: string, username: string): Promise<void> => {
    // Mock registration logic
    console.log(`Register attempt: ${email}, ${username}`);
    setUser({
      id: 'user-123',
      email,
      username,
      roles: ['client']
    });
    setIsAuthenticated(true);
  };
  
  return {
    user,
    isAuthenticated,
    login,
    logout,
    register
  };
};
