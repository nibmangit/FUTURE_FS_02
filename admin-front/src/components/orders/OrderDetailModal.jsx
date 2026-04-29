import { X, MapPin, Package, CreditCard, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

const orderdetail = 
  {
    id: "a4e5b1ce-9737-4e22-922b-6fa129d4dfdf",
    user_email: "d2708071@gmail.com",
    total_price: "6900.00",
    status: "paid",
    created_at: "2026-04-21T20:32:57.897932Z",
    shipping_address: {
        id: 1,
        full_name: "Nib Man",
        phone_number: "0903500000",
        city: "Bahir Dar",
        district: "Kebele 10",
        specific_address: "Poly",
        is_default: false
    },
    items: [
        {
            id: "d6ff5edb-4e56-4895-8dbc-599d6ea944ee",
            product: "51aa59a8-d0a2-43dc-9809-6f40e119dd60",
            product_name: "Apple AirPods Max Silver",
            product_image: "lokelanfrcf3qnjjbem6",
            quantity: 3,
            price_at_purchase: "2300.00",
            subtotal: 6900.0
        },
        {
            id: "d6ff5edb-4e56-4895-8dbc-599d6ea944ee",
            product: "51aa59a8-d0a2-43dc-9809-6f40e119dd60",
            product_name: "Apple AirPods Max Silver",
            product_image: "lokelanfrcf3qnjjbem6",
            quantity: 3,
            price_at_purchase: "2300.00",
            subtotal: 6900.0
        }
    ]
}

export default function OrderDetailModal({ isOpen, onClose, order }) {
  order = orderdetail
  if (!isOpen || !order) return null;

  const sectionLabel = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-xl bg-[#020617] border-l border-slate-800 shadow-2xl z-[110] flex flex-col transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Order Details</h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">{order.id}</p>
          </div>
          <button onClick={onClose} className="p-2 cursor-pointer hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
             <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className={sectionLabel}><CreditCard size={12}/> Total Paid</div>
                <div className="text-2xl font-black text-emerald-400">
                  <span className="text-xl font-bold text-white whitespace-nowrap">
                    {Number(order.total_price).toLocaleString()} 
                    <span className="text-sm text-cyan-400 ml-1">ETB</span>
                  </span>
                </div>
             </div>
             <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800">
                <div className={sectionLabel}><Clock size={12}/> Status</div>
                <StatusBadge status={order.status} />
             </div>
          </div>

          {/* Customer & Shipping */}
          <section>
            <h3 className={sectionLabel}><MapPin size={12}/> Shipping Information</h3>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-2">
              <p className="text-slate-200 font-bold">{order.shipping_address?.full_name || "Guest User"}</p>
              <p className="text-sm text-slate-400">{order.shipping_address?.phone_number}</p>
              <p className="text-sm text-slate-400">
                {order.shipping_address?.city}, {order.shipping_address?.district}
              </p>
              <p className="text-xs text-slate-500 italic">{order.shipping_address?.specific_address}</p>
            </div>
          </section>

          {/* Order Items */}
          <section>
            <h3 className={sectionLabel}><Package size={12}/> Line Items</h3>
            <div className="space-y-3">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-900/30 border border-slate-800/50 group hover:border-slate-700 transition-colors">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden border border-slate-700">
                    <img
                      src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${item.product_image}`}
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
          <section className="pt-6 border-t border-slate-800">
             <h3 className={sectionLabel}>Fulfillment Management</h3>
             <div className="flex gap-3">
                <select className="flex-1 bg-slate-900 border border-slate-800 text-slate-300 p-3 rounded-xl focus:outline-none focus:border-blue-500">
                   <option value="pending">Mark as Pending</option>
                   <option value="shipped">Mark as Shipped</option>
                   <option value="delivered">Mark as Delivered</option>
                </select>
                <button className="bg-blue-600 cursor-pointer hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20">
                  Update
                </button>
             </div>
          </section>
        </div>
      </div>
    </>
  );
}