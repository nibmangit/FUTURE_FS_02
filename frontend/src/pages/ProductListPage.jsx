import { Search } from "lucide-react" 
import ProductCard from "../components/ProductCard"  
import FindCategory from "../components/ListCategory";
import { useState, useMemo  } from "react";
import { useProducts } from "../hooks/useProducts";
import LoadingScreen from '../pages/LoadingScreen'

function ProductListPage({filter,setFilter}) {
  const { products, isProductLoading, error } = useProducts();
  const [searchTerm, setSearchTerm] = useState(''); 
  
  const CATEGORIES = useMemo(() => FindCategory(products), [products]);
  const filteredProducts = useMemo(() => {
  const term = searchTerm.toLowerCase();

  return products.filter(p => {
    const matchesCategory = filter === 'All' || p.category === filter;
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term) ||
      p.price.toString().includes(term);
    return matchesCategory && matchesSearch;
  });
  }, [products, filter, searchTerm]);
  
  if (isProductLoading) return <LoadingScreen />;

    return (
        <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
              <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">
                Explore Our Tech Products
              </h1>
         
              <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative grow">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for gadgets..."  
                    className="w-full py-3 pl-12 pr-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
        
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                        filter === cat
                          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
        
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}  
            />
          ))}
        </div>
      )} 
      </main>
    )
}

export default ProductListPage
