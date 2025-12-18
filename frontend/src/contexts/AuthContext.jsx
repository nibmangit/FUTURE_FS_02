import { createContext, useState, useEffect } from 'react';
import { AUTH_KEY } from '../data/getKey';
import {MOCK_USERS} from '../data/mockUsers';
 
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(MOCK_USERS);

  useEffect(() => {(async () => { 
      const storedEmail = localStorage.getItem(AUTH_KEY);
      if (storedEmail) { 
        const userData = users.find(u => u.email === storedEmail);
        if (userData) {
          setUser({ email: userData.email, id: userData.id });
        } else { 
          localStorage.removeItem(AUTH_KEY);
        }
      }
      setLoading(false);
    })();
  }, [users]);

  const login = async (email, password) => { 
    const foundUser = users.find(
      user => user.email === email && user.password === password
    );
    
    if (foundUser) {
      const userData = { email: foundUser.email, id: foundUser.id };
      setUser(userData);
      localStorage.setItem(AUTH_KEY, email);
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (email, password) => { 
    const userExists = users.some(user => user.email === email);
    
    if (userExists) {
      return { success: false, error: 'User with this email already exists' };
    }
     
    const newUser = {
      id: users.length + 1,
      email,
      password,
    };
     
    setUsers(prev => [...prev, newUser]);
     
    const userData = { email: newUser.email, id: newUser.id };
    setUser(userData);
    localStorage.setItem(AUTH_KEY, email);
    
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};