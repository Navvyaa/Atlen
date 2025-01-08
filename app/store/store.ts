import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer, // Add other slices as needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
