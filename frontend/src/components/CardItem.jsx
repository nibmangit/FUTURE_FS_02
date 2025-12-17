import {X, Minus, Plus} from 'lucide-react';
import { MOCK_PRODUCTS } from "../data/products";

function CardItem({item}) {
    const product = MOCK_PRODUCTS.find(p => p.id === item.id) || item;
    const quantity = 3;
    return (
        <div className="flex items-center space-x-4 p-4 border-b border-gray-800 last:border-b-0">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/1e293b/a5f3fc?text=${product.category.slice(0, 1)}`; }}
                />
                <div className="grow">
                  <h3 className="text-gray-100 font-semibold">{product.name}</h3>
                  <p className="text-cyan-400 font-medium">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <button 
                    disabled={quantity <= 1}
                    className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-50 transition"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-5 text-center">{quantity}</span>
                  <button 
                    className="p-1 rounded-full hover:bg-gray-700 transition"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="font-bold text-lg w-20 text-right text-white">
                  ${(item.price * quantity).toFixed(2)}
                </div>
                <button 
                  className="text-gray-500 hover:text-red-500 transition p-1"
                >
                  <X size={18} />
                </button>
              </div>
    )
}

export default CardItem
