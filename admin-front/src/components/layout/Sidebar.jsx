import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Package, Layers, 
  ShoppingCart, Users, ChevronLeft, ChevronRight, 
  ExternalLink
} from "lucide-react";

const links = [
  { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
  { name: "Products", path: "/products", icon: <Package size={20} /> },
  { name: "Categories", path: "/categories", icon: <Layers size={20} /> },
  { name: "Orders", path: "/orders", icon: <ShoppingCart size={20} /> },
  { name: "Users", path: "/users", icon: <Users size={20} /> },
];

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`
      relative h-full bg-[#020617] border-r border-slate-800/60 flex flex-col transition-all duration-300 ease-in-out z-30
      ${isOpen ? "w-62" : "w-20"}
    `}>
      {/* --- FLOATING TOGGLE BUTTON --- */}
      <button
        onClick={toggleSidebar}
        className="absolute cursor-pointer -right-3 top-24 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border border-slate-800 shadow-lg shadow-blue-500/40 hover:bg-blue-500 transition-colors z-50 group"
      >
        {isOpen ? (
          <ChevronLeft size={14} className="text-white group-hover:-translate-x-0.5 transition-transform" />
        ) : (
          <ChevronRight size={14} className="text-white group-hover:translate-x-0.5 transition-transform" />
        )}
      </button>

      {/* Brand Logo Area */}
      <div className="p-8 h-20 flex items-center overflow-hidden">
        <div className="flex items-center gap-3 min-w-[40px]">
          
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-blue-600/20 overflow-hidden">
            <img 
              src="/image.png" // Replace with your actual path
              alt="MiniTech Logo"
              className="w-full h-full object-cover p-1.5" 
            />
          </div>

          <span className={`text-2xl font-black tracking-tighter text-white transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible"}`}>
            MINI<span className="text-blue-500">TECH</span>
          </span>
        </div>
      </div>
 
      <nav className="flex-1 px-4 mt-4 space-y-1 overflow-y-auto no-scrollbar">
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            title={!isOpen ? link.name : ""}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? "bg-blue-600/10 text-blue-400 border border-blue-600/10 shadow-[inset_0px_0px_10px_rgba(37,99,235,0.05)]"
                  : "text-slate-500 hover:bg-slate-800/40 hover:text-slate-200"
              }`
            }
          >
            <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">
              {link.icon}
            </span>
            <span className={`font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 invisible w-0"}`}>
              {link.name}
            </span>
          </NavLink>
        ))}

        <div className="pt-4 mt-4 border-t border-slate-800/40">
          <a
            href={import.meta.env.VITE_STORE_URL || "#"}
            target="_blank"
            rel="noopener noreferrer"
            title={!isOpen ? "Visit Store" : ""}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-slate-500 hover:bg-blue-600/5 hover:text-blue-400"
          >
            <span className="shrink-0 transition-transform duration-300 group-hover:rotate-12">
              <ExternalLink size={20} />
            </span>
            <span className={`font-bold text-[11px] uppercase tracking-widest whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 invisible w-0"}`}>
              Visit Store
            </span>
          </a>
        </div>
      </nav>

      {/* Status Section */}
      <div className="p-4 border-t border-slate-800/40">
        <div className={`p-4 rounded-2xl bg-slate-900/40 border border-slate-800/50 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 invisible h-0 p-0 overflow-hidden"}`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Server Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}