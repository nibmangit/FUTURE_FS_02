import { X, Minus, Plus } from "lucide-react";
import { useCartContext } from "../hooks/useCartContext"; 

function CardItem({ item }) {
  const { updateQuantity, removeItem } = useCartContext(); 

  const product = item.product;

  const handleIncrement = () => {
    updateQuantity(product.id, 1, "increment");
  };

  const handleDecrement = () => {
    updateQuantity(product.id, 1, "decrement");
  };

  const handleRemove = () => {
    removeItem(product.id);
  };

  const isDecrementDisabled = item.quantity <= 1;
  const isIncrementDisabled = item.quantity >= product.stock;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border-b border-gray-800 last:border-b-0">

      {/* PRODUCT */}
      <div className="flex items-center gap-4 w-full sm:w-auto grow">
        <img
          src={product.image}
          alt={product.title}
          className="w-20 h-20 sm:w-16 sm:h-16 object-contain rounded-lg shrink-0 bg-gray-800 p-1"
        />

        <div className="flex flex-col">
          <h3 className="text-gray-100 font-semibold line-clamp-1">
            {product.title}
          </h3>

          <p className="text-cyan-400 font-medium sm:hidden">
            ${product.price} each
          </p>

          <span className="text-xs text-gray-500">
            Stock: {product.stock}
          </span>
        </div>

        <button
          onClick={handleRemove}
          className="sm:hidden ml-auto text-gray-500 p-2"
        >
          <X size={20} />
        </button>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6">

        {/* quantity */}
        <div className="flex items-center space-x-3 bg-gray-800/50 rounded-full px-2 py-1">

          <button
            onClick={handleDecrement}
            disabled={isDecrementDisabled}
            className="p-1.5 rounded-full text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus size={18} />
          </button>

          <span className="w-6 text-center font-bold text-white">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrement}
            disabled={isIncrementDisabled}
            className="p-1.5 rounded-full text-white hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
          </button>
        </div>

        {/* total */}
        <div className="flex flex-col items-end min-w-20">
          <span className="text-xs text-gray-500 hidden sm:block">
            Total
          </span>

          <div className="font-bold text-lg text-white">
            ${(product.price * item.quantity).toFixed(2)}
          </div>
        </div>

        {/* remove */}
        <button
          onClick={handleRemove}
          className="hidden sm:block text-gray-500 hover:text-red-500 transition p-1"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}

export default CardItem;