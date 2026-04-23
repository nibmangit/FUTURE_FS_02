import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import orderService from "../api/orderService";

function ConfirmationPage() {
  const navigate = useNavigate();

  const [latestOrder, setLatestOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch latest order
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await orderService.getOrders();

        if (orders.length > 0) {
          setLatestOrder(orders[0]); // latest (already sorted)
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const orderId = latestOrder?.id || "Loading...";

  return ( 
    <div className="min-h-[80vh] flex items-center justify-center p-4 sm:p-6 lg:p-8"> 
      <div className="absolute inset-0 bg-gray-950 -z-10" /> 
      <main className="w-full max-w-xl">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 text-center border border-gray-800 shadow-2xl relative overflow-hidden">
           
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-500/10 blur-3xl rounded-full"></div>

          <CheckCircle size={80} className="text-green-500 mx-auto mb-6 animate-in zoom-in duration-500" />
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Payment Successful!
          </h1>
          
          <p className="text-gray-400 text-base sm:text-lg mb-8 leading-relaxed">
            Thank you for shopping with <span className="text-white font-medium">MiniTech</span>. 
            Your payment has been received and your order is now being processed.
          </p>

          <div className="bg-gray-800/50 rounded-2xl p-4 sm:p-6 mb-10 border border-gray-700/50">
            <span className="text-xs uppercase tracking-widest text-gray-500 block mb-2">
              Order ID
            </span>
            <span className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 break-all">
              {loading ? "Loading..." : orderId}
            </span>
          </div>

          {/* OPTIONAL STATUS */}
          {latestOrder && (
            <p className="text-sm text-gray-400 mb-6">
              Status: <span className="text-green-400 font-semibold capitalize">{latestOrder.status}</span>
            </p>
          )}
    
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate('/products')}
              className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              Continue Shopping
            </button>
            
            <button
              onClick={() => navigate('/orderhistory')}
              className="w-full py-3 text-gray-400 hover:text-white transition flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <Package size={20} />
              <span>View Order History</span>
              <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs mt-8">
          A confirmation email will be sent to your account shortly.
        </p>
      </main>
    </div>
  );
}

export default ConfirmationPage;