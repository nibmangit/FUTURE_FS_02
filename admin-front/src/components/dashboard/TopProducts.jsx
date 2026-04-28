export default function TopProducts({ data }) {
  return (
    <div className="bg-[#111827] p-5 rounded-xl border border-gray-800">
      
      <h2 className="text-lg font-semibold mb-4">Top Products</h2>

      <div className="space-y-3">
        {data.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-3 rounded-lg bg-[#0f172a] border border-gray-800"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400 w-5">
                #{index + 1}
              </span>

              <p className="text-sm text-gray-200">
                {product.title}
              </p>
            </div>

            {/* Right */}
            <div className="text-sm text-blue-400 font-medium">
              {product.sold} sold
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}