export default function EmptyState({ message = "No data found" }) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 text-center">
      
      <p className="text-gray-400">{message}</p>

    </div>
  );
}