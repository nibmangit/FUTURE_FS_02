import { useState, useEffect } from "react";
import { Search, RotateCcw, ArrowUpDown, PackageX } from "lucide-react";
import categoryService from "../../api/categoryService";

export default function ProductFilters({ onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState({
    search: "",
    category: "",
    min_stock: "",
    max_stock: "",
    ordering: "-created_at",
    out_of_stock: false,
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const data = await categoryService.getAllCategories();
        setCategories(data);
      } catch {
        console.error("Failed to load categories");
      }
    };
    fetchCats();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuery({ ...query, [name]: type === "checkbox" ? checked : value });
  };

  const handleApply = () => {
    const activeFilters = Object.fromEntries(
      Object.entries(query).filter(([_, value]) => value !== "" && value !== false)
    );
    onFilterChange(activeFilters);
  };

  const handleReset = () => {
    const emptyState = { search: "", category: "", min_stock: "", max_stock: "", ordering: "-created_at", out_of_stock: false };
    setQuery(emptyState);
    onFilterChange(emptyState);
  };

  // Reusable classes for consistency
  const inputBase = "bg-[#0f172a] border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all outline-none cursor-pointer placeholder:text-slate-600";
  const labelBase = "text-[9px] font-black uppercase tracking-tighter text-slate-500 mb-1 block ml-1";

  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-3 rounded-xl border border-slate-800/50 shadow-xl flex items-end gap-3 w-full overflow-x-auto no-scrollbar">
      
      {/* 1. Deep Search */}
      <div className="flex-[2] max-w-[280px]">
        <label className={labelBase}>Search Inventory</label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input
            name="search"
            value={query.search}
            onChange={handleChange}
            placeholder="Search..."
            className={`${inputBase} w-full pl-8 py-2`}
          />
        </div>
      </div>

      {/* 2. Ordering */}
      <div className="shrink-0">
        <label className={labelBase}>Sort By</label>
        <div className="flex items-center gap-2 bg-[#0f172a] border border-slate-800 rounded-lg px-2 py-2">
          <ArrowUpDown size={14} className="text-slate-500" />
          <select 
            name="ordering" 
            value={query.ordering} 
            onChange={handleChange}
            className="bg-transparent text-xs text-slate-300 outline-none cursor-pointer [&>option]:bg-[#0f172a]"
          >
            <option value="-created_at">Newest First</option>
            <option value="price">Price low to high</option>
            <option value="-price">Price high to low</option>
            <option value="stock">Stock low to high</option>
            <option value="-stock">Stock high to low</option>
          </select>
        </div>
      </div>

      {/* 3. Category */}
      <div className="shrink-0 min-w-[120px]">
        <label className={labelBase}>Category</label>
        <select 
          name="category"
          value={query.category}
          onChange={handleChange}
          className={`${inputBase} w-full py-2 px-2 [&>option]:bg-[#0f172a]`}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* 4. Stock Range */}
      <div className="shrink-0">
        <label className={labelBase}>Stock Range</label>
        <div className="flex items-center gap-1">
          <input
            type="number"
            name="min_stock"
            placeholder="Min"
            value={query.min_stock}
            onChange={handleChange}
            className={`${inputBase} w-24 py-2 text-center`}
          />
          <span className="text-slate-700">-</span>
          <input
            type="number"
            name="max_stock"
            placeholder="Max"
            value={query.max_stock}
            onChange={handleChange}
            className={`${inputBase} w-24 py-2 text-center`}
          />
        </div>
      </div>

      {/* 5. Out of Stock Toggle */}
      <div className="shrink-0">
        <label className={labelBase}>Out of Stock</label>
        <label className="flex items-center justify-center gap-2 cursor-pointer group px-3 py-2 rounded-lg bg-[#0f172a] border border-slate-800 hover:border-red-500/30 transition-all">
          <PackageX size={14} className={query.out_of_stock ? 'text-red-500' : 'text-slate-500'} />
          <input
            type="checkbox"
            name="out_of_stock"
            checked={query.out_of_stock}
            onChange={handleChange}
            className="w-3.5 h-3.5 accent-red-600 rounded bg-transparent"
          /> 
        </label>
      </div>

      {/* 6. Action Buttons */}
      <div className="flex items-center gap-2 shrink-0 ml-auto">
        <button 
          onClick={handleReset}
          className="p-2 cursor-pointer rounded-lg bg-slate-800/50 text-slate-500 hover:text-white transition-all active:scale-95 border border-transparent hover:border-slate-700"
          title="Reset All"
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