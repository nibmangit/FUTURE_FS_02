import {ChevronLeft} from 'lucide-react';
import CardItem from "../components/CardItem";
import { useNavigate } from 'react-router-dom';
import {useCartContext} from '../hooks/useCartContext';

function CartPage({isLoggedIn}) {
  const { cartItems, cartTotal, cartItemCount, updateCartItem} = useCartContext();
  const navigate = useNavigate();  

  return (
    <main className="container mx-auto max-w-6xl px-4 py-6 sm:py-10 min-h-[70vh]">
      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 sm:mb-10 border-b border-gray-800 pb-4">
        Your Shopping Cart 
        <span className="ml-2 text-lg sm:text-2xl font-normal text-gray-500">({cartItemCount})</span>
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-900/50 rounded-2xl border border-dashed border-gray-800">
          <p className="text-gray-400 text-xl mb-6">Your cart is empty.</p>
          <button 
            onClick={()=>navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-cyan-400 rounded-xl transition cursor-pointer"
          >
            <ChevronLeft size={20} className="mr-2" /> Start Exploring
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8"> 
          <div className="lg:grow space-y-4">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-xl overflow-hidden">
              {cartItems.map(item => (
                <CardItem key={item.id} item={item} updateCartItem={updateCartItem} />
              ))}
            </div>
            
            <button 
              onClick={()=>navigate('/')}
              className="hidden sm:flex items-center text-gray-500 hover:text-cyan-400 transition mt-4 cursor-pointer"
            >
              <ChevronLeft size={20} className="mr-1" /> Back to Products
            </button>
          </div>
 
          <aside className="lg:w-80 xl:w-96">
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl lg:sticky lg:top-24">
              <h2 className="text-xl font-bold text-white mb-6 border-b border-gray-800 pb-3">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal({cartItemCount}) Items</span>
                  <span className="font-medium text-white">${cartTotal}</span>
                </div> 
                <div className="flex justify-between border-t border-gray-800 pt-4">
                  <span className="text-xl font-bold text-cyan-400">Total</span>
                  <span className="text-xl font-extrabold text-white">${cartTotal}</span>
                </div>
              </div>

              {!isLoggedIn && (
                <div className="mt-6 p-4 bg-cyan-950/20 rounded-xl border border-cyan-700/30">
                  <p className="text-sm text-cyan-400 font-medium text-center mb-3">
                    Login to complete purchase
                  </p>
                  <button
                    onClick={() => navigate('/authform', { state: { from: '/cart' } })}
                    className="w-full py-2 bg-transparent border border-cyan-500 text-cyan-400 rounded-lg hover:bg-cyan-500/10 transition cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}

              <button 
                onClick={() => navigate('/checkout')}
                disabled={!isLoggedIn}
                className="w-full mt-6 py-4 bg-cyan-600 hover:bg-cyan-500 cursor-pointer disabled:bg-gray-700 text-white font-bold text-lg rounded-xl shadow-lg transition duration-200 active:scale-[0.98] disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export default CartPage
