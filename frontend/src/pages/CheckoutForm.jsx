import { useState } from "react";
import {useNavigate } from 'react-router-dom';
import InputField from "../components/InputField";

function CheckoutForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
  });
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
      navigate('/confirmation')

    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing Order...
              </>
            ) : (
              "Place Order"
            )}
          </button>
        </form>
        <button className="mt-4 w-full text-gray-500 hover:text-white transition cursor-pointer">
          Return to Cart
        </button>
      </div>
    </main>
  );
}

export default CheckoutForm;
