import {ChevronLeft} from 'lucide-react';
import CardItem from "../components/CardItem";
import { useNavigate } from 'react-router-dom';
import {useCartContext} from '../hooks/useCartContext';

function CartPage({isLoggedIn}) {
  const { cartItems, cartTotal, cartItemCount, updateCartItem} = useCartContext();
   const navigate = useNavigate();  

    return (
        <main className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-10 border-b border-gray-800 pb-4">
                Your Shopping Cart ({cartItemCount})
              </h1>
        
              {cartItems.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-xl mb-4">Your cart is empty.</p>
                  <button 
                    onClick={()=>navigate('/')}
                    className="text-cyan-400 hover:text-cyan-300 transition flex items-center justify-center mx-auto cursor-pointer"
                  >
                    <ChevronLeft size={20} className="mr-1" /> Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                  
                  <div className="lg:col-span-2 bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl">
                    {cartItems.map(item => <CardItem key={item.id} item={item} updateCartItem={updateCartItem} />)}
                  </div>
         
                  <div className="lg:col-span-1 bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-xl self-start">
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-800 pb-3">
                      Order Summary
                    </h2>
                    <div className="space-y-4 text-gray-300">
                      <div className="flex justify-between">
                        <span>Subtotal ({cartItemCount} items)</span>
                        <span className="font-medium text-white">${cartTotal}</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-800 pt-4">
                        <span className="text-xl font-bold text-cyan-400">Total</span>
                        <span className="text-xl font-extrabold text-white">${cartTotal}</span>
                      </div>
                    </div>

                    {!isLoggedIn && (
                    <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-cyan-700/50">
                        <p className="text-sm text-cyan-400 font-medium">
                            You must be logged in to proceed to checkout.
                        </p>
                        <button
                            onClick={() => navigate('/authform')}
                            className="w-full mt-3 py-2 text-cyan-300 border border-cyan-500 rounded-lg hover:bg-cyan-700/30 transition cursor-pointer"
                        >
                            Login / Sign Up
                        </button>
                    </div>
                )}
                  <button 
                    onClick={()=>{navigate('/checkout')}}
                    disabled={!isLoggedIn}
                    className={`w-full mt-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg rounded-xl shadow-lg transition 
                      duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cyan-500/50 
                      disabled:cursor-not-allowed cursor-pointer`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </main>
    )
}

export default CartPage
