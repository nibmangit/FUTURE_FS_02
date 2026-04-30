
import apiPrivate from "./axiosPrivate";

const categoryService = {
  getAllCategories: async () => {
    const response = await apiPrivate.get("/admin/categories/"); 
    return response.data; 
  },
  
  createCategory: async (data) => {
    const response = await apiPrivate.post("/admin/categories/", data);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const response = await apiPrivate.patch(`/admin/categories/${id}/`, data);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await apiPrivate.delete(`/admin/categories/${id}/`);
    return response.data;
  },
};

export default categoryService;