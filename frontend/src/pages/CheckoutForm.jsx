import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import InputField from "../components/InputField";
import { useCartContext } from "../hooks/useCartContext";
import { ArrowLeft, Loader2 } from "lucide-react";

function CheckoutForm() {
  const { cartTotal, clearCart } = useCartContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({fullName: "", email: "", address: "",});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full Name is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid Email is required";
    if (!formData.address) newErrors.address = "Shipping Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSubmitting(false);
      clearCart();
      navigate('/confirmation');

    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"> 
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md" aria-hidden="true">
    <main className="container mx-auto max-w-lg px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
      <h1 className="text-4xl font-extrabold tracking-tight text-white mb-8">
        Checkout The Form Please
      </h1>
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-xl">
        <form onSubmit={handleSubmit}>
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Full Name"
            name="fullName"
            error={errors.fullName}
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Email Address"
            name="email"
            type="email"
            error={errors.email}
          />
          <InputField
            formData={formData}
            handleChange={handleChange}
            label="Shipping Address"
            name="address"
            error={errors.address}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 py-3 bg-cyan-600 hover:bg-cyan-500 cursor-pointer text-white font-semibold text-lg rounded-xl shadow-lg transition duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-cyan-500/50 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Order...
              </>
            ) : `Pay $${cartTotal}`}
          </button>
        </form>
        <button 
          onClick={()=>navigate(-1)}
          className="mt-4 text-left w-full text-gray-500 hover:text-white transition cursor-pointer">
         <ArrowLeft size={24} className="absolute" /> <span className="ml-7">Return Back </span>
        </button>
      </div>
    </main>
    </div>
    </div>
  );
}

export default CheckoutForm;
