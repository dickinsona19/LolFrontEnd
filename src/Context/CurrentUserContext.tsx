import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {checkAuth} from '../Actions/Users.js'

// Define the type for the user object
interface User {
  id: string;
  username: string;
  email: string;
  linkedAccounts: any; // Adjust this type based on your application
}

interface LoginData {
  email: string;
  password: string;
}

// Define the type for the context value
interface CurrentUserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (data: LoginData) => Promise<boolean>; // Changed here
  logout: () => void;
  error: string | null; // Error state for login attempts
}

// Create the context with a default value of undefined
const CurrentUserContext = createContext<CurrentUserContextType | undefined>(undefined);

// Create a provider component
export const CurrentUserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await checkAuth();
        if (response) {
          setCurrentUser(response);
        }
      } catch (error) {
        setError((error as Error).message);
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (data: LoginData): Promise<boolean> => {
    try {
      const response = await fetch(`http://localhost:8081/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include', // Include cookies in the request
      });
      console.log(response)
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Login failed');
      }
  
      const userData: User = await response.json();
      console.log(userData) // Adjust based on the actual response
      setCurrentUser(userData);
      setError(null); // Clear any previous error
      return true; // Indicate success
    } catch (error) {
      setError((error as Error).message);
      console.error('Login failed:', error);
      return false; // Indicate failure
    }
  };

  const logout = () => {
    setCurrentUser(null);
    // Optional: Make a call to log out on the server
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser, login, logout, error }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error('useCurrentUser must be used within a CurrentUserProvider');
  }
  return context;
};
