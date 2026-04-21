import { Navigate } from "react-router-dom";
import {Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 🧠 WAIT until auth finishes loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <Loader2 className="animate-spin text-cyan-400" />
      </div>
    );
  } 

  if (!user) {
    return <Navigate to="/authform" replace />;
  }

  return children;
}

export default ProtectedRoute;