import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react";
function ConfirmationPage() {
    const navigate = useNavigate();
    return (
        <main className="container mx-auto max-w-xl px-4 sm:px-6 lg:px-8 py-20 min-h-[60vh]">
            <div className="bg-gray-900 rounded-xl p-12 text-center border border-gray-800 shadow-xl">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
              <h1 className="text-4xl font-extrabold text-white mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-gray-400 text-lg mb-8">
                Thank you for shopping with MiniTech. The cart is now cleared.
              </p>
        
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl shadow-lg transition duration-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
              >
                Continue Shopping
              </button>
            </div>
          </main>
    )
}

export default ConfirmationPage
