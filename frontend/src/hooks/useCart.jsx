import { useCallback, useEffect, useState, useMemo } from "react";
import cartService from "../api/cartService";
import { useAuth } from "../hooks/useAuth"; 

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const {user }= useAuth()

  // 1. FETCH CART
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setCart(data);
    } catch (err) {
      console.error("Fetch cart error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
  if (user) {
    fetchCart();
  }
}, [user, fetchCart]);

  // 2. ADD TO CART
  const updateCartItem = useCallback(async (productId, quantity) => {
    const data = await cartService.addToCart(productId, quantity);
    setCart(data);
  }, []);

  // 3. UPDATE QUANTITY
  const updateQuantity = useCallback(async (productId, quantity, action) => {
    const data = await cartService.updateCart(productId, quantity, action);
    setCart(data);
  }, []);

  // 4. REMOVE ITEM
  const removeItem = useCallback(async (productId) => {
    const data = await cartService.removeItem(productId);
    setCart(data);
  }, []);

  // 5. CLEAR (frontend only reset)
  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  // 6. DERIVED VALUES (NO LOGIC, ONLY READ)
  const cartItems = cart?.items || [];

  const cartTotal = useMemo(() => {
    return cart?.total_price || "0.00";
  }, [cart]);

  const cartItemCount = useMemo(() => {
    return cart?.total_quantity || 0;
  }, [cart]);

  const getItemQuantity = useCallback((productId) => {
  const item = cartItems.find(item => item.product.id === productId);
  return item ? item.quantity : 0;
  }, [cartItems]);

  return {
    cart,
    cartItems,
    cartTotal,
    cartItemCount,
    updateCartItem,
    updateQuantity,
    removeItem,
    clearCart,
    fetchCart,
    loading,
    getItemQuantity,
  };
};

export default useCart;