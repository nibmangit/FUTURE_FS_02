import { useState } from "react";
import ProductTable from "../components/products/ProductTable";
import ProductFormModal from "../components/products/ProductFormModal";
import DeleteConfirmModal from "../components/products/DeleteConfirmModal";

function Products() {

  const products = [
  {
    id: "1",
    title: "Apple AirPods Max Silver",
    category: { name: "Electronics" },
    price: "1200.00",
    stock: 4,
    image: "https://placeholder.co/50",
    created_at: "2026-04-20",
  },
  {
    id: "2",
    title: "Samsung Galaxy S7",
    category: { name: "Phones" },
    price: "800.00",
    stock: 0,
    image: "https://placeholder.co/50",
    created_at: "2026-04-18",
  },
];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Products</h1>

      <button onClick={handleAdd} className="bg-blue-600 px-4 py-2 rounded">
        + Add Product
      </button>
      <ProductTable
        data={products}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        product={selectedProduct}
      />
    </div>
  );
}

export default Products;