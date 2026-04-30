import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, getCurrentUser } from "../api/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This stores {email, role, id}
  const [loading, setLoading] = useState(true);

  // Function to fetch details using the stored token
  const fetchProfile = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data); // Set the admin data from /users/me/
    } catch (err) {
      localStorage.clear();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // On refresh, check if we are already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) fetchProfile();
    else setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    localStorage.setItem("accessToken", res.data.access);
    localStorage.setItem("refreshToken", res.data.refresh);
    await fetchProfile(); 
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);