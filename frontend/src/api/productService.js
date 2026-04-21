import apiPublic from "./axiosPublic";

const productService = {
  
  getProducts: async () => {
    const response = await apiPublic.get("/store/products/");
    return response.data;
  },
 
  getProductById: async (id) => {
    const response = await apiPublic.get(`/store/products/${id}/`);
    return response.data;
  },
};

export default productService;