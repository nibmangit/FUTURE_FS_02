import { DatabaseBackup } from "lucide-react";

export default function EmptyState({ message = "No records found", subtext = "Try adjusting your filters or adding a new entry." }) {
  return (
    <div className="bg-[#020617]/20 border-2 border-dashed border-slate-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center">
      {/* Decorative Icon Container */}
      <div className="w-20 h-20 bg-slate-900/50 rounded-2xl border border-slate-800 flex items-center justify-center mb-6 shadow-xl">
        <DatabaseBackup size={40} className="text-slate-600" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-200 mb-2">{message}</h3>
      <p className="text-slate-500 text-sm max-w-62.5 mx-auto leading-relaxed">
        {subtext}
      </p>
      
    </div>
  );
}