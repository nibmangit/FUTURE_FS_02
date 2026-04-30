import { useState, useEffect } from "react";
import { FolderPlus } from "lucide-react";
import categoryService from "../api/categoryService";

import CategoryTable from "../components/categories/CategoryTable";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState"; 
import toast from "react-hot-toast";

function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const fetchCategories = async () => {
  try {
    setLoading(true);
    const data = await categoryService.getAllCategories(); 
    setCategories(Array.isArray(data) ? data : data.results || []);
  } catch {
    toast.error("Failed to load categories.");
  } finally {
    setLoading(false);
  }
};
 
useEffect(() => {
  fetchCategories();
}, []);

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (cat) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (cat) => {
    setSelectedCategory(cat);
    setIsDeleteOpen(true);
  };
  const handleSuccess = () => {
  fetchCategories(); 
};

  const handleDeleteConfirm = async(id) => {
    try{
      await categoryService.deleteCategory(id)
      toast.success("Category deleted successfully.");

      const updateData = await categoryService.getAllCategories();
      setCategories(updateData);
    }catch{
      toast.error("Could not delete category. It may be linked to products.")
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">Categories</h1>
          <p className="text-slate-500 text-sm">Organize your product catalog</p>
        </div>

        <button 
          onClick={handleAdd}
          className="flex items-center gap-2 bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <FolderPlus size={18} />
          New Category
        </button>
      </div>

      {/* --- STATE LOGIC --- */}
      {loading ? (
        <TableSkeleton rows={4} />
      ) : categories.length === 0 ? (
        <EmptyState 
          message="No categories yet" 
          subtext="Start by grouping your products into categories like 'Electronics' or 'Fashion'." 
        />
      ) : (
        <CategoryTable
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Modals */}
      <CategoryFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={selectedCategory} onSuccess={handleSuccess} /> 
      <DeleteCategoryModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} category={selectedCategory} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default Categories