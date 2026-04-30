import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="h-20 bg-[#020617]/40 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-20"> 
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">System Overview</p>
      </div>

      <div className="flex items-center gap-4"> 
        <button className="relative p-2.5 cursor-pointer rounded-xl bg-slate-900/50 border border-slate-800/50 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all group">
          <Bell size={20} /> 
          <span className="absolute top-2 right-2 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
        </button>
 
        <div className="h-8 w-px bg-slate-800/50 mx-2" />

        {/* User Profile & Logout Section */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200">
              {user?.email ? user.email.split('@')[0] : "Admin"}
            </p>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">
              {user?.role || "Manager"}
            </p>
          </div>
           
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 border border-white/10 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-bold text-sm">
            {user?.email?.charAt(0) || "N"}
          </div>
 
          <button 
            onClick={logout}
            className="ml-2 p-2.5 cursor-pointer rounded-xl bg-red-500/5 border border-red-500/10 text-red-500/70 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}