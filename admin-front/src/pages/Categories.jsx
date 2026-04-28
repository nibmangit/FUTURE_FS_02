import { useState } from "react";
import CategoryTable from "../components/categories/CategoryTable";
import CategoryFormModal from "../components/categories/CategoryFormModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";

const categories = [
    { id: "1", name: "Smart Watches", slug: "smart-watches" },
    { id: "2", name: "Phones", slug: "phones" },
    { id: "3", name: "Laptops", slug: "Laptops" },
    { id: "4", name: "Gadget & Gears", slug: "gadget-gears" },
  ];

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  

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
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Categories</h1>

        <button 
        onClick={handleAdd}
        className="bg-blue-600 px-4 py-2 rounded">
          + Add Category
        </button>
      </div>

       <CategoryTable
          data={categories}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        <CategoryFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          category={selectedCategory}
        /> 

        <DeleteCategoryModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          category={selectedCategory}
        />

    </div>
  );
}

export default Categories