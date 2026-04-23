import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InputField from "../components/InputField";
import { useCartContext } from "../hooks/useCartContext";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import useCheckout from "../hooks/useCheckout";
import orderService from "../api/orderService";

function CheckoutForm() {
  const { cartTotal } = useCartContext();
  const navigate = useNavigate();

  const { startCheckout, loading, error } = useCheckout();
 
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    city: "",
    district: "",
    specific_address: ""
  });

  const [errors, setErrors] = useState({});
  const safeTotal = Number(cartTotal || 0).toFixed(2);
  
  // PREFILL ADDRESS (GET) 
  useEffect(() => {
    const loadAddress = async () => {
      try {
        const data = await orderService.getAddress();

        setFormData({
          full_name: data.full_name || "",
          phone_number: data.phone_number || "",
          city: data.city || "",
          district: data.district || "",
          specific_address: data.specific_address || ""
        });
      } catch (err) {
        console.error("Failed to load address:", err);
      }
    };

    loadAddress();
  }, []);

  const validate = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) newErrors.full_name = "Full Name is required";
    if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.specific_address.trim()) newErrors.specific_address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Save / update address
      await orderService.updateAddress(formData);

      // Proceed to checkout + payment
      await startCheckout(formData);
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-xl mx-auto">

        {/* BACK BUTTON */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-cyan-400 transition mb-6 group cursor-pointer"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Cart</span>
        </button>

        <div className="bg-gray-900 rounded-2xl p-6 sm:p-10 border border-gray-800 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/10 blur-3xl rounded-full"></div>
          
          <header className="relative z-10 mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Checkout
            </h1>
            <p className="text-gray-400 mt-2">Enter your shipping details.</p>
          </header>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6"> 
            
            {/* SHIPPING */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center">1</span>
                Shipping Details
              </h2>

              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Full Name"
                name="full_name"
                error={errors.full_name}
                placeholder="John Doe"
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Phone Number"
                name="phone_number"
                error={errors.phone_number}
                placeholder="0912345678"
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                label="City"
                name="city"
                error={errors.city}
                placeholder="Addis Ababa"
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                label="District"
                name="district"
                error={errors.district}
                placeholder="Bole"
              />

              <InputField
                formData={formData}
                handleChange={handleChange}
                label="Specific Address"
                name="specific_address"
                error={errors.specific_address}
                placeholder="Near XYZ building"
              />
            </div>

            {/* TOTAL */}
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                <span className="text-gray-400">Total to Pay:</span>
                <div className="text-right">
                  <span className="text-3xl font-black text-white tabular-nums">
                    {Number(safeTotal).toLocaleString()}
                  </span>
                  <span className="text-sm font-bold text-cyan-400 ml-2">ETB</span>
                </div>
              </div>

              {/* ERROR */}
              {error && (
                <p className="text-red-500 text-sm text-center mb-3">
                  {error}
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 cursor-pointer text-white font-bold text-lg rounded-xl shadow-lg shadow-cyan-900/40 transition-all duration-200 active:scale-[0.98] disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Redirecting...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={20} />
                    <span>Pay and Complete Order</span>
                  </>
                )}
              </button>
            </div>

          </form> 
        </div>
      </main>
    </div>
  );
}

export default CheckoutForm;