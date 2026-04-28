export default function Navbar() {
  return (
    <div className="h-16 bg-[#0f172a] border-b border-gray-800 flex items-center justify-between px-6">
      
      {/* Page Title */}
      <h1 className="text-lg font-semibold">Dashboard</h1>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        
        {/* Profile */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-700" />
          <span className="text-sm">Admin</span>
        </div>

      </div>
    </div>
  );
}