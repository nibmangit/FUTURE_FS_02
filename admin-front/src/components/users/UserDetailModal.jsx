import { X, Activity, ShoppingBag, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { userService } from "../../api/userService";

export default function UserDetailModal({ isOpen, onClose, user, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [fullUser, setFullUser] = useState(null);

  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (isOpen && user?.id) {
        setLoading(true);
        try {
          const data = await userService.getUserDetail(user.id);
          setFullUser(data);
          setRole(data.role);
          setIsActive(data.is_active);
        } catch  {
          toast.error("Failed to fetch account details");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDetails();
  }, [isOpen, user?.id]);

  const handleSaveChanges = async () => {
    setUpdating(true);
    try {
      await userService.updateUser(user.id, {
        role: role,
        is_active: isActive
      });
      toast.success("Account permissions updated");
      onUpdate(); 
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.detail || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

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
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#020617]">
               <Loader2 className="animate-spin text-blue-500" size={32} />
               <p className="text-[10px] text-slate-500 mt-4 uppercase font-black">Decrypting Account...</p>
            </div>
          ) : fullUser && (
            <> 
              {/* User ID Card */}
              <section>
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 text-blue-500 flex items-center justify-center border border-blue-500/20 text-2xl font-black">
                      {fullUser.email[0].toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{fullUser.email}</h3>
                      <p className="text-xs text-slate-500 uppercase tracking-widest font-black">{fullUser.role}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-800/50 pt-6">
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-600">Joined</p>
                      <p className="text-sm text-slate-300 font-medium">{new Date(fullUser.date_joined).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-slate-600">Account Type</p>
                      <p className="text-sm text-slate-300 font-medium capitalize">{fullUser.role}</p>
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
                      <p className="text-xl font-black text-white">{fullUser.total_orders || 0}</p>
                      <p className="text-[9px] font-bold uppercase text-slate-500">Orders</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-900/30 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">ETB</div>
                    <div>
                      <p className="text-xl font-black text-white">
                        {Number(fullUser.total_spent || 0).toLocaleString()} 

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
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 focus:outline-none focus:border-blue-500">
                      <option value="customer">Customer Access</option>
                      <option value="staff">Staff/Editor Access</option>
                      <option value="admin">Super Admin Access</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-900/30 rounded-xl border border-slate-800">
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">Login Authorization</p>
                    <p className="text-[10px] text-slate-500 uppercase font-black">Toggle Account Access</p>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`w-12 h-6 rounded-full transition-all duration-300 flex items-center p-1 cursor-pointer ${
                      isActive ? 'bg-blue-600 justify-end' : 'bg-slate-700 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-lg" />
                  </button>
                </div>

                  <button 
                    onClick={handleSaveChanges}
                    disabled={updating || (role === fullUser.role && isActive === fullUser.is_active)}
                    className="w-full cursor-pointer bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white py-3.5 rounded-xl font-black shadow-lg shadow-blue-600/20 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    {updating ? <Loader2 className="animate-spin" size={18} /> : "Finalize Permissions"}
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