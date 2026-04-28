import StatusBadge from "./StatusBadge";

export default function OrderTable({ data, onView }) {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-[#030712] text-gray-400">
          <tr>
            <th className="p-4 text-left">Order ID</th>
            <th className="p-4 text-left">User</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((order) => (
            <tr
              key={order.id}
              className="border-t border-gray-800 hover:bg-[#0f172a]"
            >
              
              <td className="p-4 text-xs">{order.id.slice(0, 8)}...</td>

              <td className="p-4">{order.user_email}</td>

              <td className="p-4 text-green-400">
                ${Number(order.total_price).toLocaleString()}
              </td>

              <td className="p-4">
                <StatusBadge status={order.status} />
              </td>

              <td className="p-4 text-gray-400">
                {new Date(order.created_at).toLocaleDateString()}
              </td>

              <td className="p-4">
                <button
                  onClick={() => onView(order)}
                  className="px-3 py-1 text-xs bg-blue-600 rounded"
                >
                  View
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}