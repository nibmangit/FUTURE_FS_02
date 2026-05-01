import { useState } from "react";
import { Search, UserCheck, RotateCcw, ShieldCheck, Calendar } from "lucide-react";

export default function UserFilters({ onFilterChange }) {
  const [query, setQuery] = useState({
    search: "",
    role: "",
    is_active: "",
    date_joined: "", // Specific day filter
    start_date: "",  // Range start
    end_date: "",    // Range end
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuery({ ...query, [name]: value });
  };

  const handleApply = () => {
    // Only send keys that have a value to keep the URL clean
    const activeFilters = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== "")
    );
    onFilterChange(activeFilters);
  };

  const handleReset = () => {
    const emptyState = { 
      search: "", role: "", is_active: "", 
      date_joined: "", start_date: "", end_date: "" 
    };
    setQuery(emptyState);
    onFilterChange(emptyState);
  };

  const inputBase = "bg-[#0f172a] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all outline-none cursor-pointer placeholder:text-slate-600";
  const labelBase = "text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-1 block ml-1";

  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-3 rounded-xl border border-slate-800/50 shadow-xl flex items-end gap-3 w-full overflow-x-auto no-scrollbar">
      
      {/* 1. Search: Email, Username, Name */}
      <div className="flex-[1.5] min-w-[180px]">
        <label className={labelBase}>Search Directory</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            name="search"
            value={query.search}
            onChange={handleChange}
            placeholder="Name or Email..."
            className={`${inputBase} w-full pl-8 py-2 cursor-text`}
          />
        </div>
      </div>

      {/* 2. Role Dropdown */}
      <div className="shrink-0 min-w-[110px]">
        <label className={labelBase}>User Role</label>
        <div className="relative">
          <select 
            name="role"
            value={query.role}
            onChange={handleChange}
            className={`${inputBase} w-full py-2 px-2 [&>option]:bg-[#0f172a] appearance-none`}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="customer">Customer</option>
          </select>
          <ShieldCheck className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={12} />
        </div>
      </div>

      {/* 3. Account Status (is_active) */}
      <div className="shrink-0 min-w-[110px]">
        <label className={labelBase}>Account Status</label>
        <div className="relative">
          <select 
            name="is_active"
            value={query.is_active}
            onChange={handleChange}
            className={`${inputBase} w-full py-2 px-2 [&>option]:bg-[#0f172a] appearance-none`}
          >
            <option value="">Any Status</option>
            <option value="true">Active</option>
            <option value="false">Blocked</option>
          </select>
          <UserCheck className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={12} />
        </div>
      </div>

      {/* 4. Registration Date (Specific & Range) */}
      <div className="shrink-0 flex items-end gap-2 pl-3 border-l border-slate-800/50">
        <div>
          <label className={labelBase}>Specific Day</label>
          <input
            type="date"
            name="date_joined"
            value={query.date_joined}
            onChange={handleChange}
            className={`${inputBase} py-[7px] px-2 text-[10px] uppercase`}
          />
        </div>
        
        <div>
          <label className={labelBase}>Registration Range</label>
          <div className="flex items-center gap-1">
            <input
              type="date"
              name="start_date"
              value={query.start_date}
              onChange={handleChange}
              className={`${inputBase} py-[7px] px-2 text-[10px] uppercase`}
            />
            <span className="text-slate-700">-</span>
            <input
              type="date"
              name="end_date"
              value={query.end_date}
              onChange={handleChange}
              className={`${inputBase} py-[7px] px-2 text-[10px] uppercase`}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <button 
          onClick={handleReset}
          className="p-2 rounded-lg cursor-pointer bg-slate-800/50 text-slate-500 hover:text-white transition-all border border-transparent hover:border-slate-700 cursor-pointer"
          title="Reset All"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={handleApply}
          className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-blue-600/20 transition-all active:scale-95 cursor-pointer"
        >
          Apply
        </button>
      </div>
    </div>
  );
}