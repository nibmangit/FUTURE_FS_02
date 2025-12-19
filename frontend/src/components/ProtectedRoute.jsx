import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) { 
    return <Navigate to="/authform" replace />;
  }

  return children;
}

export default ProtectedRoute;
