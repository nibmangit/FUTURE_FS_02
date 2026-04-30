
import { useEffect, useState } from "react";
import { ShoppingBag, Clock, CheckCircle, Banknote } from "lucide-react";
import { getDashboardStats } from "../api/dashboardService";

import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";
import TableSkeleton from "../components/common/TableSkeleton";
import toast from "react-hot-toast";
 
function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        console.log(res.data);
        setData(res.data);
      } catch {
        toast.error("Failed to sync dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <TableSkeleton />;

return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-white">Dashboard Overview</h1> 
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={data.order_summary?.total} icon={ShoppingBag} />
        <StatCard title="Total Revenue" value={Number(data.total_revenue).toLocaleString()} color="text-blue-400" icon={Banknote} symbol="ETB" />
        <StatCard title="Pending" value={data.order_summary?.pending} color="text-amber-400" icon={Clock} />
        <StatCard title="Delivered" value={data.order_summary?.delivered} color="text-emerald-400" icon={CheckCircle} /> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-3 flex flex-col">
          <RevenueChart data={data.daily_revenue} />
        </div>
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TopProducts data={data.top_products} />
          <LowStock data={data.low_stock} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;