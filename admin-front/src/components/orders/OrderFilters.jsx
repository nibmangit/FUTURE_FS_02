import { useState } from "react";
import { Search, Calendar, RotateCcw } from "lucide-react";

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

  const inputClass = "bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-600";

  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800/50 shadow-xl space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        
        {/* Search Input mapped to ?search= */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            name="search"
            value={query.search}
            onChange={handleChange}
            placeholder="Search by email..."
            className={`${inputClass} w-full pl-10`}
          />
        </div>

        {/* Status Select mapped to ?status= */}
        <select 
          name="status"
          value={query.status}
          onChange={handleChange}
          className={`${inputClass} min-w-[140px] appearance-none`}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="paid">Paid</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="failed">Failed</option>
        </select>

        {/* Single Date mapped to ?date= */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-black uppercase text-slate-500">Specific Date</label>
          <input
            type="date"
            name="date"
            value={query.date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/50">
        {/* Date Range mapped to ?start_date= & ?end_date= */}
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-black uppercase text-slate-500 flex items-center gap-1">
            <Calendar size={12}/> Range
          </label>
          <input
            type="date"
            name="start_date"
            value={query.start_date}
            onChange={handleChange}
            className={inputClass}
          />
          <span className="text-slate-600">-</span>
          <input
            type="date"
            name="end_date"
            value={query.end_date}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-slate-800 cursor-pointer text-slate-400 hover:text-white transition-all active:scale-95"
            title="Reset Filters"
          >
            <RotateCcw size={18} />
          </button>
          <button 
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}