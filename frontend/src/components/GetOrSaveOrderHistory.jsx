import {HISTORY_KEY} from '../data/getKey';

export const saveOrderToHistory = (cartItems, total, userEmail) => {
  const history = getOrderHistory();
  const newOrder = {
    id: Date.now().toString().slice(-8),
    date: new Date().toLocaleDateString('en-US'),
    total: total,
    items: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
    user: userEmail,
  };
  history.unshift(newOrder);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newOrder.id;
}; 


export const getOrderHistory = () => {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (e) {
    console.error("Error loading order history:", e);
    return [];
  }
};