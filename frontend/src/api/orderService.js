import apiPrivate from "./axiosPrivate";
 
const getAddress = async () => {
  const res = await apiPrivate.get("/orders/addresses/");
  return res.data;
};

const updateAddress = async (data) => {
  const res = await apiPrivate.put("/orders/addresses/", data);
  return res.data;
};
 
const checkout = async (shippingData) => {
  const res = await apiPrivate.post("/orders/checkout/", shippingData);
  return res.data;
};
 
const getOrders = async () => {
  const res = await apiPrivate.get("/orders/");
  return res.data;
};
 
const orderService = {
  getAddress,
  updateAddress,
  checkout,
  getOrders,
};

export default orderService;