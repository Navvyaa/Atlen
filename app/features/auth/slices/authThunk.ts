// app/features/auth/slices/authThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkEmailRequest,
  checkEmailResponse,
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
  verifyOtpRequest,
  verifyOtpResponse,
  forgotPasswordRequest,
  forgotPasswordResponse,
  resetPasswordRequest,
  resetPasswordResponse,
  refreshTokenRequest,
  refreshTokenResponse,
  googleOAuthResponse,

} from '../types';
import * as authApi from '../api/authApi';

// Check Email Thunk
export const checkEmail = createAsyncThunk<checkEmailResponse, checkEmailRequest>(
  'auth/checkEmail',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.checkEmailApi(data);
        return response;
    } catch (error :any) {
      if ( error.response==="ERR_INTERNET_DISCONNECTED" ) {
        // Network error or no internet connection
        throw new Error('Please check your network connection');
      }
        return rejectWithValue(error.message);
      }
  }
);

// Login Thunk
export const login = createAsyncThunk<loginResponse, loginRequest>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.loginApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

// Register Thunk
export const register = createAsyncThunk<registerResponse, registerRequest>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.registerApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

// Verify OTP Thunk
export const verifyOtp = createAsyncThunk<verifyOtpResponse, verifyOtpRequest>(
  'auth/verifyOtp',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.verifyOtpApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

// Forgot Password Thunk
export const forgotPassword = createAsyncThunk<forgotPasswordResponse, forgotPasswordRequest>(
  'auth/forgotPassword',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.forgotPasswordApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

// Reset Password Thunk
export const resetPassword = createAsyncThunk<resetPasswordResponse, resetPasswordRequest>(
  'auth/resetPassword',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.resetPasswordApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);

// Refresh Token Thunk
export const refreshToken = createAsyncThunk<refreshTokenResponse, refreshTokenRequest>(
  'auth/refreshToken',
  async (data, { rejectWithValue }) => {
    try {
        const response = await authApi.refreshTokenApi(data);
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
  }
);


// Google OAuth Token to Backend Thunk
export const sendGoogleOAuthTokenToBackend = createAsyncThunk<
  googleOAuthResponse,
  string // Google OAuth Access Token
>(
  'auth/sendGoogleOAuthToken',
  async (accessToken, { rejectWithValue }) => {
    try {
      // You may need to include the client ID and other necessary parameters in the request
      const payload = {
        client_id: process.env.NEXT_PUBLIC_AUTH_GOOGLE_OAUTH_CLIENT_ID,
        grant_type: 'convert_token',
        token: accessToken,
        backend: 'google-oauth2',
      };

      // Make the API call
      const response = await authApi.sendGoogleOAuthTokenApi(payload);

      // Return the response data if successful
      return response;
    } catch (error:any) {
     
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);


