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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-md">
       <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto border border-gray-800 relative transform transition-all p-4 sm:p-8 md:p-10">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800 z-10"
        >
          <X size={24} />
        </button>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
           <div className="rounded-xl overflow-hidden bg-gray-800/50 flex items-center justify-center p-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-auto max-h-75 md:max-h-full object-contain"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x450/1e293b/a5f3fc?text=${product.category}`; }}
            />
          </div>

           <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-medium text-cyan-400 uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
              {product.name}
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 mb-4 sm:mb-6">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8 line-clamp-4 md:line-clamp-none">
              {product.description}
            </p>

             <div className="mt-auto">
              <div className="flex flex-wrap items-center gap-4 mb-6 sm:mb-8">
                <label htmlFor="quantity" className="text-gray-300 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-700 rounded-lg bg-gray-800/30">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled = {quantity<=1}
                    className="p-2 text-gray-300 hover:bg-gray-700 rounded-l-lg transition disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center text-white font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-2 text-gray-300 hover:bg-gray-700 rounded-r-lg transition cursor-pointer"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                className="w-full py-3 sm:py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-lg 
                  rounded-xl shadow-lg transition duration-200 active:scale-[0.98] cursor-pointer"
              >
                Add to Cart
              </button>

              <button 
                onClick={handleClose}
                className="mt-4 flex items-center text-gray-500 hover:text-cyan-400 transition group cursor-pointer"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                <span className="text-sm font-medium">Return Back</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;