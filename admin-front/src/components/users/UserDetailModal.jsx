import { X, Activity, DollarSign, ShoppingBag } from "lucide-react";

export default function UserDetailModal({ isOpen, onClose, user }) {
  if (!isOpen || !user) return null;

  const sectionLabel = "text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2";

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" onClick={onClose} />
      
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#020617] border-l border-slate-800 shadow-2xl z-[110] flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <h2 className="text-xl font-black text-white uppercase">Account Overview</h2>
          <button onClick={onClose} className="p-2 cursor-pointer hover:bg-slate-800 rounded-full transition-colors text-slate-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          
          {/* User ID Card */}
          <section>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center border border-blue-500/20 text-2xl font-black">
                  {user.email[0].toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{user.email}</h3>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-black">{user.role}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-slate-800/50 pt-6">
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-600">Joined</p>
                  <p className="text-sm text-slate-300 font-medium">{new Date(user.date_joined).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-600">Account Type</p>
                  <p className="text-sm text-slate-300 font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Activity Stats */}
          <section>
            <h3 className={sectionLabel}><Activity size={12}/> Engagement Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><ShoppingBag size={14}/></div>
                <div>
                  <p className="text-xl font-black text-white">{user.total_orders || 0}</p>
                  <p className="text-[9px] font-bold uppercase text-slate-500">Orders</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500"><DollarSign size={14}/></div>
                <div>
                  <p className="text-xl font-black text-white">
                    {Number(user.total_spent || 0).toLocaleString()} 

                      <span className="text-sm text-cyan-400 ml-1">ETB</span>
                    </p>
                  <p className="text-[9px] font-bold uppercase text-slate-500">Spent</p>
                </div>
              </div>
            </div>
          </section>

          {/* Management Actions */}
          <section className="pt-6 border-t border-slate-800">
            <h3 className={sectionLabel}>Administrative Controls</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-500 uppercase mb-2 block">Change User Role</label>
                <select className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:border-blue-500">
                  <option value="customer">Customer Access</option>
                  <option value="staff">Staff/Editor Access</option>
                  <option value="admin">Super Admin Access</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                <div>
                  <p className="text-sm font-bold text-white">Active Status</p>
                  <p className="text-[10px] text-slate-500 uppercase font-black">Allow account access</p>
                </div>
                <input type="checkbox" className="w-5 h-5 accent-blue-600 rounded" defaultChecked={user.is_active} />
              </div>

              <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                Save Account Changes
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}