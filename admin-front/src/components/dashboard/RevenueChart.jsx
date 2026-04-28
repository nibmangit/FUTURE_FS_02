import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
      
      <h2 className="text-lg font-semibold mb-4">Revenue Overview</h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#030712",
                border: "1px solid #1f2937",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />

          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}