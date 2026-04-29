import StatusBadge from "./StatusBadge";
import { Eye, Hash } from "lucide-react"; 

export default function OrderTable({ data, onView }) {
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 border-b border-slate-800/50">
          <tr>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Order ID</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Customer</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Total Revenue</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.map((order) => (
            <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-2">
                   <Hash size={12} className="text-slate-600" />
                   <span className="font-mono text-xs text-slate-400 group-hover:text-blue-400 transition-colors">
                     {order.id.slice(0, 8).toUpperCase()}
                   </span>
                </div>
              </td>
              <td className="p-4">
                <div className="text-slate-200 font-bold">{order.user_email.split('@')[0]}</div>
                <div className="text-[10px] text-slate-500 font-medium">{order.user_email}</div>
              </td>
              <td className="p-4 font-black text-white">
                 <span className="text-xl font-bold text-white whitespace-nowrap">
                      {Number(order.total_price).toLocaleString()} 
                      <span className="text-sm text-cyan-400 ml-1">ETB</span>
                  </span>
              </td>
              <td className="p-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="p-4 text-right">
                <button
                  onClick={() => onView(order)}
                  className="p-2.5 rounded-xl cursor-pointer bg-slate-800/50 text-slate-400 hover:text-white hover:bg-blue-600 transition-all active:scale-90"
                >
                  <Eye size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}