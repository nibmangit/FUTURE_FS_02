import {X, Minus, Plus} from 'lucide-react'; 
import { useCartContext } from '../hooks/useCartContext';
import { useProducts } from '../hooks/useProducts';

function CardItem({ item }) {
  const { updateCartItem } = useCartContext();
  const { products } = useProducts();
  const product = products.find(p => p.id === item.id) || item;

  const handleQuantityChange = (change) => {
    updateCartItem(item.id, item, change);
  };

  const handleRemove = () => {
    updateCartItem(item.id, {}, -item.quantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-800 last:border-b-0">
       <div className="flex items-center gap-4 w-full sm:w-auto grow">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-20 h-20 sm:w-16 sm:h-16 object-contain rounded-lg shrink-0 bg-gray-800 p-1"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/64x64/1e293b/a5f3fc?text=Tech`; }}
        />
        <div className="flex flex-col">
          <h3 className="text-gray-100 font-semibold line-clamp-1">{product.name}</h3>
          <p className="text-cyan-400 font-medium sm:hidden">${item.price.toFixed(2)} each</p>
        </div>
         
        <button onClick={handleRemove} className="sm:hidden ml-auto text-gray-500 p-2">
          <X size={20} />
        </button>
      </div>
 
      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">
        <div className="flex items-center space-x-3 bg-gray-800/50 rounded-full px-2 py-1">
          <button 
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
            className="p-1.5 rounded-full text-white hover:bg-gray-700 disabled:opacity-30 transition disabled:cursor-not-allowed cursor-pointer"
          >
            <Minus size={18} />
          </button>
          <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
          <button 
            onClick={() => handleQuantityChange(1)}
            className="p-1.5 rounded-full text-white hover:bg-gray-700 disabled:opacity-30 transition disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-col items-end min-w-20">
          <span className="text-xs text-gray-500 hidden sm:block">Total</span>
          <div className="font-bold text-lg text-white">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
 
        <button 
          onClick={handleRemove}
          className="hidden sm:block text-gray-500 hover:text-red-500 transition p-1 cursor-pointer"
          title='Remove'
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardItem
