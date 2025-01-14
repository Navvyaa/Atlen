
import API from './authApiInstance';
import { checkEmailRequest, loginRequest, registerRequest, verifyOtpRequest, forgotPasswordRequest, resetPasswordRequest, refreshTokenRequest  } from '../types';

export const checkEmailApi = async (data: checkEmailRequest) => {
const response = await API.post('/api/auth/check-email/', data);
// if (response.net==="ERR_INTERNET_DISCONNECTED"||!response.data ) {
//   // Network error or no internet connection
//   return('Please check your network connection');
// }
return response.data;
};

export const loginApi = async (data: loginRequest) => {
const response = await API.post('/api/auth/login/', data);
return response.data;
};

export const registerApi = async (data: registerRequest) => {
const response = await API.post('/api/auth/register/', data);
return response.data;
};


export const verifyOtpApi = async (data: verifyOtpRequest) => {
const response = await API.post('/api/auth/verify-otp/', data);
return response.data;
};


export const forgotPasswordApi = async (data: forgotPasswordRequest) => {
const response = await API.post('/api/auth/forgot-password/', data);
return response.data;
};


export const resetPasswordApi = async (data: resetPasswordRequest) => {
const response = await API.post('/api/auth/reset-password/', data);
return response.data;
};

export const refreshTokenApi = async (data: refreshTokenRequest) => {
const response = await API.post('/api/auth/refresh-token/', data);
return response.data;
};

export const sendGoogleOAuthTokenApi = async (data: any) => {
    const response = await API.post('/auth/convert-token', data);
    return response.data;
  };