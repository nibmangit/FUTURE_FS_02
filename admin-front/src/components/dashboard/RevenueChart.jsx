import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function RevenueChart({ data }) {
  if (!data) return <div className="text-slate-500 text-xs p-4">Loading chart data...</div>;
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md p-6 rounded-2xl border border-slate-800/50 h-full">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-lg font-bold text-white">Revenue Overview</h2>
          <p className="text-xs text-slate-500">Daily performance metrics</p>
        </div>
        <select className="bg-slate-900 border border-slate-800 text-xs rounded-lg px-3 py-1.5 outline-none text-slate-400 focus:border-blue-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="date" stroke="#475569" tick={{ fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} dy={10} />
            <YAxis stroke="#475569" tick={{ fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #1e293b", borderRadius: "12px", fontSize: "12px" }}
              itemStyle={{ color: "#3b82f6" }}
            />
            <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}