import { Edit3, Trash2, Hash } from "lucide-react";

export default function CategoryTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 border-b border-slate-800/50">
          <tr>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Category Name</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">URL Slug</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.map((cat) => (
            <tr key={cat.id} className="group hover:bg-blue-500/[0.02] transition-colors">
              <td className="p-4 font-bold text-slate-200">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Hash size={14} />
                  </div>
                  {cat.name}
                </div>
              </td>
              <td className="p-4 font-mono text-xs text-slate-500">/{cat.slug}</td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(cat)} className="p-2 rounded-lg bg-slate-800/50 text-slate-400 cursor-pointer hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => onDelete(cat)} className="p-2 rounded-lg bg-slate-800/50 text-slate-400 cursor-pointer hover:text-red-400 hover:bg-red-400/10 transition-all">
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