import { useState, useEffect } from "react";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState";

function Orders() {
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate API Fetch
    setTimeout(() => {
      const data = [
        { id: "30e6e652-bc4a-4034-8153-f99ab1966532", user_email: "nibretumengaw@gmail.com", total_price: "92000.00", status: "failed", created_at: "2026-04-26T09:24:53.326487Z" },
        { id: "fd7035f7-31a2-4c98-a577-0b00922b00a3", user_email: "d2708071@gmail.com", total_price: "6000.00", status: "delivered", created_at: "2026-04-23T18:59:29.349106Z" },
        { id: "1be34165-42d6-41f2-beed-1eed4780e02a", user_email: "d2708071@gmail.com", total_price: "6300.00", status: "paid", created_at: "2026-04-21T21:01:55.695703Z" },
      ];
      setOrderList(data);
      setLoading(false);
    }, 1500);
  }, []);

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">Orders</h1>
        <p className="text-slate-500 text-sm font-medium">Track and fulfill customer purchases</p>
      </div>

      <OrderFilters />

      {loading ? (
        <TableSkeleton rows={6} />
      ) : orderList.length === 0 ? (
        <EmptyState 
          message="No orders found" 
          subtext="When customers buy products, their orders will appear here." 
        />
      ) : (
        <OrderTable data={orderList} onView={handleView} />
      )}
 
      <OrderDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={selectedOrder}
      />
    </div> 
  );
}

export default Orders;