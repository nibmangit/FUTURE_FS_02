export default function UserDetailModal({
  isOpen,
  onClose,
  user,
}) {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
      
      <div className="w-full max-w-md h-full bg-[#111827] p-6 border-l border-gray-800 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-lg font-semibold">User Details</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Info */}
        <div className="space-y-3 text-sm">
          <p><span className="text-gray-400">Email:</span> {user.email}</p>
          <p><span className="text-gray-400">Role:</span> {user.role}</p>
          <p>
            <span className="text-gray-400">Status:</span>{" "}
            {user.is_active ? "Active" : "Blocked"}
          </p>
          <p>
            <span className="text-gray-400">Joined:</span>{" "}
            {new Date(user.date_joined).toLocaleString()}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800" />

        {/* Stats (detail endpoint) */}
        <div className="space-y-2 text-sm">
          <h3 className="font-semibold mb-2">Stats</h3>

          <p>Total Orders: {user.total_orders ?? 0}</p>
          <p>Total Spent: ${user.total_spent ?? 0}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800" />

        {/* Update */}
        <div>
          <h3 className="font-semibold mb-3">Update User</h3>

          {/* Role */}
          <select
            defaultValue={user.role}
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 mb-3"
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
            <option value="staff">staff</option>
          </select>

          {/* Active toggle */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              defaultChecked={user.is_active}
            />
            <label>Active</label>
          </div>

          <button className="w-full bg-blue-600 py-2 rounded">
            Update User
          </button>
        </div>

      </div>
    </div>
  );
}