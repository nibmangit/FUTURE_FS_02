import { ChevronLeft, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import orderService from "../api/orderService";

function OrderHistoryPage({ userEmail }) {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  // FETCH ORDERS FROM BACKEND 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await orderService.getOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalItems = (items) =>
    items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
      
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8 border-b border-gray-800 pb-4">
        Order History for{" "}
        <span className="text-cyan-400">{userEmail}</span>
      </h1>
 
      {loading && (
        <div className="text-center text-gray-400 py-20">
          Loading orders...
        </div>
      )}
 
      {error && (
        <div className="text-center text-red-500 py-10">{error}</div>
      )}
 
      {!loading && orders.length === 0 && (
        <div className="text-center py-20 bg-gray-900 rounded-xl p-8 border border-gray-800">
          <Package size={48} className="text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-xl mb-4">
            No past orders found.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="text-cyan-400 hover:text-cyan-300 transition flex items-center justify-center mx-auto cursor-pointer"
          >
            <ChevronLeft size={20} className="mr-1" />
            Start Shopping
          </button>
        </div>
      )}
 
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-gray-800 pb-3 mb-3">
              <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                <Package size={20} className="text-cyan-400" />
                <span>
                  Order{" "}
                  <span className="text-cyan-400">#{order.id}</span>
                </span>
              </h3>

              <span className="text-xl font-black text-white tabular-nums">
                {Number(order.total_price).toLocaleString()} 
                <span className="text-xs text-gray-500 ml-1 font-normal">ETB</span>
              </span>
            </div>

            {/* META */}
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>
                <span className="text-gray-600">Date:</span>{" "}
                {new Date(order.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </span>
              <span>Total Items: <span className="text-white font-medium">{totalItems(order.items)}</span></span>
            </div>

            {/* ITEMS */}
            <div className="space-y-2 text-sm">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-gray-300 bg-gray-800/50 p-2 rounded"
                >
                  <span>
                    {item.product_title} × {item.quantity}
                  </span>

                  <span className="font-bold text-white whitespace-nowrap tabular-nums">
                    {Number(item.subtotal).toLocaleString()} <span className="text-[10px] text-gray-500">ETB</span>
                  </span>
                </div>
              ))}
            </div>

            {/* STATUS */}
            <div className="mt-4 text-xs">
              <span
                className={`px-3 py-1 rounded-full ${
                  order.status === "paid"
                    ? "bg-green-500/10 text-green-400"
                    : order.status === "pending"
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/products")}
        className="mt-8 text-gray-400 hover:text-cyan-400 transition flex items-center space-x-1 cursor-pointer"
      >
        <ChevronLeft size={20} />
        <span>Back to Products</span>
      </button>
    </main>
  );
}

export default OrderHistoryPage;