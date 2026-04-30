import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export default function DeleteCategoryModal({ isOpen, onClose, onConfirm, category }) {

  const [isDeleting, setIsDeleting] = useState(false);
  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm(category.id);
      onClose()
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-60 p-4">
      <div className="bg-slate-900 w-full max-w-md p-8 rounded-3xl border border-red-500/20 shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-xl font-black text-white">Delete Category?</h2>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          Removing <span className="text-white font-bold">"{category?.name}"</span> might affect products linked to it. This action cannot be reversed.
        </p>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-slate-800 cursor-pointer hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
            Cancel
          </button>
          <button 
            onClick={handleConfirm} 
            disabled={isDeleting}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 cursor-pointer bg-red-600 hover:bg-red-500 disabled:bg-red-800 disabled:cursor-wait text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
          >
            {isDeleting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span className="tracking-wider">Deleting...</span>
              </>
            ) : (
              "Confirm Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}