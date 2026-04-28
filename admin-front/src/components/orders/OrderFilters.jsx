export default function OrderFilters() {
  return (
    <div className="bg-[#111827] p-4 rounded-xl border border-gray-800 flex flex-wrap gap-4 items-center">
      
      {/* Search */}
      <input
        placeholder="Search by email..."
        className="px-3 py-2 rounded bg-[#0f172a] border border-gray-700 text-sm"
      />

      {/* Status Filter */}
      <select className="px-3 py-2 rounded bg-[#0f172a] border border-gray-700 text-sm">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="paid">Paid</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="failed">Failed</option>
      </select>

      {/* Date */}
      <input
        type="date"
        className="px-3 py-2 rounded bg-[#0f172a] border border-gray-700 text-sm"
      />

      {/* Range */}
      <input
        type="date"
        className="px-3 py-2 rounded bg-[#0f172a] border border-gray-700 text-sm"
      />
      <input
        type="date"
        className="px-3 py-2 rounded bg-[#0f172a] border border-gray-700 text-sm"
      />

      {/* Button */}
      <button className="px-4 py-2 bg-blue-600 rounded text-sm">
        Apply
      </button>

    </div>
  );
}