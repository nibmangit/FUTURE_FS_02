import apiPrivate from "./axiosPrivate";
import apiPublic from "./axiosPublic"

export const loginUser = async (email, password) => {
  return apiPublic.post("/admin/admin-login/", {  email, password,});
};

export const getCurrentUser = async () => {
  return apiPrivate.get("/users/me/");
};

export const userService = { 
  getUsers: async (params) => {
    const response = await apiPrivate.get("/admin/users/", { params });
    return response.data;
  },
 
  getUserDetail: async (id) => {
    const response = await apiPrivate.get(`/admin/users/${id}/`);
    return response.data;
  },
 
  updateUser: async (id, payload) => {
    const response = await apiPrivate.patch(`/admin/users/${id}/`, payload);
    return response.data;
  }
}; 