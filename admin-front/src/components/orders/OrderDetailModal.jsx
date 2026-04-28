import StatusBadge from "./StatusBadge";

export default function OrderDetailModal({isOpen,  onClose, order}) { 
  if (!isOpen || !order) return null;
 

  console.log(order.id);
  return (
    <div className="fixed inset-0 bg-black/60 flex justify-end z-50">
      
      {/* Side Panel */}
      <div className="w-full max-w-xl h-full bg-[#111827] p-6 overflow-y-auto border-l border-gray-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Order Details</h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-3 text-sm">
          <p>
            <span className="text-gray-400">Order ID:</span>{" "}
            {order.id}
          </p>

          <p>
            <span className="text-gray-400">User:</span>{" "}
            {order.user_email}
          </p>

          <p>
            <span className="text-gray-400">Status:</span>{" "}
            <StatusBadge status={order.status} />
          </p>

          <p>
            <span className="text-gray-400">Total:</span>{" "}
            <span className="text-green-400">
              ${Number(order.total_price).toLocaleString()}
            </span>
          </p>

          <p>
            <span className="text-gray-400">Date:</span>{" "}
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800" />

        {/* Shipping Address */}
        <div>
          <h3 className="font-semibold mb-3">Shipping Address</h3>

          {order.shipping_address ? (
            <div className="text-sm space-y-1 text-gray-300">
              <p>{order.shipping_address.full_name}</p>
              <p>{order.shipping_address.phone_number}</p>
              <p>
                {order.shipping_address.city},{" "}
                {order.shipping_address.district}
              </p>
              <p>{order.shipping_address.specific_address}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No address</p>
          )}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800" />

        {/* Items */}
        <div>
          <h3 className="font-semibold mb-3">Order Items</h3>

          <div className="space-y-3">
            {order.items?.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-[#0f172a] p-3 rounded border border-gray-800"
              >
                
                {/* Left */}
                <div className="flex gap-3 items-center">
                  
                  {/* Image (Cloudinary public_id) */}
                  <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden">
                    <img
                      src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${item.product_image}`}
                      alt={item.product_name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-sm">
                    <p>{item.product_name}</p>
                    <p className="text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right text-sm">
                  <p className="text-gray-400">
                    ${Number(item.price_at_purchase).toLocaleString()}
                  </p>
                  <p className="text-green-400 font-medium">
                    ${Number(item.subtotal).toLocaleString()}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-800" />

        {/* Status Update */}
        <div>
          <h3 className="font-semibold mb-3">Update Status</h3>

          <select
            defaultValue={order.status}
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700"
          >
            <option value="pending">pending</option>
            <option value="paid">paid</option>
            <option value="shipped">shipped</option>
            <option value="delivered">delivered</option>
            <option value="failed">failed</option>
          </select>

          <button className="mt-3 w-full bg-blue-600 py-2 rounded">
            Update Status
          </button>
        </div>

      </div>
    </div>
  );
}