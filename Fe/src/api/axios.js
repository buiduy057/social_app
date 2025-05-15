import axios from "axios";

// Tạo instance Axios riêng
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Thêm interceptor để tự động thêm token vào mỗi request
axiosClient.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage (hoặc từ Redux, Context tùy cách bạn quản lý)
    const token = localStorage.getItem("token");

    if (token) {
      // Gắn token vào header Authorization
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Có thể thêm interceptor response để xử lý lỗi chung
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Ví dụ: xử lý khi token hết hạn
    if (error.response?.status === 401) {
      // Xử lý logout hoặc refresh token ở đây
      console.log("Unauthorized! Token expired or invalid.");
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
