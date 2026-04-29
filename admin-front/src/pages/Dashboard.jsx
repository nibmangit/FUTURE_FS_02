
import { ShoppingBag, Clock, CheckCircle, Banknote } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";
const data = {
    order_summary: {
      total: 4,
      pending: 0,
      paid: 2,
      shipped: 0,
      delivered: 1,
    },
    total_revenue: 19200.0,
    daily_revenue: [
    { date: "2026-04-21", revenue: 1200.0 },
    { date: "2026-04-23", revenue: 3000.0 },
    { date: "2026-04-24", revenue: 11200.0 },
    { date: "2026-04-25", revenue: 6000.0 },
  ],
    top_products: [
    {
      id: "1",
      title: "Apple AirPods Max Silver",
      sold: 4,
    },
    {
      id: "2",
      title: "Rolex Datejust Women",
      sold: 3,
    },
    {
      id: "3",
      title: "Apple Airpods",
      sold: 2,
    },
  ],
    low_stock: [
    {
      id: "1",
      title: "Samsung Galaxy S7",
      stock: 0,
    },
    {
      id: "2",
      title: "Lenovo Yoga 920",
      stock: 2,
    },
    {
      id: "3",
      title: "Lenovo Yoga 920",
      stock: 2,
    },
  ],
  };
function Dashboard() {
  

return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-white">Dashboard Overview</h1> 
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={data.order_summary.total} icon={ShoppingBag} />
        <StatCard title="Total Revenue" value={Number(data.total_revenue).toLocaleString()} color="text-blue-400" icon={Banknote} symbol="ETB" />
        <StatCard title="Pending" value={data.order_summary.pending} color="text-amber-400" icon={Clock} />
        <StatCard title="Delivered" value={data.order_summary.delivered} color="text-emerald-400" icon={CheckCircle} /> 
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-3 flex flex-col">
          <RevenueChart data={data.daily_revenue} />
        </div>

        {/* Right: Actionable Lists (Takes 1/3 of space) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <TopProducts data={data.top_products} />
          <LowStock data={data.low_stock} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;