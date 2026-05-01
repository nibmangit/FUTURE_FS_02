import { Bell, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useHeader } from "../../context/HeaderContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { title, subtitle, action } = useHeader(); 

  return ( 
    <div className="h-16 bg-[#020617]/60 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-6 sticky top-0 z-20"> 
       
      <div className="flex flex-col justify-center">
        <h1 className="text-lg font-bold tracking-tight text-white leading-tight">
          {title}
        </h1>
        <p className="text-[10px] text-slate-500 font-bold tracking-[0.15em] leading-tight">
          {subtitle}
        </p>
      </div>
 
      <div className="flex items-center gap-3"> 
        {action && (
          <div className="hidden md:flex items-center mr-2 animate-in fade-in slide-in-from-right-4 duration-300">
            {action}
          </div>
        )}

        {/* Notifications */}
        <button className="relative p-2 cursor-pointer rounded-lg bg-slate-900/50 border border-slate-800/50 text-slate-400 hover:text-blue-400 hover:border-blue-500/30 transition-all">
          <Bell size={18} /> 
          <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500"></span>
          </span>
        </button>
 
        <div className="h-6 w-px bg-slate-800/50 mx-1" />

        {/* User Profile Section */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold text-slate-200 leading-none mb-1">
              {user?.email ? user.email.split('@')[0] : "Admin"}
            </p>
            <p className="text-[9px] text-blue-500 font-black uppercase tracking-tighter leading-none">
              {user?.role || "Manager"}
            </p>
          </div>
           
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 border border-white/10 shadow-lg shadow-blue-500/10 flex items-center justify-center text-white font-black text-xs">
            {user?.email?.charAt(0).toUpperCase() || "A"}
          </div>
 
          <button 
            onClick={logout}
            className="p-2 cursor-pointer rounded-lg bg-red-500/5 border border-red-500/10 text-red-500/60 hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}