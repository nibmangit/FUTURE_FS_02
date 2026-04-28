import { useState, useEffect } from "react";

export default function ProductFormModal({ isOpen, onClose, product }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    stock: "",
    image: null,
  });

  // Prefill logic
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "", 
        category_id: product.category?.id || "", 
        price: product.price || "",
        stock: product.stock || "",
        image: null,
      });
    } else { 
      setForm({ title: "", description: "", category_id: "", price: "", stock: "", image: null });
    }
  }, [product, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#111827] w-full max-w-lg p-6 rounded-xl border border-gray-800 text-white">
        
        <h2 className="text-lg font-semibold mb-4">
          {product ? "Edit Product" : "Add Product"}
        </h2>

        <div className="space-y-4">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            placeholder="Category ID"
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full p-2 rounded bg-[#0f172a] border border-gray-700 focus:outline-none focus:border-blue-500"
          />

          <input
            type="file"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            className="w-full text-sm text-gray-400"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Cancel
          </button>

          <button 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded transition-colors"
            onClick={() => console.log("Submitting:", form)}
          >
            {product ? "Update" : "Create"}
          </button>
        </div>

      </div>
    </div>
  );
}