import { Plus, Minus, X } from "lucide-react";
import { MOCK_PRODUCTS } from "../data/products";


function ProductDetailModal({onClose}) {
    const product = MOCK_PRODUCTS.find(p=>p.id ==1) 

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-sm">
              <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 border border-gray-800 relative transform transition-all duration-300 scale-100">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-gray-800"
                >
                  <X size={24} />
                </button>
        
                <div className="grid md:grid-cols-2 gap-8"> 
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-auto object-cover"
                      onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/600x450/1e293b/a5f3fc?text=${product.category}`; }}
                    />
                  </div>
         
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-2">
                      {product.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white mb-3">{product.name}</h2>
                    <p className="text-4xl font-extrabold text-cyan-400 mb-6">${product.price.toFixed(2)}</p>
                    <p className="text-gray-400 mb-8 grow">{product.description}</p>
        
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-4 mb-8">
                      <label htmlFor="quantity" className="text-gray-300 font-medium">Quantity:</label>
                      <div className="flex items-center border border-gray-700 rounded-lg">
                        <button 
                          className="p-2 text-gray-300 hover:bg-gray-700 rounded-l-lg transition"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="w-10 text-center text-white font-medium">2</span>
                        <button 
                          className="p-2 text-gray-300 hover:bg-gray-700 rounded-r-lg transition"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
         
                    <button 
                      className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-lg rounded-xl shadow-lg transition duration-200 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                    >
                      Add 2 to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default ProductDetailModal
