import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import OrderFilters from "../components/orders/OrderFilters";
import OrderTable from "../components/orders/OrderTable";
import OrderDetailModal from "../components/orders/OrderDetailModal";
import TableSkeleton from "../components/common/TableSkeleton";
import EmptyState from "../components/common/EmptyState";
import toast from "react-hot-toast";
import orderService from "../api/orderService";
import { useHeader } from "../context/HeaderContext";

function Orders() {
  const {setHeader}=useHeader();
  const [loading, setLoading] = useState(true);
  const [orderList, setOrderList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const itemsPerPage = 20;

  const [activeFilters, setActiveFilters] = useState({});

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      // Fetching from your real endpoint: http://localhost:8000/api/admin/orders/
      const data = await orderService.getOrders({
        ...activeFilters,
        page: currentPage
      });
      setOrderList( data.results || []);
      setTotalOrders(data.count || 0);
    } catch {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }, [activeFilters, currentPage]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    setHeader("Orders","Track and fulfill customer purchases");
  }, []);

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    setCurrentPage(1);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  return (
    <div className="space-y-4 pb-10"> 

      <OrderFilters onFilterChange={handleFilterChange} />

      {loading ? (
        <TableSkeleton rows={6} />
      ) : orderList.length === 0 ? (
        <EmptyState 
          message="No orders found" 
          subtext="When customers buy products, their orders will appear here." 
        />
      ) : (
        <>
        <OrderTable data={orderList} onView={handleView} />

        <div className="flex items-center justify-between bg-slate-900/40 backdrop-blur-md border border-slate-800/50 p-4 rounded-2xl mt-6">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              Showing Page {currentPage} of {totalPages || 1}
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
 
      <OrderDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        order={selectedOrder}
        onStatusUpdate={fetchOrders}
      />
    </div> 
  );
}

export default Orders;