import {X, Minus, Plus} from 'lucide-react';
import { MOCK_PRODUCTS } from "../data/products";
import { useCartContext } from '../hooks/useCartContext';

function CardItem({item}) {
    const {updateCartItem} = useCartContext();
    const product = MOCK_PRODUCTS.find(p => p.id === item.id) || item;

    const handleQuantityChange = (change) => {
      const fullDetails = MOCK_PRODUCTS.find(p => p.id === item.id) || { name: item.name, price: item.price, imageUrl: item.imageUrl, category: item.category };
      updateCartItem(item.id, fullDetails, change);
    };
    
    const handleRemove = () => {
      updateCartItem(item.id, {}, -item.quantity);
    };

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
                    onClick={() => handleQuantityChange(-1)}
                    disabled={item.quantity <= 1}
                    className="p-1 rounded-full hover:bg-gray-700 disabled:opacity-50 transition cursor-pointer"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-5 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-1 rounded-full hover:bg-gray-700 transition cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="font-bold text-lg w-20 text-right text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button 
                  onClick={handleRemove}
                  className="text-gray-500 hover:text-red-500 transition p-1 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
    )
}

export default CardItem
