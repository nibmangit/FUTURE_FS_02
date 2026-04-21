import apiPrivate from "./axiosPrivate";

const cartService = {
  // 1. GET CART
  getCart: async () => {
    const res = await apiPrivate.get("/store/cart/");
    return res.data;
  },

  // 2. ADD ITEM
  addToCart: async (productId, quantity) => {
    const res = await apiPrivate.post("/store/cart/add/", {
      product_id: productId,
      quantity,
    });
    return res.data;
  },

  // 3. UPDATE ITEM
  updateCart: async (productId, quantity, action = "set") => {
    const res = await apiPrivate.put("/store/cart/add/", {
      product_id: productId,
      quantity,
      action,
    });
    return res.data;
  },

  // 4. REMOVE ITEM
  removeItem: async (productId) => {
    const res = await apiPrivate.delete(
      `/store/cart/remove/${productId}/`
    );
    return res.data;
  },
};

export default cartService;