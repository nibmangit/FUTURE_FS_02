 function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  category,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      
      <div className="bg-[#111827] w-full max-w-md p-6 rounded-xl border border-gray-800">
        
        {/* Title */}
        <h2 className="text-lg font-semibold text-red-400">
          Delete Category
        </h2>

        {/* Message */}
        <p className="text-gray-300 mt-3 text-sm">
          Are you sure you want to delete this category?
        </p>

        <p className="mt-2 font-medium text-white">
          {category?.name}
        </p>

        <p className="text-xs text-gray-500 mt-2">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(category?.id)}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}

export default DeleteCategoryModal;