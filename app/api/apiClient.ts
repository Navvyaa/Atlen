
import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'https://trippin-73nt.onrender.com/api', // Replace with your API base URL
//    baseURL: '${process.env.NEXT_PUBLIC_BACKEND_URL}/api',
baseURL: process.env.NEXT_PUBLIC_BACKEND_URL + '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkEmail = async (email: string) => {
    const response = await apiClient.post('/auth/check-email/', { email });
    return response.data;
};

export const registerUser = async (data: { email: string; password: string; confirm_password: string; first_name: string; last_name: string }) => {
    console.log(data)
    const response = await apiClient.post('/auth/register/', data);
    return response.data;
};
export const LoginUser = async (data: { email: string; password: string; }) => {
    const response = await apiClient.post('/auth/login/', data);
    return response.data;
}
  
export const verifyOtp = async (data: { email: string; otp: string; verification_type: string }) => {
    const response = await apiClient.post('/auth/verify-otp/', data);
    return response.data;
};
export const forgotPassword = async (data: { email: string }) => {
    const response = await apiClient.post('/auth/forgot-password/', data);
    return response.data;
};

export const resetPassword = async (data: { email: string; new_password:string; confirm_password:string ,reset_token:string}) => {
    const response = await apiClient.post('/auth/reset-password/', data);
    return response.data;
};
export default apiClient;