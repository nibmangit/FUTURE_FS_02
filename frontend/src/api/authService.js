import apiPublic from './axiosPublic';
import apiPrivate from './axiosPrivate';

export const loginUser = async (email, password) => {
  return apiPublic.post("/users/login/", {
    email,
    password,
  });
};
 
export const registerUser = async (email, password) => {
  return apiPublic.post("/users/register/", {
    email,
    password,
  });
};
 
export const getCurrentUser = async () => {
  return apiPrivate.get("/users/me/");
};