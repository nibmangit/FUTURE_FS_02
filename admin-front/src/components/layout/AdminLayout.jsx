import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-200">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1">
        
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6 overflow-y-auto flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}