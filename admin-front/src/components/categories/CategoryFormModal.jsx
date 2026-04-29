import { useState, useEffect } from "react";

export default function CategoryFormModal({ isOpen, onClose, category }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(category ? category.name : "");
    }
  }, [category, isOpen]);

  if (!isOpen) return null;

  // Simple function to show the user what the slug will look like
  const generateSlug = (text) => text.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");

  return (
    <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f172a] w-full max-w-md p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
        
        <h2 className="text-2xl font-black text-white mb-6">
          {category ? "Edit Category" : "New Category"}
        </h2>

        <div className="space-y-6 relative z-10">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-2 block tracking-widest">Category Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Smart Watches"
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-slate-200"
              autoFocus
            />
          </div>

          {name && (
            <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tight mb-1">Generated Slug</p>
              <p className="text-xs font-mono text-slate-400">/{generateSlug(name)}</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-10 relative z-10">
          <button onClick={onClose} className="px-6 py-2.5 text-slate-400 font-bold cursor-pointer hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95">
            {category ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}