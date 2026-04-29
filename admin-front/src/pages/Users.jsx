import { useEffect, useState } from "react";
import UserTable from "../components/users/UserTable";
import UserDetailModal from "../components/users/UserDetailModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState";
import { Users as UsersIcon, ShieldCheck, UserMinus } from "lucide-react";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // Simulate API Fetch
    setTimeout(() => {
      setUserList([
        { id: "fd34848a", email: "nibm@gmail.com", role: "customer", is_active: true, date_joined: "2026-04-25", total_orders: 5, total_spent: 1200 },
        { id: "fhg4848a", email: "nib@gmail.com", role: "customer", is_active: false, date_joined: "2026-04-25", total_orders: 0, total_spent: 0 },
        { id: "fdgh848a", email: "nibt@gmail.com", role: "admin", is_active: true, date_joined: "2026-04-12", total_orders: 12, total_spent: 4500 },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm">Monitor accounts and assign permissions</p>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard icon={<UsersIcon size={20}/>} label="Total Users" value={userList.length} color="text-blue-500" />
        <StatCard icon={<ShieldCheck size={20}/>} label="Admins" value={userList.filter(u => u.role === 'admin').length} color="text-purple-500" />
        <StatCard icon={<UserMinus size={20}/>} label="Blocked" value={userList.filter(u => !u.is_active).length} color="text-red-500" />
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : userList.length === 0 ? (
        <EmptyState message="No users registered yet" subtext="Customer accounts will appear here once they sign up." />
      ) : (
        <UserTable data={userList} onView={(user) => { setSelectedUser(user); setIsOpen(true); }} />
      )}

      <UserDetailModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={selectedUser} />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="p-4 rounded-2xl bg-[#020617]/40 border border-slate-800/50 flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-slate-900 ${color}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}