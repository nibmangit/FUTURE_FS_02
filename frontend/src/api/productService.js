import apiPublic from "./axiosPublic";

const productService = {
  // Get all products
  getProducts: async () => {
    const response = await apiPublic.get("/store/products/");
    return response.data;
  },

  // (future use) Get single product
  getProductById: async (id) => {
    const response = await apiPublic.get(`/store/products/${id}/`);
    return response.data;
  },
};

export default productService;