import { useLocation } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import AdminLayout from "./components/layout/AdminLayout";
import { Toaster } from "react-hot-toast";
 
function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const toastStyle = {
    background: "rgba(2, 6, 23, 0.8)",
    backdropFilter: "blur(12px)",
    color: "#cbd5e1",
    border: "1px solid rgba(30, 41, 59, 0.5)",
    borderRadius: "16px",
    padding: "12px 20px",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ 
          duration: 4000,
          style: toastStyle,
           
          success: {
            iconTheme: {
              primary: "#10b981", // Emerald-500
              secondary: "#fff",
            },
            style: {
              ...toastStyle,
              border: "1px solid rgba(16, 185, 129, 0.2)", // Subtle green glow
            },
          },
 
          error: {
            iconTheme: {
              primary: "#ef4444", // Red-500
              secondary: "#fff",
            },
            style: {
              ...toastStyle,
              border: "1px solid rgba(239, 68, 68, 0.2)", // Subtle red glow
            },
          },
        }}
      />

      {isLoginPage ? (
        <AppRoutes />
      ) : (
        <AdminLayout>
          <AppRoutes />
        </AdminLayout>
      )}
    </>
  );
}

function App() {
  return <AppContent />;
}

export default App;