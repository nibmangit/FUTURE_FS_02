import { useCallback, useEffect, useState } from "react";
import { Users as UsersIcon, ShieldCheck, UserMinus, ChevronRight, ChevronLeft } from "lucide-react";
import UserTable from "../components/users/UserTable";
import UserDetailModal from "../components/users/UserDetailModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState";
import toast from "react-hot-toast";
import { userService } from "../api/userService";

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);

  const [userStats, setUserStats] = useState({
    total: 0,
    active: 0,
    admins: 0,
    blocked: 0
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const itemsPerPage = 3;

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers({ page: currentPage });
      setUserList(data.results || []);
      setTotalUsers(data.count || 0);

      if (data.stats) {
        setUserStats({
          total: data.stats.total_users,
          active: data.stats.active_users,
          admins: data.stats.admin_users,
          blocked: data.stats.blocked_users
        });
      }
    } catch  {
      toast.error("Failed to sync user database");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalPages = Math.ceil(totalUsers / itemsPerPage);

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm">Monitor accounts and assign permissions</p>
        </div>
      </div>

      {/* Mini Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <StatCard icon={<UsersIcon size={20}/>} label="Total Users" value={userStats.total} color="text-blue-500" />
        <StatCard icon={<ShieldCheck size={20}/>} label="Active" value={userStats.active} color="text-emerald-500" />
        <StatCard icon={<ShieldCheck size={20}/>} label="Admins" value={userStats.admins} color="text-purple-500" />
        <StatCard icon={<UserMinus size={20}/>} label="Blocked" value={userStats.blocked} color="text-red-500" />
      </div>

      {loading ? (
        <TableSkeleton rows={5} />
      ) : userList.length === 0 ? (
        <EmptyState message="No users registered yet" subtext="Customer accounts will appear here once they sign up." />
      ) : (
        <>
        <UserTable data={userList} onView={(user) => { setSelectedUser(user); setIsOpen(true); }} />

          <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-4 rounded-2xl mt-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Database Page {currentPage} of {totalPages || 1}
            </p>
            <div className="flex gap-2">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </>
      )}

      <UserDetailModal isOpen={isOpen} onClose={() => setIsOpen(false)} user={selectedUser} onUpdate={fetchUsers} />
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="p-2 rounded-2xl bg-[#020617]/40 border border-slate-800/50 flex items-center gap-2">
      <div className={`p-3 rounded-xl bg-slate-900 ${color}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</p>
        <p className="text-xl font-black text-white">{value}</p>
      </div>
    </div>
  );
}