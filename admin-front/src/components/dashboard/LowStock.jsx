export default function LowStock({ data }) {
  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
      
      <h2 className="text-lg font-semibold mb-4 text-red-400">
        Low Stock Alerts
      </h2>

      <div className="space-y-3">
        {data.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0f172a] border border-gray-800"
          >
            {/* Product Name */}
            <p className="text-sm text-gray-200">
              {product.title}
            </p>

            {/* Stock */}
            <span
              className={`text-sm font-medium ${
                product.stock === 0
                  ? "text-red-500"
                  : "text-yellow-400"
              }`}
            >
              {product.stock} left
            </span>
          </div>
        ))}

        {/* Empty State */}
        {data.length === 0 && (
          <p className="text-sm text-gray-500 text-center">
            No low stock items 🎉
          </p>
        )}
      </div>

    </div>
  );
}