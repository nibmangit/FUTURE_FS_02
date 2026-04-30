import { AlertTriangle, PackageSearch } from "lucide-react";

export default function LowStock({ data }) {
  if (!data) return <div className="text-slate-500 text-xs p-4">Loading low stock...</div>;
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-red-500" />
          <h2 className="text-lg font-bold text-white">Stock Alerts</h2>
        </div>
        <span className="text-[10px] bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
          Action Required
        </span>
      </div>

      <div className="space-y-3">
        {data.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${product.stock === 0 ? "bg-red-500/10" : "bg-amber-500/10"}`}>
                <PackageSearch size={16} className={product.stock === 0 ? "text-red-500" : "text-amber-500"} />
              </div>
              <p className="text-sm font-medium text-slate-300">
                {product.title}
              </p>
            </div>

            <div className="text-right">
              <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                product.stock === 0
                  ? "text-red-400 bg-red-400/10 ring-1 ring-red-400/20"
                  : "text-amber-400 bg-amber-400/10 ring-1 ring-amber-400/20"
              }`}>
                {product.stock} left
              </span>
            </div>
          </div>
        ))}

        {data.length === 0 && (
          <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-2xl">
            <p className="text-sm text-slate-500 font-medium italic">
              All inventory levels are healthy 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
}