import { useNavigate } from "react-router-dom";

function ProductCard({product}) {  
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    return (
        <div className="bg-gray-900/70 p-4 rounded-xl shadow-xl border border-gray-800 flex flex-col transition duration-300 hover:shadow-cyan-900/30 h-full">
            <div 
                onClick={handleNavigate}
                className="relative overflow-hidden rounded-lg mb-4 cursor-pointer"
            >
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg transform transition duration-500 hover:scale-125"
                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/1e293b/a5f3fc?text=${product.category}`; }}
                />
            </div>

            <div className="flex flex-col grow">
                <span className="text-xs font-medium text-cyan-400 uppercase tracking-wider mb-1">
                    {product.category}
                </span>
                
                {/* Added line-clamp-1 to keep titles uniform if they are long */}
                <h3
                    onClick={handleNavigate}
                    className="text-lg font-semibold text-gray-100 mb-2 cursor-pointer hover:text-cyan-400 transition line-clamp-1"
                >
                    {product.name}
                </h3>

                {/* Changed items-center to items-end and added flex-wrap for long prices */}
                <div className="flex items-end justify-between mt-auto pt-2 flex-wrap gap-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white whitespace-nowrap">
                            {Number(product.price).toLocaleString()} 
                            <span className="text-sm text-cyan-400 ml-1">ETB</span>
                        </span>
                    </div>

                    <button 
                        onClick={handleNavigate}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-medium rounded-lg 
                            shadow-md transition duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 
                            focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-950 cursor-pointer whitespace-nowrap"
                    >
                     View
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard