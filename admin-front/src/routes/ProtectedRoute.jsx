import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
 
  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="relative"> 
          <div className="absolute inset-0 bg-blue-500/20 blur-[50px] rounded-full animate-pulse" /> 
          <div className="relative w-12 h-12 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }
 
  if (!user) {
    return <Navigate to="/" replace />;
  }
 
  return <Outlet />;
};

export default ProtectedRoute;