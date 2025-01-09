import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL  // Define in .env.local
});

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const refreshToken = Cookies.get('refreshToken');
//       if (refreshToken) {
//         try {
//           const { data } = await axios.post('/api/auth/refresh/', { refresh_token: refreshToken });
//           Cookies.set('accessToken', data.accessToken);
//           API.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
//           return API(originalRequest);
//         } catch  {
//           Cookies.remove('accessToken');
//           Cookies.remove('refreshToken');
//           window.location.href = '/'; 
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default API;
