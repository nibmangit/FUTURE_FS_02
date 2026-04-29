import { TrendingUp } from "lucide-react";

export default function StatCard({ title, value, color, icon: Icon }) {
  return (
    <div className="relative overflow-hidden bg-[#020617]/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800/50 group hover:border-blue-500/30 transition-all duration-300">
      {/* Background Decoration */}
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 ${color || "text-white"}`}>
        {Icon && <Icon size={120} />}
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{title}</p>
          {Icon && (
            <div className={`p-2 rounded-lg bg-slate-900/50 border border-slate-800 ${color || "text-blue-400"}`}>
              <Icon size={18} />
            </div>
          )}
        </div>

        <div className="flex items-end gap-2">
          <h2 className={`text-3xl font-black tracking-tight ${color || "text-white"}`}>
            {value}
          </h2>
          <div className="flex items-center text-[10px] text-emerald-500 font-bold mb-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            <TrendingUp size={10} className="mr-1" /> +12%
          </div>
        </div>
      </div>
    </div>
  );
}