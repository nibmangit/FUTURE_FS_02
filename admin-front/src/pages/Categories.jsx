import { useState, useEffect } from "react";
import { FolderPlus } from "lucide-react";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState"; 

function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      // Simulate network delay
      setTimeout(() => {
        const data = [
          { id: "1", name: "Smart Watches", slug: "smart-watches" },
          { id: "2", name: "Phones", slug: "phones" },
          { id: "3", name: "Laptops", slug: "laptops" },
        ];
        // Toggle this to [] to test the EmptyState
        setCategories(data); 
        setLoading(false);
      }, 1200);
    };
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

  const handleDeleteConfirm = (id) => {
    console.log("DELETE CATEGORY:", id); 
    setIsDeleteOpen(false);
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
      <CategoryFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} category={selectedCategory} /> 
      <DeleteCategoryModal isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} category={selectedCategory} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default Categories