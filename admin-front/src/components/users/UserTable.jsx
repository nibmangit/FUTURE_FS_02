import { User, Shield, Eye } from "lucide-react";

export default function UserTable({ data, onView }) {
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-slate-900/50 border-b border-slate-800/50">
          <tr>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">User Identity</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Access Level</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
            <th className="p-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/40">
          {data.map((user) => (
            <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700 text-slate-400 group-hover:border-blue-500 transition-colors">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-200">{user.email}</p>
                    <p className="text-[10px] text-slate-500 font-mono italic">ID: {user.id}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                  user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  {user.role === 'admin' ? <Shield size={10}/> : <User size={10}/>}
                  {user.role}
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                  <span className={`text-xs font-bold ${user.is_active ? 'text-emerald-400' : 'text-red-400'}`}>
                    {user.is_active ? 'Active' : 'Blocked'}
                  </span>
                </div>
              </td>
              <td className="p-4 text-right">
                <button onClick={() => onView(user)} className="p-2 rounded-xl bg-slate-800/50 cursor-pointer text-slate-400 hover:text-white hover:bg-blue-600 transition-all">
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