export default function CategoryTable({
  data,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">

      <table className="w-full text-sm">

        <thead className="bg-[#030712] text-gray-400">
          <tr>
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Slug</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((cat) => (
            <tr
              key={cat.id}
              className="border-t border-gray-800 hover:bg-[#0f172a]"
            >
              
              <td className="p-4">{cat.name}</td>

              <td className="p-4 text-gray-400">
                {cat.slug}
              </td>

              <td className="p-4 flex gap-2">
                
                <button
                  onClick={() => onEdit(cat)}
                  className="px-3 py-1 text-xs bg-blue-600 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(cat)}
                  className="px-3 py-1 text-xs bg-red-600 rounded"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}