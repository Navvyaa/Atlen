
import API from './authApiInstance';
import { checkEmailRequest, loginRequest, registerRequest, verifyOtpRequest, forgotPasswordRequest, resetPasswordRequest, refreshTokenRequest } from '../types';

export const checkEmailApi = async (data: checkEmailRequest) => {
const response = await API.post('/auth/check-email/', data);
return response.data;
};

export const loginApi = async (data: loginRequest) => {
const response = await API.post('/auth/login/', data);
return response.data;
};

export const registerApi = async (data: registerRequest) => {
const response = await API.post('/auth/register/', data);
return response.data;
};


export const verifyOtpApi = async (data: verifyOtpRequest) => {
const response = await API.post('/auth/verify-otp/', data);
return response.data;
};


export const forgotPasswordApi = async (data: forgotPasswordRequest) => {
const response = await API.post('/auth/forgot-password/', data);
return response.data;
};


export const resetPasswordApi = async (data: resetPasswordRequest) => {
const response = await API.post('/auth/reset-password/', data);
return response.data;
};

export const refreshTokenApi = async (data: refreshTokenRequest) => {
const response = await API.post('/auth/refresh-token/', data);
return response.data;
};
