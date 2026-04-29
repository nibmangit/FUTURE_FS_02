export default function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 ring-amber-500/20",
    paid: "bg-blue-500/10 text-blue-500 ring-blue-500/20",
    shipped: "bg-purple-500/10 text-purple-500 ring-purple-500/20",
    delivered: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20",
    failed: "bg-red-500/10 text-red-500 ring-red-500/20",
  };

  return (
    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ring-1 ring-inset ${styles[status]}`}>
      {status}
    </span>
  );
}