import { useState, useEffect } from "react";

export default function CategoryFormModal({isOpen,  onClose, category, }) {

  const [form, setForm] = useState({
    name: "", 
  });

  // Prefill for edit
  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "", 
      });
    } else {
      setForm({ name: ""});
    }
  }, [category]);  

  const handleSubmit = () => { 
        console.log("Submitting Category:", form);
        onClose(); 
    };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] w-full max-w-md p-6 rounded-xl border border-gray-800 text-white shadow-2xl">
        
        {/* Modal Header */}
        <h2 className="text-xl font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h2>

        {/* Form Body */}
        <div className="space-y-4">
          <label className="text-sm text-gray-400">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g. Electronics, Home & Kitchen"
            className="w-full p-2.5 rounded bg-[#0f172a] border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
            autoFocus
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>

          <button 
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            {category ? "Update Category" : "Save Category"}
          </button>
        </div>

      </div>
    </div>
  );
}