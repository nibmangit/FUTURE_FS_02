export default function UserTable({ data, onView }) {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-[#030712] text-gray-400">
          <tr>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Joined</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr
              key={user.id}
              className="border-t border-gray-800 hover:bg-[#0f172a]"
            >
              <td className="p-4">{user.email}</td>

              <td className="p-4 capitalize">{user.role}</td>

              <td className="p-4">
                {user.is_active ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <span className="text-red-400">Blocked</span>
                )}
              </td>

              <td className="p-4 text-gray-400">
                {new Date(user.date_joined).toLocaleDateString()}
              </td>

              <td className="p-4">
                <button
                  onClick={() => onView(user)}
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