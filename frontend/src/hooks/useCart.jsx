import { useCallback, useEffect, useMemo, useState } from 'react';
import {STORAGE_KEY} from '../data/getKey'

const useCart = () => { 
  const getInitialCart = () => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEY);
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Error parsing cart from localStorage:", e);
      return [];
    }
  };

  const [cartItems, setCartItems] = useState(getInitialCart);
 
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error("Error saving cart to localStorage:", e);
    }
  }, [cartItems]);

  const updateCartItem = useCallback((productId, productDetails, quantityChange) => {
    setCartItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === productId);
      const existingItem = existingIndex > -1 ? prevItems[existingIndex] : { quantity: 0 };
      const newQuantity = existingItem.quantity + quantityChange;

      if (newQuantity <= 0) {
        
        return prevItems.filter(item => item.id !== productId);
      } else {
        const newItem = {
          ...productDetails,
          id: productId,
          quantity: newQuantity,
        };

        if (existingIndex > -1) { 
          return prevItems.map((item, index) =>
            index === existingIndex ? newItem : item
          );
        } else { 
          return [...prevItems, newItem];
        }
      }
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  return { cartItems, cartTotal, cartItemCount, updateCartItem, clearCart, isLoading: false };
};

export default useCart;