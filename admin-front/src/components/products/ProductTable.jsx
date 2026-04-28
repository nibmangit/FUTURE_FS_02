export default function ProductTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-[#111827] rounded-xl border border-gray-800 overflow-hidden">
      
      <table className="w-full text-sm">
        
        <thead className="bg-[#030712] text-gray-400">
          <tr>
            <th className="text-left p-4">Image</th>
            <th className="text-left p-4">Title</th>
            <th className="text-left p-4">Category</th>
            <th className="text-left p-4">Price</th>
            <th className="text-left p-4">Stock</th>
            <th className="text-left p-4">Created</th>
            <th className="text-left p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((product) => (
            <tr
              key={product.id}
              className="border-t border-gray-800 hover:bg-[#0f172a]"
            >
              
              {/* Image */}
              <td className="p-4">
                <img
                  src={product.image}
                  alt=""
                  className="w-12 h-12 object-cover rounded"
                />
              </td>

              {/* Title */}
              <td className="p-4">{product.title}</td>

              {/* Category */}
              <td className="p-4 text-gray-400">
                {product.category.name}
              </td>

              {/* Price */}
              <td className="p-4 text-green-400">
                ${Number(product.price).toLocaleString()}
              </td>

              {/* Stock */}
              <td className="p-4">
                <span
                  className={`${
                    product.stock === 0
                      ? "text-red-500"
                      : product.stock < 5
                      ? "text-yellow-400"
                      : "text-gray-200"
                  }`}
                >
                  {product.stock}
                </span>
              </td>

              {/* Created */}
              <td className="p-4 text-gray-500">
                {new Date(product.created_at).toLocaleDateString()}
              </td>

              <td className="p-4">
                <div className="flex gap-2">
                    <button
                    onClick={() => onEdit(product)}
                    className="px-3 py-1 text-xs rounded bg-blue-600 hover:bg-blue-700"
                    >
                    Edit
                    </button>

                    <button
                    onClick={() => onDelete(product)}
                    className="px-3 py-1 text-xs rounded bg-red-600 hover:bg-red-700"
                    >
                    Delete
                    </button>
                </div>
                </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}