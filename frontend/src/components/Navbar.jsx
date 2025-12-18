import {ShoppingBag} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../hooks/useCartContext';

function Navbar() { 
  const {cartItemCount} = useCartContext();
  const navigate = useNavigate(); 
  
  return (
      <header className="sticky top-0 z-10 w-full bg-gray-950/90 backdrop-blur-sm border-b border-gray-800 shadow-xl">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
            <div
              onClick={()=>{navigate("/")}}
              className="text-2xl font-bold tracking-tight text-cyan-400 cursor-pointer" 
            >
              <span className="text-gray-200">Mini</span>Tech Shop
            </div>
            <nav className="flex items-center space-x-6">
              <button
                onClick={()=>{navigate("/")}} 
                className="text-gray-400 hover:text-cyan-400 transition cursor-pointer"
              >
                Products
              </button>
              <button 
                onClick={()=>{navigate("/cart")}}
                className="relative text-gray-400 hover:text-cyan-400 transition cursor-pointer"
              >
                <ShoppingBag size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </header>
    )
}

export default Navbar
