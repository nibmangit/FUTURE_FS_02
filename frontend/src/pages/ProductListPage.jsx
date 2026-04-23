import { Search } from "lucide-react" 
import ProductCard from "../components/ProductCard"   
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import LoadingScreen from '../pages/LoadingScreen'
import { useCategories } from "../hooks/useCategories";
import { useDebounce } from "../hooks/useDebounce";

function ProductListPage({filter,setFilter}) {
  const [searchTerm, setSearchTerm] = useState(''); 
  const debouncedSearch = useDebounce(searchTerm, 700);
  const [page, setPage] = useState(1);
  const { categories } = useCategories();
  const { products, isProductLoading, error, next, previous, count } = useProducts({
    page,
    category: filter,
    search: debouncedSearch,
  });  

  const pageSize = 20;
  const totalPages = Math.ceil(count / pageSize);

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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setPage(1);
                    }}
                    placeholder="Search for gadgets..."  
                    className="w-full py-3 pl-12 pr-4 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:ring-cyan-500 focus:border-cyan-500"
                  />
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
        
                <div className="flex space-x-2 overflow-x-auto pb-1">
                  
                    <button 
                      onClick={() => {
                        setFilter(null);
                        setPage(1);
                      }}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                        !filter
                          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      All
                    </button>

                    {categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setFilter(cat.slug);
                        setPage(1);
                      }}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                        filter === cat.slug
                          ? "bg-cyan-600 text-white"
                          : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {cat.name} {/* UI still shows name */}
                    </button>
                  ))}
                   
                </div>
              </div>
        
      {isProductLoading?(
        <LoadingScreen fullScreen={false} message="Updating products..." />
      ) : products?.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          {error || "No products found"}
        </div>
      ) : (
        <>
        <div className="text-gray-400 text-sm mb-4">
          {count} products found
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}  
            />
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-4 items-center">

            <button
              onClick={() => setPage((p) => p - 1)}
              disabled={page === 1}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                previous
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Prev
            </button>

            <span className="text-white">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition duration-200 cursor-pointer ${
                next
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              }`}
            >
              Next
            </button>

          </div>
        </>
      )} 
      </main>
    )
}

export default ProductListPage
