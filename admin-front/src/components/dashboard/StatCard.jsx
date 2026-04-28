export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-gray-800 shadow-sm">
      
      <p className="text-sm text-gray-400">{title}</p>

      <h2 className={`text-2xl font-semibold mt-2 ${color || "text-white"}`}>
        {value}
      </h2>

    </div>
  );
}