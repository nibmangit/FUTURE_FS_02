import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import ProductTable from "../components/products/ProductTable";
import ProductFormModal from "../components/products/ProductFormModal";
import DeleteConfirmModal from "../components/products/DeleteConfirmModal";
import TableSkeleton from "../components/common/TableSkeleton";
import ProductDetailDrawer from "../components/products/ProductDetailDrawer";
 
function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setProducts([
        { id: "1", title: "Apple AirPods Max Silver","description": "The Samsung Galaxy S8 is a premium smartphone with an Infinity Display, offering a stunning visual experience. It boasts advanced camera capabilities and cutting-edge technology.", category: { id: 1, name: "Electronics" }, price: "1200.00", stock: 4, image: "https://via.placeholder.com/50", created_at: "2026-04-20" },
        { id: "2", title: "Samsung Galaxy S7", category: { id: 2, name: "Phones" }, price: "800.00", stock: 0, image: "https://via.placeholder.com/50", created_at: "2026-04-18" },
        { id: "3", title: "HP Pro Book 440", category: { id: 2, name: "Laptops" }, price: "61000.00", stock: 3, image: "https://via.placeholder.com/50", created_at: "2026-04-18" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

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

  const handleDeleteConfirm = (id) => {
    console.log("DELETE PRODUCT ID:", id);
    setIsDeleteOpen(false);
  };

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Products</h1>
          <p className="text-slate-500 text-sm">Manage your inventory and pricing</p>
        </div>

        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : (
        <ProductTable
          data={products}
          onView={handleView}
          onEdit={handleEdit }
          onDelete={handleDeleteClick}
        />
      )}

      <ProductDetailDrawer
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        product={selectedProduct}
        onEdit={handleEdit}
      />

      <ProductFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} product={selectedProduct} />
      <DeleteConfirmModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} product={selectedProduct} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default Products;