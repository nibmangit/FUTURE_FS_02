import apiPrivate from "./axiosPrivate";

const productService = { 
  getProducts: async (params) => {
    const response = await apiPrivate.get(`/admin/products/`, {params});
    return response.data;
  },
 
  getProductById: async (id) => {
    const response = await apiPrivate.get(`/admin/products/${id}/`);
    return response.data;
  },
 
  createProduct: async (formData) => {
    const response = await apiPrivate.post("/admin/products/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
 
  updateProduct: async (id, formData) => {
    const response = await apiPrivate.patch(`/admin/products/${id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
 
  deleteProduct: async (id) => {
    const response = await apiPrivate.delete(`/admin/products/${id}/`);
    return response.data;
  },
};

export default productService;