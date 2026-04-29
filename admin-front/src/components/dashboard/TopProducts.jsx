import { Trophy } from "lucide-react";

export default function TopProducts({ data }) {
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800/50 flex flex-col h-full">
      <div className="flex items-center gap-2 mb-6">
        <Trophy size={18} className="text-amber-400" />
        <h2 className="text-lg font-bold text-white">Top Products</h2>
      </div>

      <div className="space-y-5">
        {data.map((product, index) => (
          <div key={product.id} className="group cursor-default">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <span className={`text-xs font-black px-2 py-0.5 rounded ${
                  index === 0 ? "bg-amber-500/20 text-amber-500" : "bg-slate-800 text-slate-500"
                }`}>
                  {index + 1}
                </span>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">
                  {product.title}
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {product.sold} <span className="text-[10px] text-slate-600 uppercase">sold</span>
              </span>
            </div>
            
            {/* Visual indicator (Progress Bar) */}
            <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-1000" 
                style={{ width: `${(product.sold / data[0].sold) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}