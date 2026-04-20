import { createContext, useState, useEffect } from "react";
import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../api/authService";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on refresh
  useEffect(() => {
    const loadUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          setLoading(false);
          return;
        }

        const res = await getCurrentUser();
        setUser(res.data);
      } catch (error) {
        console.error("Session expired");
        localStorage.clear();
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await loginUser(email, password);

      const { access, refresh } = res.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      const userRes = await getCurrentUser();
      setUser(userRes.data);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  // SIGNUP (auto login)
  const signup = async (email, password) => {
    try {
      await registerUser(email, password);

      // auto login
      return await login(email, password);
    } catch (error) {
      return {
        success: false,
        error: "Signup failed",
      };
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};