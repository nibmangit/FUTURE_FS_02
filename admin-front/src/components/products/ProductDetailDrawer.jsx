import { X, Edit3, Package, Calendar, Tag } from "lucide-react";

export default function ProductDetailDrawer({ isOpen, onClose, product, onEdit }) {
  if (!isOpen || !product) return null;

  return (
    <> 
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]" onClick={onClose} />
       
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#020617] border-l border-slate-800 shadow-2xl z-[70] transition-transform duration-300 ease-in-out flex flex-col">
         
        <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-[#0f172a]/50">
          <h2 className="text-xl font-bold text-white">Product Details</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => { onEdit(product); onClose(); }}
              className="p-2 bg-blue-600/10 text-blue-400 rounded-lg cursor-pointer hover:bg-blue-600/20 transition-colors"
            >
              <Edit3 size={18} />
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 cursor-pointer hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>
 
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src={product.image} 
              className="relative w-full aspect-square object-cover rounded-2xl border border-slate-800" 
              alt={product.title} 
            />
          </div>
 
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded">
              {product.category?.name}
            </span>
            <h3 className="text-2xl font-black text-white mt-4">{product.title}</h3>
            <p className="text-slate-400 mt-4 leading-relaxed text-sm">
              {product.description || "No description provided for this product."}
            </p>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Tag size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Price</span>
              </div>
              <p className="text-xl font-black text-white">{Number(product.price).toLocaleString()}<span className="text-sm text-cyan-400 ml-1">ETB</span></p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 mb-2">
                <Package size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Inventory</span>
              </div>
              <p className={`text-xl font-black ${product.stock === 0 ? "text-red-500" : "text-emerald-500"}`}>
                {product.stock} <span className="text-xs text-slate-600">units</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-slate-500 text-xs pt-4 border-t border-slate-800">
            <Calendar size={14} />
            <span>Added on {new Date(product.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </>
  );
}