
import apiPrivate from "./axiosPrivate";

const categoryService = {
  getAllCategories: async () => {
    const response = await apiPrivate.get("/admin/categories/"); 
    return response.data; 
  }
};

export default categoryService;