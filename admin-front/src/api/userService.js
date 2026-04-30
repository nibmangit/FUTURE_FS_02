import apiPrivate from "../../../frontend/src/api/axiosPrivate";
import apiPublic from "./axiosPublic"

export const loginUser = async (email, password) => {
  return apiPublic.post("/users/login/", {  email, password,});
};

export const getCurrentUser = async () => {
  return apiPrivate.get("/users/me/");
};