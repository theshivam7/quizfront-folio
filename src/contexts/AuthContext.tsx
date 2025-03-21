
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  register: (userData: RegistrationData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize by checking local storage for the user
  useEffect(() => {
    const storedUser = localStorage.getItem('quizmaster_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('quizmaster_user');
      }
    }
    setIsLoading(false);
  }, []);

  const register = async (userData: RegistrationData): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get existing users or initialize empty array
      const existingUsers = JSON.parse(localStorage.getItem('quizmaster_users') || '[]');
      
      // Check if email already exists
      if (existingUsers.some((user: any) => user.email === userData.email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const newUser = {
        id: crypto.randomUUID(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password, // In a real app, this should be hashed
        createdAt: new Date(),
      };
      
      // Add to users array
      existingUsers.push(newUser);
      localStorage.setItem('quizmaster_users', JSON.stringify(existingUsers));
      
      // Set current user (omitting password)
      const { password, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('quizmaster_user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = JSON.parse(localStorage.getItem('quizmaster_users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }
      
      // Set current user (omitting password)
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('quizmaster_user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('quizmaster_user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isLoading,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
