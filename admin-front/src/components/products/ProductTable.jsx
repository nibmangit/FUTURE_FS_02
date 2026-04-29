import { Edit3, Trash2 } from "lucide-react";
import EmptyState from "../common/EmptyState";

export default function ProductTable({ data, onView, onEdit, onDelete }) {
  if (data.length === 0) return <EmptyState message="No products found" subtext="Start by adding your first tech item." />;

  return (
    <div className="bg-[#020617]/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-900/50 border-b border-slate-800/50">
          <tr>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Product</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Price</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Stock</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Created</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.map((product) => (
            <tr key={product.id} className="group hover:bg-blue-500/[0.02] transition-colors">
              <td className="p-4"> 
                <div 
                  onClick={() => onView(product)}
                  className="flex items-center gap-4 cursor-pointer group/item"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden border border-slate-700 group-hover/item:border-blue-500/50 transition-all">
                    <img src={product.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-200 group-hover/item:text-blue-400 transition-colors">
                      {product.title}
                    </span>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-tight opacity-0 group-hover/item:opacity-100 transition-opacity">
                      Click to view
                    </p>
                  </div>
                </div>
              </td>
              <td className="p-4 text-slate-400 font-medium">{product.category.name}</td>
              <td className="p-4 text-xl font-black text-white">{Number(product.price).toLocaleString()}
                <span className="text-sm text-cyan-400 ml-1">ETB</span>
              </td>
              <td className="p-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  product.stock === 0 ? "bg-red-500/10 text-red-500 ring-1 ring-red-500/20" :
                  product.stock < 10 ? "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20" :
                  "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20"
                }`}>
                  {product.stock === 0 ? "Out of Stock" : `${product.stock} in Stock`}
                </span>
              </td>
              <td className="p-4 text-slate-500 text-xs">{new Date(product.created_at).toLocaleDateString()}</td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 rounded-lg cursor-pointer bg-slate-800/50 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => onDelete(product)} className="p-2 rounded-lg cursor-pointer bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}