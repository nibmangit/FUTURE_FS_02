export default function TableSkeleton({ rows = 6 }) {
  return (
    <div className="bg-[#020617]/40 backdrop-blur-md rounded-2xl border border-slate-800/50 overflow-hidden">
      {/* Header Skeleton */}
      <div className="bg-slate-900/50 p-4 border-b border-slate-800/50 flex gap-4">
        <div className="h-4 w-1/4 bg-slate-800 animate-pulse rounded-md" />
        <div className="h-4 w-1/4 bg-slate-800 animate-pulse rounded-md" />
        <div className="h-4 w-1/4 bg-slate-800 animate-pulse rounded-md" />
        <div className="h-4 w-1/4 bg-slate-800 animate-pulse rounded-md" />
      </div>
      
      {/* Rows Skeleton */}
      <div className="p-4 space-y-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 py-2">
            {/* Avatar/Icon Circle */}
            <div className="w-10 h-10 bg-slate-800/60 animate-pulse rounded-xl shrink-0" />
            
            {/* Column 1 (Wide) */}
            <div className="h-4 w-full bg-slate-800/40 animate-pulse rounded-lg" />
            
            {/* Column 2 (Medium) */}
            <div className="h-4 w-1/2 bg-slate-800/40 animate-pulse rounded-lg" />
            
            {/* Column 3 (Small - Badge style) */}
            <div className="h-6 w-24 bg-slate-800/40 animate-pulse rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}