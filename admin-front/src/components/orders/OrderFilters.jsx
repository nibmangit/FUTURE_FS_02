import { useState } from "react";
import { Search, RotateCcw, Filter } from "lucide-react";

export default function OrderFilters({ onFilterChange }) {
  const [query, setQuery] = useState({
    search: "",
    status: "",
    date: "",
    start_date: "",
    end_date: "",
  });

  const handleChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    // Filter out empty strings before sending to parent/API
    const activeFilters = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== "")
    );
    onFilterChange(activeFilters);
  };

  const handleReset = () => {
    const emptyState = { search: "", status: "", date: "", start_date: "", end_date: "" };
    setQuery(emptyState);
    onFilterChange(emptyState);
  };

  const inputBase = "bg-[#0f172a] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all outline-none cursor-pointer placeholder:text-slate-600";
  const labelBase = "text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-1 block ml-1";

  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-3 rounded-xl border border-slate-800/50 shadow-xl flex items-end gap-3 w-full overflow-x-auto no-scrollbar">
      
      {/* 1. Search by Email */}
      <div className="flex-[2] min-w-[180px]">
        <label className={labelBase}>Search Customer</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            name="search"
            value={query.search}
            onChange={handleChange}
            placeholder="Search email..."
            className={`${inputBase} w-full pl-8 py-2 cursor-text`}
          />
        </div>
      </div>

      {/* 2. Status Dropdown */}
      <div className="shrink-0 min-w-[120px]">
        <label className={labelBase}>Order Status</label>
        <div className="relative">
           <select 
            name="status"
            value={query.status}
            onChange={handleChange}
            className={`${inputBase} w-full py-2 px-2 [&>option]:bg-[#0f172a] appearance-none`}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
          <Filter className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" size={12} />
        </div>
      </div>

      {/* 3. Specific Date */}
      <div className="shrink-0">
        <label className={labelBase}>Specific Date</label>
        <input
          type="date"
          name="date"
          value={query.date}
          onChange={handleChange}
          className={`${inputBase} py-[7px] px-2 uppercase text-[10px]`}
        />
      </div>

      {/* 4. Date Range */}
      <div className="shrink-0">
        <label className={labelBase}>Date Range (From - To)</label>
        <div className="flex items-center gap-1">
          <input
            type="date"
            name="start_date"
            value={query.start_date}
            onChange={handleChange}
            className={`${inputBase} py-[7px] px-2 uppercase text-[10px]`}
          />
          <span className="text-slate-700">-</span>
          <input
            type="date"
            name="end_date"
            value={query.end_date}
            onChange={handleChange}
            className={`${inputBase} py-[7px] px-2 uppercase text-[10px]`}
          />
        </div>
      </div>

      {/* 5. Action Buttons */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <button 
          onClick={handleReset}
          className="p-2 cursor-pointer rounded-lg bg-slate-800/50 text-slate-500 hover:text-white transition-all active:scale-95 border border-transparent hover:border-slate-700"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
        <button 
          onClick={handleApply}
          className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-blue-600/20 transition-all active:scale-95"
        >
          Apply
        </button>
      </div>
    </div>
  );
}