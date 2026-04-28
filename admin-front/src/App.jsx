import AppRoutes from "./routes/AppRoutes";
import AdminLayout from "./components/layout/AdminLayout";

function App() {
  return (
    <AdminLayout>
        <AppRoutes />
    </AdminLayout>

  );
}

export default App;