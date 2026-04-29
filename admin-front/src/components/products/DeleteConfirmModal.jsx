import { AlertCircle } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, product }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
      <div className="bg-slate-900 w-full max-w-md p-8 rounded-3xl border border-red-500/20 shadow-2xl shadow-red-500/10">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20">
          <AlertCircle size={32} className="text-red-500" />
        </div>
        
        <h2 className="text-xl font-black text-white">Delete this item?</h2>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          You are about to remove <span className="text-white font-bold">"{product?.title}"</span>. This action is permanent and cannot be reversed.
        </p>

        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 px-4 py-3 bg-slate-800 cursor-pointer hover:bg-slate-700 text-white rounded-xl font-bold transition-all">
            Keep it
          </button>
          <button onClick={() => onConfirm(product?.id)} className="flex-1 px-4 py-3 bg-red-600 cursor-pointer hover:bg-red-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-600/20">
            Delete Now
          </button>
        </div>
      </div>
    </div>
  );
}