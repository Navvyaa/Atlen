import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkEmail, login, register, sendGoogleOAuthTokenToBackend, verifyOtp } from './authThunk';
import { googleOAuthResponse } from '../types';
import Cookies from 'js-cookie';

interface Tokens {
  access_token: string;
  refresh_token: string;
}

interface User {
  email: string;
  first_name: string;
  last_name: string;
}

const initialState = {
  user: null as User | null,
  email: null as string | null,
  tokens: null as Tokens | null,
  emailStatus: null,
  loading: false,
  error: null as string | null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.tokens = null;
      state.email = null; 
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action: PayloadAction<{ data: any; response?: { data: { message: string } } }>) => {
          state.loading = false;
          if (action.type === checkEmail.fulfilled.type) {
           
            state.email = action.payload.data.email; 
            state.emailStatus = action.payload.data;
          } else if (action.type === login.fulfilled.type) {
            state.tokens = {
              access_token: action.payload.data.access_token,
              refresh_token: action.payload.data.refresh_token,
            };
            state.user = action.payload.data;
          } else if (action.type === register.fulfilled.type) {
            state.emailStatus = action.payload.data;
          } else if (action.type === verifyOtp.fulfilled.type) {
            state.user = action.payload.data;
            state.tokens = {
              access_token: action.payload.data.access_token,
              refresh_token: action.payload.data.refresh_token,
            };
            if (action.type === sendGoogleOAuthTokenToBackend.fulfilled.type) {
              // Store tokens and user data
              const payload = action.payload as unknown as googleOAuthResponse;
              state.tokens = {
                access_token:payload.access_token,
                refresh_token:payload.refresh_token,
              };
              state.user = payload.user;
              console.log("Google payload :",payload);
              // Save tokens to localStorage
              Cookies.set('accessToken',payload.access_token);
              Cookies.set('refreshToken', payload.refresh_token);
            }
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<{ response: { data: { message: string } } }>) => {
          state.loading = false;
          
          state.error = action.payload.response.data.message || 'An error occurred';
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
