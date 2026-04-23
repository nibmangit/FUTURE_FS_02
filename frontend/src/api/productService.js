import apiPublic from "./axiosPublic";

const productService = {
  
  getProducts: async ({ page = 1, category = null, search = "" }) => {
    const params = { page };
    if (category ){
      params.category = category
    }

    if (search && search.trim() !== "") {
      params.search = search;
    }
    const response = await apiPublic.get("/store/products/",{
      params,
    });
    return response.data;
  },
 
  getProductById: async (id) => {
    const response = await apiPublic.get(`/store/products/${id}/`);
    return response.data;
  },

  getCategories: async () =>{
    const res = await apiPublic.get("/store/categories/");
    return res.data
  }
};

export default productService;