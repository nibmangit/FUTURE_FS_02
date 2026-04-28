import StatCard from "../components/dashboard/StatCard";
import RevenueChart from "../components/dashboard/RevenueChart";

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

        <RevenueChart data={data.daily_revenue} />
      </div>
    </div>
  );
}