import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import InputField from "../components/InputField";
import { useCartContext } from "../hooks/useCartContext";
import { ArrowLeft, Loader2, ShieldCheck, CreditCard, Landmark } from "lucide-react";
import { saveOrderToHistory } from "../components/GetOrSaveOrderHistory";

function CheckoutForm({ userEmail, setConfirmationId }) {
  const { cartItems, cartTotal, clearCart } = useCartContext();
  const navigate = useNavigate();
   
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [formData, setFormData] = useState({ 
    fullName: "", 
    email: userEmail || "", 
    address: "", 
    cardNumber: "",
    expiry: "",
    cvv: "", 
    accountName: "",
    accountNumber: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const safeTotal = Number(cartTotal || 0).toFixed(2);

  const validate = () => {
    const newErrors = {}; 
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.address.trim()) newErrors.address = "Shipping Address is required";
 
    if (paymentMethod === "creditCard") {
      if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required";
      if (!formData.expiry) newErrors.expiry = "Required";
      if (!formData.cvv) newErrors.cvv = "Required";
    } else {
      if (!formData.accountName) newErrors.accountName = "Account Name is required";
      if (!formData.accountNumber) newErrors.accountNumber = "Account Number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const orderId = saveOrderToHistory(cartItems, cartTotal, userEmail);
      setConfirmationId(orderId);
      setIsSubmitting(false);
      clearCart();
      navigate('/confirmation');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <main className="max-w-xl mx-auto">
        
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
            <p className="text-gray-400 mt-2">Enter your shipping and payment info.</p>
          </header>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6"> 
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center">1</span>
                Shipping Details
              </h2>
              <InputField
                formData={formData} handleChange={handleChange}
                label="Email Address" name="email" type="email"
                error={errors.email} placeholder="nibman@example.com"
              />
              <InputField
                formData={formData} handleChange={handleChange}
                label="Full Name" name="fullName"
                error={errors.fullName} placeholder="Nib Man"
              /> 
              <InputField
                formData={formData} handleChange={handleChange}
                label="Shipping Address" name="address"
                error={errors.address} placeholder="04 Poly, Bahir Dar"
              />
            </div>
 
            <div className="space-y-4 pt-4 border-t border-gray-800">
              <h2 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 text-xs flex items-center justify-center">2</span>
                Payment Method
              </h2>
              
              <div className="flex p-1 bg-gray-800 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("creditCard")}
                  className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold rounded-lg transition-all ${
                    paymentMethod === "creditCard" ? "bg-cyan-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <CreditCard size={18} /> Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex-1 py-3 flex items-center justify-center gap-2 text-sm font-bold rounded-lg transition-all ${
                    paymentMethod === "bank" ? "bg-cyan-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Landmark size={18} /> Bank Transfer
                </button>
              </div>
 
              <div className="mt-4 p-4 bg-gray-800/30 rounded-xl border border-gray-800 space-y-4 transition-all duration-300">
                {paymentMethod === "creditCard" ? (
                  <>
                    <InputField
                      label="Card Number" name="cardNumber" error={errors.cardNumber}
                      formData={formData} handleChange={handleChange} placeholder="0000 0000 0000 0000"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="Expiry" name="expiry" error={errors.expiry}
                        formData={formData} handleChange={handleChange} placeholder="MM/YY"
                      />
                      <InputField
                        label="CVV" name="cvv" error={errors.cvv}
                        formData={formData} handleChange={handleChange} placeholder="123"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <InputField
                      label="Account Owner Name" name="accountName" error={errors.accountName}
                      formData={formData} handleChange={handleChange} placeholder="John Doe"
                    />
                    <InputField
                      label="Account Number" name="accountNumber" error={errors.accountNumber}
                      formData={formData} handleChange={handleChange} placeholder="1000 232 43...."
                    />
                  </>
                )}
              </div>
            </div>
 
            <div className="pt-6">
              <div className="flex items-center justify-between mb-6 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/20">
                <span className="text-gray-400">Total to Pay:</span>
                <span className="text-3xl font-extrabold text-white">${safeTotal}</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 cursor-pointer text-white font-bold text-lg rounded-xl shadow-lg shadow-cyan-900/40 transition-all duration-200 active:scale-[0.98] disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
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