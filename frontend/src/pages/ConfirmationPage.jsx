import { useNavigate } from "react-router-dom"
import { CheckCircle,Package } from "lucide-react";
function ConfirmationPage({confirmationId}) {
    const navigate = useNavigate();
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> 
      <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true">
      <main className="container mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh]">
          <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800 shadow-xl">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-400 text-lg mb-4">
              Thank you for shopping with MiniTech. Your order details have been saved to your history.
            </p>
            <p className="text-xl font-bold text-cyan-400 mb-8">
              Order ID: <span className="text-white bg-gray-800 px-3 py-1 rounded-lg">{confirmationId}</span>
            </p>
      
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigate('/orderhistory')}
              className="mt-4 w-full text-gray-400 hover:text-cyan-400 transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Package size={20} />
              <span>View Order History</span>
            </button>
          </div>
        </main>
        </div>
        </div>
    )
}

export default ConfirmationPage
