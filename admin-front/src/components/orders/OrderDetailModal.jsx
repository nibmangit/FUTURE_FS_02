import { X, MapPin, Package, CreditCard, Clock, Loader2 } from "lucide-react";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import orderService from "../../api/orderService";

export default function OrderDetailModal({ isOpen, onClose, order, onStatusUpdate }) {
  const [fullOrder, setFullOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      if (isOpen && order?.id) {
        setLoading(true);
        try { 
          const data = await orderService.getOrderDetail(order.id);
          setFullOrder(data);
          setNewStatus(data.status);
        } catch{
          toast.error("Failed to load order details");
          onClose();
        } finally {
          setLoading(false);
        }
      }
    };

    getDetails();
  }, [isOpen, order?.id, onClose]);

  if (!isOpen || !order) return null;

  const handleUpdateStatus = async () => {
    setUpdating(true);
    try { 
      await orderService.updateOrderStatus(order.id, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      onStatusUpdate();
      onClose();
    } catch (err){
      toast.error(err.response?.data?.message || err.message || "Faild to update status");
    } finally {
      setUpdating(false);
    }
  };

  const sectionLabel = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#020617] border-l border-slate-800 shadow-2xl z-[110] flex flex-col transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Order Details</h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">ID: {order?.id}</p>
          </div>
          <button onClick={onClose} className="p-2 cursor-pointer hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617] z-20">
              <Loader2 className="text-blue-500 animate-spin mb-4" size={40} />
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Retrieving Secure Data...</p>
            </div>
          ) : fullOrder && (
            <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className={sectionLabel}><CreditCard size={12}/> Total Paid</div>
                <div className="text-2xl font-black text-emerald-400">
                  <span className="text-xl font-bold text-white whitespace-nowrap">
                    {Number(fullOrder.total_price).toLocaleString()} 
                    <span className="text-sm text-cyan-400 ml-1">ETB</span>
                  </span>
                </div>
             </div>
             <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className={sectionLabel}><Clock size={12}/> Status</div>
                <StatusBadge status={fullOrder.status} />
             </div>
          </div>

          {/* Customer & Shipping */}
          <section>
            <h3 className={sectionLabel}><MapPin size={12}/> Shipping Information</h3>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-slate-200 font-bold">{fullOrder.shipping_address?.full_name || "Guest User"}</p>
              <p className="text-sm text-slate-400">{fullOrder.shipping_address?.phone_number}</p>
              <p className="text-sm text-slate-400">
                {fullOrder.shipping_address?.city}, {fullOrder.shipping_address?.district}
              </p>
              <p className="text-xs text-slate-500 italic">{fullOrder.shipping_address?.specific_address}</p>
            </div>
          </section>

          {/* Order Items */}
          <section>
            <h3 className={sectionLabel}><Package size={12}/> Line Items</h3>
            <div className="space-y-3">
              {fullOrder.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-900/30 border border-slate-800/50 group hover:border-slate-700 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                    <img
                      src={`https://res.cloudinary.com/dahvdgqbf/image/upload/${item.product_image}`}
                      className="w-full h-full object-cover"
                      alt=""
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-200">{item.product_name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.quantity} units × {Number(item.price_at_purchase).toLocaleString()} 
                      <span className="text-sm text-cyan-400 ml-1">ETB</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-white">
                      {Number(item.subtotal).toLocaleString()} 

                      <span className="text-sm text-cyan-400 ml-1">ETB</span>
                      </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Admin Management Section */}
          <section className="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10">
             <h3 className={sectionLabel}><Package size={12}/> Update Fulfillment</h3>
             <div className="flex gap-3">
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="flex-1 bg-[#020617] cursor-pointer border border-slate-800 text-slate-300 p-3 rounded-xl focus:border-blue-500 outline-none"
                >
                   <option value="pending">Pending</option>
                   <option value="paid">Paid</option>
                   <option value="shipped">Shipped</option>
                   <option value="delivered">Delivered</option>
                   <option value="failed">Failed</option>
                </select>
                <button 
                  onClick={handleUpdateStatus}
                  disabled={updating || newStatus === order.status}
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer text-white px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2"
                >
                  {updating ? <Loader2 size={18} className="animate-spin" /> : "Save Changes"}
                </button>
             </div>
          </section>
          </>
          )}
        </div>
      </div>
    </>
  );
}