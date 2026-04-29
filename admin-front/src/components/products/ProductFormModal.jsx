import { useEffect, useState } from "react";

export default function ProductFormModal({ isOpen, onClose, product }) {
  const [form, setForm] = useState({ title: "", description: "", category_id: "", price: "", stock: "", image: null });

  useEffect(() => {
    if (isOpen) {
      if (product) { 
        setForm({
          title: product.title || "",
          description: product.description || "",
          category_id: product.category?.id || "",
          price: product.price || "",
          stock: product.stock || "",
          image: null,
        });
      } else { 
        setForm({ title: "", description: "", category_id: "", price: "", stock: "", image: null });
      }
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const inputClass = "w-full p-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-slate-200 placeholder:text-slate-600";

  return (
    <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f172a] w-full max-w-xl p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow effect inside modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
        
        <h2 className="text-2xl font-black text-white mb-6">{product ? "Edit Product" : "New Product"}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Product Title</label>
            <input name="title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. AirPods Max" className={inputClass} />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Price ($)</label>
            <input type="number" name="price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Inventory Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className={inputClass} />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Thumbnail Image</label>
            <div className="mt-1 flex items-center justify-center w-full px-6 pt-5 pb-6 border-2 border-slate-800 border-dashed rounded-2xl hover:border-blue-500/50 transition-colors cursor-pointer">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="text-sm text-slate-400 cursor-pointer">Click to upload product image</label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button onClick={onClose} className="px-6 py-2.5 text-slate-400 font-bold cursor-pointer hover:text-white transition-colors">Cancel</button>
          <button className="px-8 py-2.5 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all">
            {product ? "Save Changes" : "Create Product"}
          </button>
        </div>
      </div>
    </div>
  );
}