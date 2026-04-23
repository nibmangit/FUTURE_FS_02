import { useState, useCallback } from "react";
import orderService from "../api/orderService";
import paymentService from "../api/paymentService";

const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startCheckout = useCallback(async (shippingData) => {
    try {
      setLoading(true);
      setError(null);

      // =========================
      // 1. CREATE ORDER
      // =========================
      const order = await orderService.checkout(shippingData);

      const orderId = order.order_id;

      if (!orderId) {
        throw new Error("Order ID missing");
      }

      // =========================
      // 2. INITIALIZE PAYMENT
      // =========================
      const payment = await paymentService.initializePayment(orderId);

      const checkoutUrl = payment.checkout_url;

      if (!checkoutUrl) {
        throw new Error("Payment URL not received");
      }

      // =========================
      // 3. REDIRECT TO CHAPA
      // =========================
      window.location.href = checkoutUrl;

    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    startCheckout,
    loading,
    error,
  };
};

export default useCheckout;