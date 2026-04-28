import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";

export default function Dashboard() {
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={data.order_summary.total} />
        
        <StatCard
          title="Total Revenue"
          value={`$${data.total_revenue.toLocaleString()}`}
          color="text-green-400"
        />

        <StatCard
          title="Pending Orders"
          value={data.order_summary.pending}
          color="text-yellow-400"
        />

        <StatCard
          title="Delivered Orders"
          value={data.order_summary.delivered}
          color="text-blue-400"
        /> 
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data.daily_revenue} />
        </div>
        <TopProducts data={data.top_products} />
      </div>
        <LowStock data={data.low_stock} />
    </div>
  );
}