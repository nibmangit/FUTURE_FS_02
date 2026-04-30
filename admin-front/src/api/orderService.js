import apiPrivate from "./axiosPrivate";

const orderService = {
  getOrders: async (params = {}) => { 
    const response = await apiPrivate.get("/admin/orders/", { params });
    return response.data;
  },
  
  getOrderDetail: async (id) => {
    const response = await apiPrivate.get(`/admin/orders/${id}/`);
    return response.data;
  },

  updateOrderStatus: async (id, status) => {
    const response = await apiPrivate.patch(`/admin/orders/${id}/`, { status });
    return response.data;
  }
};

export default orderService;