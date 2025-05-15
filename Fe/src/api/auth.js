import axiosClient from "./axios";

export const registerApi = (data) => {
   return axiosClient.post('/register', data);
}

export const loginApi = (data) => {
   return axiosClient.post('/login', data);
}