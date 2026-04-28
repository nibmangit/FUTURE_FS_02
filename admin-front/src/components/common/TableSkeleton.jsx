export default function TableSkeleton({ rows = 5 }) {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 p-4">
      
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="h-10 bg-[#0f172a] animate-pulse rounded"
          />
        ))}
      </div>

    </div>
  );
}