export default function Navbar() {
  return (
    <div className="h-20 bg-[#020617]/40 backdrop-blur-xl border-b border-slate-800/50 flex items-center justify-between px-8 sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">Overview</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800/50">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-200">Nibretu M.</p>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-tighter">Super Admin</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 border border-white/10 shadow-lg shadow-blue-500/20 flex items-center justify-center text-white font-bold text-sm">
            NM
          </div>
        </div>
      </div>
    </div>
  );
}