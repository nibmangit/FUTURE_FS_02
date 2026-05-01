import { useState, useEffect, useCallback } from "react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import productService from "../api/productService";
import { useHeader } from "../context/HeaderContext";

import ProductTable from "../components/products/ProductTable";
import ProductFormModal from "../components/products/ProductFormModal";
import DeleteConfirmModal from "../components/products/DeleteConfirmModal";
import TableSkeleton from "../components/common/TableSkeleton";
import ProductDetailDrawer from "../components/products/ProductDetailDrawer";
import toast from "react-hot-toast";
import ProductFilters from "../components/products/ProductFilters";
 
function Products() {
  const {setHeader}= useHeader()
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const itemsPerPage = 20;

  const [activeFilters, setActiveFilters] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = useCallback(async (pageNumber, filters = {}) => {
    try {
      setLoading(true);
      const data = await productService.getProducts({
         page: pageNumber, ...filters
        });
      setProducts(data.results); 
      setTotalProducts(data.count);
    } catch {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { 

    const loadData = async () => {
      setLoading(true); 
      await fetchProducts(currentPage, activeFilters);
    };

    loadData(); 
  }, [currentPage, fetchProducts, activeFilters]);

  useEffect(() => {
      setHeader(
        "Products", 
        "Manage your inventory and pricing", 
        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <Plus size={18} />
          Add Product
        </button>
      );
    }, []);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await productService.deleteProduct(id);
      toast.success("Product removed");
      if (products.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else {
      fetchProducts(currentPage);
    }
    } catch(err) {
     if (err.response?.status === 500) {
       toast.error("Cannot delete: This product is linked to existing orders.");
    } else {
       toast.error("Delete failed.");
    }
  } finally {
    setIsDeleteOpen(false);
  }
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  return (
    <div className="space-y-8 pb-10"> 

      <ProductFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <>
          <ProductTable
            data={products}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />

          {/* Pagination Controls */}
          <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-4 rounded-2xl mt-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Showing Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      <ProductDetailDrawer
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onEdit={handleEdit}
      />

      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} onSuccess={() => fetchProducts(currentPage)} />
      <DeleteConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} product={selectedProduct} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default Products;