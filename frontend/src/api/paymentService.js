import apiPrivate from "./axiosPrivate";
 
const initializePayment = async (order_id) => {
  const res = await apiPrivate.post("/payments/initiate/", {
    order_id,
  });

  return res.data;
}; 

const paymentService = {
  initializePayment,
};

export default paymentService;