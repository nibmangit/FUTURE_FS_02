import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AdminLayout from "./components/layout/AdminLayout";
 
function AppContent() {
  const location = useLocation();
   
  const isLoginPage = location.pathname === "/";

  if (isLoginPage) {
    return <AppRoutes />; 
  }

  return (
    <AdminLayout>
      <AppRoutes /> 
    </AdminLayout>
  );
}

function App() {
  return ( <AppContent /> );
}

export default App;