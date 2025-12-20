import { Plus, Minus, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

function ProductDetailModal({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, isProductLoading } = useProducts();
  const [quantity, setQuantity] = useState(1);
  const product = products.find((p) => p.id === id);

  const handleClose = () => navigate('/products');

  const handleAdd = () => {
    if (product) {
      onAddToCart(product, quantity);
      handleClose();
    }
  };

  if (isProductLoading) return <LoadingScreen />;
  if (!product) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950 text-white p-4">
        <div className="text-center">
          <p className="mb-4">Product not found.</p>
          <button onClick={handleClose} className="text-cyan-400 underline cursor-pointer">Return to Shop</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-110 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md">
      {/* Container: Full width on mobile, rounded/centered on desktop */}
      <div className="bg-gray-900 sm:rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] sm:h-auto max-h-[95vh] flex flex-col overflow-hidden border-t sm:border border-gray-800 relative transform transition-all">
        
        {/* Close Button - Larger touch target for mobile */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition p-3 sm:p-2 rounded-full bg-gray-900/50 sm:hover:bg-gray-800 z-20"
        >
          <X size={24} />
        </button>

        {/* Scrollable Content Wrapper */}
        <div className="overflow-y-auto p-5 sm:p-8 md:p-10 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* LEFT: Image - Scaled for mobile viewports */}
            <div className="rounded-xl overflow-hidden bg-gray-800/50 flex items-center justify-center p-4 min-h-b2.5 sm:min-h-87.85">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto max-h-[40vh] md:max-h-full object-contain"
                onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x450/1e293b/a5f3fc?text=${product.category}`; }}
              />
            </div>

            {/* RIGHT: Content */}
            <div className="flex flex-col text-left h-full">
              <span className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight uppercase italic">
                {product.name}
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4 sm:mb-6">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Bottom Actions - mt-auto keeps them at bottom on large screens */}
              <div className="mt-auto pt-6 border-t border-gray-800/50">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <label htmlFor="quantity" className="text-gray-300 font-bold uppercase text-xs tracking-widest">Quantity</label>
                  <div className="flex items-center border border-gray-700 rounded-full bg-gray-800/30 p-1">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="p-2 text-gray-300 hover:text-cyan-400 transition disabled:opacity-20 cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-10 text-center text-white font-black">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(q => q + 1)}
                      className="p-2 text-gray-300 hover:text-cyan-400 transition cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <button 
                  onClick={handleAdd}
                  className="w-full py-4 bg-white text-black hover:bg-cyan-400 font-black text-sm uppercase tracking-widest 
                    rounded-full shadow-xl transition-all duration-300 active:scale-[0.97] cursor-pointer"
                >
                  Add to Cart
                </button>

                <button 
                  onClick={handleClose}
                  className="mt-6 w-full flex items-center justify-center text-gray-500 hover:text-white transition group cursor-pointer"
                >
                  <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                  <span className="text-[10px] font-black uppercase tracking-widest">Return Back</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
      `}</style>
    </div>
  );
}

export default ProductDetailModal;