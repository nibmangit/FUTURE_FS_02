import { useEffect, useState } from "react";
import productService from "../../api/productService";
import toast from "react-hot-toast";
import categoryService from "../../api/categoryService";
import { Loader2 } from "lucide-react";

export default function ProductFormModal({ isOpen, onClose, product, onSuccess }) {
  const [form, setForm] = useState({ title: "", description: "", category_id: "", price: "", stock: "", image: null });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoryService.getAllCategories(); 
        setCategories(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };

    if (isOpen) {
      fetchCategories();
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
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!form.category_id || !form.title || !form.description || !form.price || !form.stock) {
      return toast.error("Please Please fill all fields");
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category_id", form.category_id);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    
    // Only append image if the user actually selected a new file
    if (form.image) {
      formData.append("image", form.image);
    } 

    try {
      if (product) {
        await productService.updateProduct(product.id, formData);
        toast.success("Product updated successfully");
      } else {
        await productService.createProduct(formData);
        toast.success("New product initialized");
      }
      onSuccess(); // Refresh the list in Products.jsx
      onClose();
    } catch (err) {
      toast.error("Operation failed. Check your data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const inputClass = "w-full p-3 rounded-xl bg-slate-900 border border-slate-800 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all text-slate-200 placeholder:text-slate-600";

  return (
    <div className="fixed inset-0 bg-[#020617]/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form 
          onSubmit={handleSubmit} 
          className="bg-[#0f172a] w-full max-w-xl max-h-[90vh] overflow-y-auto p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Glow effect inside modal */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
        
        <h2 className="text-2xl font-black text-white mb-6">{product ? "Edit Product" : "New Product"}</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Product Title</label>
            <input name="title" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="e.g. AirPods Max" className={inputClass} />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Description</label>
            <textarea name="description" rows="3" value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} className={inputClass} />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Category</label>
            <select 
              required
              className={inputClass}
              value={form.category_id}
              onChange={(e) => setForm({...form, category_id: e.target.value})}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Price (ETB)</label>
            <input type="number" name="price" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className={inputClass} />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Inventory Stock</label>
            <input type="number" name="stock" value={form.stock} onChange={(e) => setForm({...form, stock: e.target.value})} className={inputClass} />
          </div>

          <div className="col-span-2">
            <label className="text-[10px] font-black uppercase text-slate-500 ml-1 mb-1 block">Thumbnail</label>
            <div className={`mt-1 flex items-center justify-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-2xl transition-colors cursor-pointer ${form.image ? 'border-blue-500 bg-blue-500/5' : 'border-slate-800 hover:border-blue-500/50'}`}>
              <input 
                type="file" 
                className="hidden" 
                id="file-upload" 
                accept="image/*"
                onChange={(e) => setForm({...form, image: e.target.files[0]})}
              />
              <label htmlFor="file-upload" className="text-sm text-slate-400 cursor-pointer text-center">
                {form.image ? (
                  <span className="text-blue-400 font-bold">✓ {form.image.name}</span>
                ) : (
                  "Select product image"
                )}
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 sticky bottom-0 bg-[#0f172a] pt-4">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-2.5 text-slate-400 font-bold cursor-pointer hover:text-white transition-colors"
          >
            Cancel
          </button>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 min-w-[160px] px-8 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>PROCESSING...</span>
              </>
            ) : (
              product ? "Save Changes" : "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}